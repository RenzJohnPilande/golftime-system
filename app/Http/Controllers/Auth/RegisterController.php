<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
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
            'role' => 'employee', 
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

        return redirect()->route('employees.index')->with('success', 'User
         created successfully.');
    }

    public function update(Request $request, $id)
    {
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
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
        ]);

        // If validation fails, return errors
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the employee and user by ID
        $employee = Employee::findOrFail($id);
        $user = $employee->user;

        // Update the user (optional: update password if provided)
        $user->update([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'role' => 'employee',
            'password' => $request->password ? Hash::make($request->password) : $user->password, // Only update password if provided
        ]);

        // Update the employee record
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

        // For Inertia.js, return the updated employee data as a response
        return response()->json([
            'message' => 'Employee updated successfully.',
            'employee' => $employee,
            'user' => $user,
        ]);
    }
}
