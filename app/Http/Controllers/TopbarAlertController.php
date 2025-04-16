<?php

namespace App\Http\Controllers;

use App\Models\TopbarAlert;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopbarAlertController extends Controller
{
    public function index()
    {
        return Inertia::render('CMS/TopbarAlerts', [
            'alerts' => TopbarAlert::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'active' => 'boolean',
        ]);

        TopbarAlert::create($validated);

        return redirect()->back()->with('success', 'Alert created.');
    }

    public function update(Request $request, TopbarAlert $topbarAlert)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'active' => 'boolean',
        ]);

        $topbarAlert->update($validated);

        return redirect()->back()->with('success', 'Alert updated.');
    }

    public function destroy(TopbarAlert $topbarAlert)
    {
        $topbarAlert->delete();

        return redirect()->back()->with('success', 'Alert deleted.');
    }
}
