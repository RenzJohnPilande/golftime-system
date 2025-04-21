<?php

namespace App\Http\Controllers;

use App\Models\HeroBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroBannerController extends Controller
{
    public function index()
    {
        return Inertia::render('CMS/HeroBanner', [
            'banners' => HeroBanner::all(),
        ]);
    }

    public function show($id)
    {
        return HeroBanner::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'background' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'link' => 'required|string|max:255',
        ]);

        if ($request->hasFile('background')) {
            $validated['background'] = $request->file('background')->store('images/banners/background', 'public');
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('images/banners/image', 'public');
        }

        HeroBanner::create($validated);

        return back()->with('success', 'Banner created successfully.');
    }

    public function update(Request $request, $id)
    {
        $banner = HeroBanner::findOrFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'link' => 'required|string|max:255',
        ]);

        $banner->update($data);

        return back()->with('success', 'Banner updated successfully.');
    }

    public function destroy($id)
    {
        $banner = HeroBanner::findOrFail($id);

        $banner->delete();

        return redirect()->back()->with('success', 'Banner deleted successfully.');
    }

    public function tempUpload(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'background' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $response = [];

        if ($request->hasFile('image')) {
            $response['image'] = $request->file('image')->store('temp/banner/image', 'public');
        }

        if ($request->hasFile('background')) {
            $response['background'] = $request->file('background')->store('temp/banner/background', 'public');
        }

        return response()->json($response);
    }

    public function updateImages(Request $request, HeroBanner $banner)
    {
        $request->validate([
            'image' => 'nullable|string',
            'background' => 'nullable|string',
        ]);

        $updates = [];

        foreach (['image', 'background'] as $type) {
            $value = $request->input($type);

            if (is_string($value) && str_starts_with($value, "temp/banner/$type/")) {
                $filename = basename($value);
                $finalPath = "images/banners/$type/{$filename}";

                if (Storage::disk('public')->exists($value)) {
                    Storage::disk('public')->move($value, $finalPath);
                    $updates[$type] = $finalPath;

                    // Delete old image if it exists
                    if ($banner->$type && Storage::disk('public')->exists($banner->$type)) {
                        Storage::disk('public')->delete($banner->$type);
                    }
                } else {
                    return back()->withErrors([$type => "Temporary $type image not found."]);
                }
            }
        }

        $banner->update($updates);

        return back()->with('success', 'Banner images updated successfully!');
    }
}
