<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Helpers\LogHelper;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('Management/Role', [
            'roles' => Role::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_title' => 'required|unique:roles',
            'job_description' => 'nullable',
        ]);

        $role = Role::create($request->all());
        
        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        LogHelper::logAction(
            'New job title has been created',
            "A new job titled \"{$role->job_title}\" was created by {$username}."
        );

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);
        return response()->json($role);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'job_title' => 'required|unique:roles,job_title,' . $id,
            'job_description' => 'nullable',
        ]);

        $role = Role::findOrFail($id);
        $oldTitle = $role->job_title;
        $oldDescription = $role->job_description;

        $role->update($request->all());

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        $changes = [];

        if ($oldTitle !== $role->job_title) {
            $changes[] = "Job title changed was changed from \"{$oldTitle}\" to \"{$role->job_title}\"";
        }
        
        if ($oldDescription !== $role->job_description) {
            $changes[] = "Job description was changed from \"{$oldDescription}\" to \"{$role->job_description}\"";
        }

        $changeDetails = implode(" and ", $changes);

        LogHelper::logAction(
            'A Job has been updated',
            "The job \"{$oldTitle}\" was updated by {$username}. {$changeDetails}."
        );


        return redirect()->route('roles.index')->with('success', 'Role updated successfully!');
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $roleTitle = $role->job_title;
        $role->delete();

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        LogHelper::logAction(
            'A job title has been deleted',
            "The job \"{$roleTitle}\" was deleted by {$username}."
        );


        return redirect()->route('roles.index')->with('success', 'Role deleted successfully!');
    }
}
