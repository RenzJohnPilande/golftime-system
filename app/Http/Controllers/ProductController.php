<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\Constant;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            });
        }

        $products = $query->latest()->paginate(10)->withQueryString();
        return Inertia::render('CMS/Product', [
            'products' => $products,
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
            $file = $request->file('thumbnail');
            $filename = time() . '_' . $file->getClientOriginalName();
            $thumbnailPath = 'images/thumbnail/' . $filename;
            $file->move(public_path('images/thumbnail'), $filename);
        }

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('images/products'), $filename);
                $imagePaths[] = 'images/products/' . $filename;
            }
        }

        $product = Product::create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'description' => $request->input('description'),
            'thumbnail' => $thumbnailPath,
            'images' => $imagePaths,
            'categories' => $request->input('categories') ?? [],
            'materials' => $request->input('materials') ?? [],
            'sizes' => $request->input('sizes') ?? [],
            'colors' => $request->input('colors') ?? [],
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
            $file = $request->file('thumbnail');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/thumbnail'), $filename);
            $path = 'images/thumbnail/' . $filename;
        } elseif (is_string($thumbnail) && str_starts_with($thumbnail, 'temp/thumbnail/')) {
            $filename = basename($thumbnail);
            $tempPath = public_path($thumbnail);
            $finalPath = public_path("images/thumbnail/{$filename}");

            if (file_exists($tempPath)) {
                rename($tempPath, $finalPath);
                $path = "images/thumbnail/{$filename}";
            } else {
                return back()->withErrors(['thumbnail' => 'Temporary thumbnail not found.']);
            }
        } else {
            return back()->withErrors(['thumbnail' => 'Invalid thumbnail input.']);
        }

        if ($path) {
            if ($product->thumbnail && file_exists(public_path($product->thumbnail))) {
                unlink(public_path($product->thumbnail));
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
                $tempPath = public_path($imagePath);
                $finalPath = public_path("images/products/{$filename}");

                if (file_exists($tempPath)) {
                    rename($tempPath, $finalPath);
                }

                $finalPaths[] = "images/products/{$filename}";

                if (file_exists($tempPath)) {
                    unlink($tempPath);
                }
            } else {
                $finalPaths[] = $imagePath;
            }
        }

        $removedImages = array_diff($oldImages, $finalPaths);
        foreach ($removedImages as $removed) {
            if (file_exists(public_path($removed))) {
                unlink(public_path($removed));
            }
        }

        $product->update(['images' => $finalPaths]);
        LogHelper::logAction('Product Updated', "Product images has been updated");
        return back()->with('success', 'Product images updated successfully!');
    }

    public function tempThumbnailUpload(Request $request)
    {
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $file = $request->file('thumbnail');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('temp/thumbnail'), $filename);

        return response()->json(['path' => 'temp/thumbnail/' . $filename]);
    }

    public function tempUpload(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|max:2048',
        ]);

        $paths = [];
        foreach ($request->file('images') as $image) {
            $filename = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('temp/products'), $filename);
            $paths[] = 'temp/products/' . $filename;
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
