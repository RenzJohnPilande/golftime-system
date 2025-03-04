<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
