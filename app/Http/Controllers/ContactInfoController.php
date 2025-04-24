<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\ContactInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactInfoController extends Controller
{
    public function index()
    {
        $info = ContactInfo::first();
        return Inertia::render('CMS/Contact', [
            'info' => $info,
        ]);
    }

    public function show($id)
    {
        return ContactInfo::findOrFail($id);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'business_hours' => 'required|string',
        ]);

        $data = ContactInfo::updateOrCreate(['id' => 1], $validated);
        LogHelper::logAction('Contact info Updated', "Contact info has been updated");
        return redirect()->back()->with('success', 'Contact Info updated.');
    }
}
