<?php

namespace App\Http\Controllers;

use App\Models\HeroBanner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroBannerController extends Controller
{
    public function index()
    {
        return Inertia::render('CMS/HeroBanners', [
            'banners' => HeroBanner::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'link' => 'nullable|string',
        ]);

        HeroBanner::create($validated);
        return redirect()->back()->with('success', 'Hero Banner added.');
    }

    public function update(Request $request, HeroBanner $heroBanner)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'link' => 'nullable|string',
        ]);

        $heroBanner->update($validated);
        return redirect()->back()->with('success', 'Hero Banner updated.');
    }

    public function destroy(HeroBanner $heroBanner)
    {
        $heroBanner->delete();
        return redirect()->back()->with('success', 'Hero Banner deleted.');
    }
}
