<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
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
        LogHelper::logAction("{$constant->type} Created", "{$constant->type} {$constant->description} has been created");
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
        LogHelper::logAction("{$constant->type} Updated", "{$constant->type} {$constant->description} has been updated");
        return redirect()->back()->with('success', 'Constant updated.');
    }

    public function destroy($id)
    {
        $constant = Constant::findOrFail($id);
        $constant->delete();
        LogHelper::logAction("{$constant->type} Deleted", "{$constant->type} {$constant->description} has been deleted");
        return redirect()->back()->with('success', 'Constant deleted.');
    }
}
