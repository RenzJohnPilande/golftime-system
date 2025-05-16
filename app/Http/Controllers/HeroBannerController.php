<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\HeroBanner;
use Illuminate\Http\Request;
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
            $file = $request->file('background');
            $path = 'images/banners/background/' . $file->getClientOriginalName();
            $file->move(public_path('images/banners/background'), $file->getClientOriginalName());
            $validated['background'] = $path;
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = 'images/banners/image/' . $file->getClientOriginalName();
            $file->move(public_path('images/banners/image'), $file->getClientOriginalName());
            $validated['image'] = $path;
        }

        $banner = HeroBanner::create($validated);
        LogHelper::logAction('Banner Created', "Banner {$banner->title} has been created");
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
        LogHelper::logAction('Banner Updated', "Banner {$banner->title} has been updated");
        return back()->with('success', 'Banner updated successfully.');
    }

    public function destroy($id)
    {
        $banner = HeroBanner::findOrFail($id);

        // Optional: delete associated images
        foreach (['image', 'background'] as $type) {
            if ($banner->$type && file_exists(public_path($banner->$type))) {
                unlink(public_path($banner->$type));
            }
        }

        $banner->delete();
        LogHelper::logAction('Banner Deleted', "Banner {$banner->title} has been deleted");
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
            $file = $request->file('image');
            $path = 'temp/banner/image/' . $file->getClientOriginalName();
            $file->move(public_path('temp/banner/image'), $file->getClientOriginalName());
            $response['image'] = $path;
        }

        if ($request->hasFile('background')) {
            $file = $request->file('background');
            $path = 'temp/banner/background/' . $file->getClientOriginalName();
            $file->move(public_path('temp/banner/background'), $file->getClientOriginalName());
            $response['background'] = $path;
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
                $from = public_path($value);
                $to = "images/banners/$type/$filename";
                $toPath = public_path($to);

                if (file_exists($from)) {
                    rename($from, $toPath);
                    $updates[$type] = $to;

                    if ($banner->$type && file_exists(public_path($banner->$type))) {
                        unlink(public_path($banner->$type));
                    }
                } else {
                    return back()->withErrors([$type => "Temporary $type image not found."]);
                }
            }
        }

        $banner->update($updates);
        LogHelper::logAction('Banner Updated', "Banner {$banner->title} has been updated");
        return back()->with('success', 'Banner images updated successfully!');
    }
}
