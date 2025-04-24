<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
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

    public function show($id)
    {
        return TopbarAlert::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'active' => 'boolean',
        ]);

        $alert = TopbarAlert::create($validated);
        LogHelper::logAction('Alert Created', "Alert {$alert->message} has been created");
        return redirect()->back()->with('success', 'Alert created.');
    }

    public function update(Request $request, $id)
    {
        $alert = TopbarAlert::findOrFail($id);

        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'active' => 'boolean',
        ]);

        $alert->update($validated);
        LogHelper::logAction('Alert Updated', "Alert {$alert->message} has been updated");
        return redirect()->back()->with('success', 'Alert updated.');
    }

    public function destroy($id)
    {
        $alert = TopbarAlert::findOrFail($id);
        $alert->delete();
        LogHelper::logAction('Alert Deleted', "Alert {$alert->message} has been deleted");
        return redirect()->back()->with('success', 'Alert deleted successfully.');
    }
}
