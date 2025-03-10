<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $userData = User::join('employees', 'users.id', '=', 'employees.user_id')
            ->where('users.id', $user->id)
            ->select(
                'users.id as user_id',
                'users.role',
                'employees.id as employee_id',
                'employees.firstname',
                'employees.middlename',
                'employees.lastname',
                'employees.email',
                'employees.sex',
                'employees.birthdate',
                'employees.contact_number',
                'employees.address',
                'employees.position',
                'employees.department',
                'employees.salary',
                'employees.hire_date',
                'employees.status'
            )
            ->first();

        return Inertia::render('Account', [
            'user' => $userData
        ]);


    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_info(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);
        $user = User::findOrFail($employee->user_id);

        $validate = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'middlename' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'birthdate' => 'required|date',
            'sex' => 'required|in:male,female',
        ]);

        if($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }

        $user->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'middlename' => $request->middlename,
        ]);

        $employee->update([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'address' => $request->address,
            'birthdate' => $request->birthdate,
            'sex' => $request->sex,
        ]);

        $loggedUser = Auth::user();
        $username = $loggedUser ? "{$loggedUser->firstname} {$loggedUser->lastname}" : "System";
        LogHelper::logAction(
            'Employee info has been updated',
            "{$username} has updated their personal info."
        );

        return redirect()->route('account.index')->with('success', 'User
         updated successfully.');
    }

    public function update_contact_info(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);
        $user = User::findOrFail($employee->user_id);

        $validate = Validator::make($request->all(), [
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'contact_number' => 'required|regex:/^\+?[0-9]{8,15}$/',
        ]);

        if($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }

        $user->update([
            'email' => $request->email,
        ]);

        $employee->update([
            'email' => $request->email,
            'contact_number' => $request->contact_number,
        ]);

        $loggedUser = Auth::user();
        $username = $loggedUser ? "{$loggedUser->firstname} {$loggedUser->lastname}" : "System";
        LogHelper::logAction(
            'Employee info has been updated',
            "{$username} has updated their contact info."
        );

        return redirect()->route('account.index')->with('success', 'User
         updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
