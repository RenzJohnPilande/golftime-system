<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PromotionController extends Controller
{
    public function index()
    {
        return Inertia::render('CMS/Promotion', [
            'promotions' => Promotion::all(),
        ]);
    }

    public function show($id)
    {
        return Promotion::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('images/promotion', 'public');
        }

        $promotion = Promotion::create($validated);
        LogHelper::logAction('Promotion Created', "Promotion {$promotion->title} has been created");
        return back()->with('success', 'Promotion created successfully.');
    }

    public function update(Request $request, $id)
    {
        $promotion = Promotion::findOrFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $promotion->update($data);
        LogHelper::logAction('Promotion Updated', "Promotion {$promotion->title} has been updated");
        return back()->with('success', 'Promotion updated successfully.');
    }

    public function destroy($id)
    {
        $promotion = Promotion::findOrFail($id);

        $promotion->delete();
        LogHelper::logAction('Promotion Deleted', "Promotion {$promotion->title} has been deleted");
        return redirect()->back()->with('success', 'Promotion deleted successfully.');
    }

    public function tempCoverUpload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $path = $request->file('image')->store('temp/promotion', 'public');

        return response()->json(['path' => $path]);
    }

    public function updateCover(Request $request, Promotion $promotion)
    {
        $request->validate([
            'image' => 'required',
        ]);

        $image = $request->input('image');
        $path = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images/promotion', 'public');
        } elseif (is_string($image) && str_starts_with($image, 'temp/promotion/')) {

            $filename = basename($image);
            $finalPath = "images/promotion/{$filename}";

            if (Storage::disk('public')->exists($image)) {
                Storage::disk('public')->move($image, $finalPath);
                $path = $finalPath;
            } else {
                return back()->withErrors(['image' => 'Temporary cover image not found.']);
            }
        } else {
            return back()->withErrors(['image' => 'Invalid cover image input.']);
        }

        if ($path) {
            if ($promotion->image && Storage::disk('public')->exists($promotion->image)) {
                Storage::disk('public')->delete($promotion->image);
            }

            $promotion->update(['image' => $path]);
            LogHelper::logAction('Promotion Updated', "Promotion {$promotion->title} has been updated");
            return back()->with('success', 'Cover image updated successfully!');
        }

        return back()->withErrors(['image' => 'Cover image upload failed.']);
    }
}
