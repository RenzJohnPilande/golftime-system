<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Helpers\LogHelper;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Department::query();
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        $departments = $query->latest()->paginate(9)->withQueryString();
        return Inertia::render('Management/Department', [
            'employees' => Employee::all(),
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:departments',
            'supervisor' => 'nullable|exists:employees,id',
        ]);

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";
        $department = Department::create($request->all());
        LogHelper::logAction('New department has been created', "A new department named \"{$department->name}\" was created by {$username}.");


        return redirect()->route('departments.index')->with('success', 'Role created successfully.');
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
        $oldDepartmentName = $department->name;
        $oldSupervisor = Employee::find($department->supervisor);
        $newSupervisor = Employee::find($request->supervisor);


        $department->update($request->all());

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        $changes = [];

        if ($oldDepartmentName !== $department->name) {
            $changes[] = "Department name changed from \"{$oldDepartmentName}\" to \"{$department->name}\"";
        }

        if (($oldSupervisor->id ?? null) !== ($newSupervisor->id ?? null)) {
            $oldSupervisorName = $oldSupervisor ? $oldSupervisor->firstname . " " . $oldSupervisor->lastname : "None";
            $newSupervisorName = $newSupervisor ? $newSupervisor->firstname . " " . $newSupervisor->lastname : "None";
            $changes[] = "Supervisor changed from \"{$oldSupervisorName}\" to \"{$newSupervisorName}\"";
        }

        $changeDetails = implode(" and ", $changes);

        LogHelper::logAction(
            'A department has been updated',
            "The department \"{$oldDepartmentName}\" was updated by {$username}. {$changeDetails}."
        );


        return redirect()->route('departments.index')->with('success', 'Role created successfully.');
    }

    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $departmentName = $department->name;

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        $department->delete();

        LogHelper::logAction(
            'A department has been deleted',
            "The department \"{$departmentName}\" was deleted by {$username}."
        );


        return redirect()->route('departments.index')->with('success', 'Department deleted successfully!');
    }
}
