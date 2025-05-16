<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\LogHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        // Validate the input data
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'middlename' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'salary' => 'required|numeric',
            'hire_date' => 'required|date',
            'status' => 'required|in:active,inactive,terminated',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create the employee record
        $employee = Employee::create([
            'user_id' => $user->id,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'position' => $request->position,
            'department' => $request->department,
            'salary' => $request->salary,
            'hire_date' => $request->hire_date,
            'status' => $request->status,
        ]);

        if ($request->has('permissions')) {
            $user->permissions()->attach($request->permissions);
        }

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";
        LogHelper::logAction('Created a new employee', "A new employee named {$employee->firstname} {$employee->lastname} has been added by {$username}.");

        return redirect()->route('employees.index')->with('success', 'User
         created successfully.');
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);
        $user = User::findOrFail($employee->user_id);

        // Validate incoming data
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'middlename' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'salary' => 'required|numeric',
            'hire_date' => 'required|date',
            'status' => 'required|in:active,inactive,terminated',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update User
        $user->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'middlename' => $request->middlename,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        // Update Employee
        $employee->update([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'position' => $request->position,
            'department' => $request->department,
            'salary' => $request->salary,
            'hire_date' => $request->hire_date,
            'status' => $request->status,
        ]);

        if ($request->has('permissions')) {
            $user->permissions()->sync($request->permissions);
        }

        // Logging Action
        $loggedUser = Auth::user();
        $username = $loggedUser ? "{$loggedUser->firstname} {$loggedUser->lastname}" : "System";
        LogHelper::logAction(
            'Employee has been updated',
            "Employee \"{$employee->firstname} {$employee->lastname}\" was updated by {$username}."
        );

        return redirect()->route('employees.index')->with('success', 'User updated successfully.');
    }
}
