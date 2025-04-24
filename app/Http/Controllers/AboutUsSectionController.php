<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\AboutUsSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsSectionController extends Controller
{
    public function index()
    {
        return Inertia::render('CMS/AboutCMS', [
            'sections' => AboutUsSection::all()
        ]);
    }

    public function show($id)
    {
        return AboutUsSection::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $data = AboutUsSection::findOrFail($id);

        $validated = $request->validate([
            'section_type' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $data->update($validated);

        LogHelper::logAction('Content Updated', "Content {$data->section_type} has been updated");
        return back()->with('success', 'Content updated successfully.');
    }
}
