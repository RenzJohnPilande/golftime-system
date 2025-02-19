<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::all();

        return Inertia::render('Management/Department', [
        'departments' => $departments,
    ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:departments',
            'supervisor' => 'nullable|exists:employees,id',
        ]);

        $department = Department::create($request->all());

        return response()->json($department, 201);
    }

    public function show($id)
    {
        $department = Department::with('supervisor')->findOrFail($id);
        return response()->json($department);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:departments,name,' . $id,
            'supervisor' => 'nullable|exists:employees,id',
        ]);

        $department = Department::findOrFail($id);
        $department->update($request->all());

        return response()->json($department);
    }

    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return response()->json(null, 204);
    }
}
