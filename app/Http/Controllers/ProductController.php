<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\Constant;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('CMS/Product', [
            'products' => Product::paginate(10),
            'categories' => Constant::where('type', 'Category')->orderBy('description')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'categories' => 'nullable|array',
            'materials' => 'nullable|array',
            'sizes' => 'nullable|array',
            'colors' => 'nullable|array',
            'price' => 'required|string',
        ]);

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('/images/thumbnail', 'public');
        }

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('/images/products', 'public');
            }
        }

        $categories = $request->input('categories') ?? [];
        $materials = $request->input('materials') ?? [];
        $sizes = $request->input('sizes') ?? [];
        $colors = $request->input('colors') ?? [];

        $product = Product::create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'description' => $request->input('description'),
            'thumbnail' => $thumbnailPath,
            'images' => $imagePaths,
            'categories' => $categories,
            'materials' => $materials,
            'sizes' => $sizes,
            'colors' => $colors,
            'price' => $request->input('price'),
        ]);

        LogHelper::logAction('Product Created', "Product {$product->name} has been created");

        return redirect()->back()->with('success', 'Product created successfully!');
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function updateDetails(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'required|string|max:255',
            'description' => 'nullable|string',
            'categories' => 'nullable|array',
            'materials' => 'nullable|array',
            'sizes' => 'nullable|array',
            'colors' => 'nullable|array',
            'price' => 'sometimes|string',
        ]);

        $product->update($data);
        LogHelper::logAction('Product Updated', "Product {$product->name} has been updated");
        return back()->with('success', 'Product details updated successfully!');
    }

    public function updateThumbnail(Request $request, Product $product)
    {
        $request->validate([
            'thumbnail' => 'required',
        ]);

        $thumbnail = $request->input('thumbnail');
        $path = null;

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('images/thumbnail', 'public');
        } elseif (is_string($thumbnail) && str_starts_with($thumbnail, 'temp/thumbnail/')) {

            $filename = basename($thumbnail);
            $finalPath = "images/thumbnail/{$filename}";

            if (Storage::disk('public')->exists($thumbnail)) {
                Storage::disk('public')->move($thumbnail, $finalPath);
                $path = $finalPath;
            } else {
                return back()->withErrors(['thumbnail' => 'Temporary thumbnail not found.']);
            }
        } else {
            return back()->withErrors(['thumbnail' => 'Invalid thumbnail input.']);
        }

        if ($path) {
            if ($product->thumbnail && Storage::disk('public')->exists($product->thumbnail)) {
                Storage::disk('public')->delete($product->thumbnail);
            }

            $product->update(['thumbnail' => $path]);

            LogHelper::logAction('Product Updated', "Product thumbnail has been updated");
            return back()->with('success', 'Thumbnail updated successfully!');
        }
        return back()->withErrors(['thumbnail' => 'Thumbnail upload failed.']);
    }


    public function updateImages(Request $request, Product $product)
    {
        $validated = $request->validate([
            'images' => 'required|array',
            'images.*' => 'string',
        ]);

        $oldImages = $product->images ?? [];
        $newImages = $validated['images'];

        $finalPaths = [];

        foreach ($newImages as $imagePath) {
            if (str_starts_with($imagePath, 'temp/products/')) {
                $filename = basename($imagePath);
                $finalPath = "images/products/{$filename}";

                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->move($imagePath, $finalPath);
                }

                $finalPaths[] = $finalPath;

                // Optional double check: delete any leftover temp (shouldn't exist if move succeeded)
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            } else {
                $finalPaths[] = $imagePath;
            }
        }

        // Delete removed images from storage
        $removedImages = array_diff($oldImages, $finalPaths);
        foreach ($removedImages as $removed) {
            if (Storage::disk('public')->exists($removed)) {
                Storage::disk('public')->delete($removed);
            }
        }

        // Save updated image paths to DB
        $product->images = $finalPaths;
        $product->save();
        LogHelper::logAction('Product Updated', "Product images has been updated");
        return back()->with('success', 'Product images updated successfully!');
    }



    public function tempThumbnailUpload(Request $request)
    {
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $path = $request->file('thumbnail')->store('temp/thumbnail', 'public');

        return response()->json(['path' => $path]);
    }

    public function tempUpload(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|max:2048',
        ]);

        $paths = [];

        foreach ($request->file('images') as $image) {
            $path = $image->store('temp/products', 'public');
            $paths[] = $path;
        }

        return response()->json(['paths' => $paths]);
    }




    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        LogHelper::logAction('Product Deleted', "Product {$product->name} has been deleted");
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
