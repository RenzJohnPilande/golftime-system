<?php

namespace App\Http\Controllers;

use App\Models\Constant;
use Illuminate\Http\Request;

class ConstantController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'value' => 'nullable|string|max:255',
            'active' => 'boolean',
        ]);

        $constant = Constant::create($validated);

        return redirect()->back()->with('success', 'Constant created.');
    }

    public function show($id)
    {
        $constant = Constant::findOrFail($id);
        return response()->json($constant);
    }

    public function update(Request $request, $id)
    {
        $constant = Constant::findOrFail($id);

        $validated = $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'value' => 'nullable|string|max:255',
            'active' => 'boolean',
        ]);

        $constant->update($validated);

        return redirect()->back()->with('success', 'Constant updated.');
    }

    public function destroy($id)
    {
        $constant = Constant::findOrFail($id);
        $constant->delete();

        return redirect()->back()->with('success', 'Constant deleted.');
    }
}
