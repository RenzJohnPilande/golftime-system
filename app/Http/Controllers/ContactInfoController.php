<?php

namespace App\Http\Controllers;

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

    public function update(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
        ]);

        ContactInfo::updateOrCreate(['id' => 1], $validated);

        return redirect()->back()->with('success', 'Contact Info updated.');
    }
}
