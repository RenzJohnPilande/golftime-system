<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\LogHelper;
use App\Models\Department;
use App\Models\Job;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Employee::query();

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('firstname', 'like', "%{$search}%")
                    ->orWhere('middlename', 'like', "%{$search}%")
                    ->orWhere('lastname', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%")
                    ->orWhere('department', 'like', "%{$search}%");
            });
        }

        $employees = $query->latest()->paginate(9)->withQueryString();

        $user = $request->user();
        $permissions = $user->hasPermission('admin')
            ? Permission::all()
            : Permission::where('name', '!=', 'admin')->get();

        return Inertia::render('Management/Employee', [
            'employees' => $employees,
            'jobs' => Job::all(),
            'departments' => Department::all(),
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $employee = Employee::with('user')->findOrFail($id);
        return response()->json([
            'employee' => $employee,
            'permissions' => $employee->user ? $employee->user->permissions : [],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return inertia('Employees/Edit', ['employee' => $employee]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'middlename' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'salary' => 'nullable|numeric',
            'hire_date' => 'required|date',
            'status' => 'required|in:active,inactive,terminated',
        ]);

        $employee = Employee::findOrFail($id);
        $oldData = $employee->getOriginal();
        $employee->update($request->all());
        $newData = $employee->toArray();

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        $excludedFields = ['created_at', 'updated_at'];
        $changes = [];
        foreach ($newData as $key => $value) {
            if (!in_array($key, $excludedFields) && $oldData[$key] != $value) {
                $oldValue = $oldData[$key] ?? "None";
                $newValue = $value ?? "None";
                $changes[] = ucfirst(str_replace('_', ' ', $key)) . " updated";
            }
        }

        if (!empty($changes)) {
            $changeSummary = implode(', ', $changes);
            LogHelper::logAction('An Employee has been updated', "Employee {$employee->firstname} {$employee->lastname}  was updated by {$username}. Changes: {$changeSummary}.");
        }

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employeeName = $employee->firstname . " " . $employee->lastname;

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        DB::transaction(function () use ($employee, $employeeName, $username) {
            if ($employee->user_id) {
                User::where('id', $employee->user_id)->delete();
            }

            $employee->delete();

            LogHelper::logAction('an employee has been deleted', "Employee {$employeeName} and their associated user account were deleted by {$username}.");
        });



        return redirect()->route('employees.index')->with('success', 'Employee deleted successfully!');
    }
}
