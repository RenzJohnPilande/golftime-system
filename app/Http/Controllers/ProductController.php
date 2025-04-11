<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('CMS/Product', [
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
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
            'description' => $request->input('description'),
            'thumbnail' => $thumbnailPath,
            'images' => $imagePaths,
            'categories' => $categories,
            'materials' => $materials,
            'sizes' => $sizes,
            'colors' => $colors,
            'price' => $request->input('price'),
        ]);

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
            'description' => 'nullable|string',
            'categories' => 'nullable|array',
            'materials' => 'nullable|array',
            'sizes' => 'nullable|array',
            'colors' => 'nullable|array',
            'price' => 'sometimes|string',
        ]);

        $product->update($data);

        return back()->with('success', 'Product details updated successfully!');
    }

    public function updateImages(Request $request, Product $product)
    {
        $validated = $request->validate([
            'images' => 'required|array',
            'images.*' => 'string',
        ]);

        $oldImages = $product->images ?? [];
        $newImages = $validated['images'];

        $removedImages = array_diff($oldImages, $newImages);
        foreach ($removedImages as $imagePath) {
            if (Storage::exists($imagePath)) {
                Storage::delete($imagePath);
            }
        }

        $addedImages = array_diff($newImages, $oldImages);
        foreach ($addedImages as $image) {
            if (Storage::exists("temp/{$image}")) {
                Storage::move("temp/{$image}", "images/products/{$image}");
            }
        }

        $product->images = $validated['images'];
        $product->save();

        return back()->with('success', 'Product Images updated successfully!');
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

    public function updateThumbnail(Request $request, Product $product)
    {
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($product->thumbnail && Storage::disk('public')->exists($product->thumbnail)) {
            Storage::disk('public')->delete($product->thumbnail);
        }

        $path = $request->file('thumbnail')->store('/images/thumbnail', 'public');
        $product->update(['thumbnail' => $path]);

        return back()->with('success', 'Thumbnail updated successfully!');
    }



    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
