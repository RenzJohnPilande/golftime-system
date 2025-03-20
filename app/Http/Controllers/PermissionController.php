<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Management/Permission', [
            'permissions' => Permission::all(),
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
        $request->validate([
            'name' => 'required|unique:permissions',
            'description' => 'nullable',
        ]);

        $permission = Permission::create($request->all());
        
        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        LogHelper::logAction(
            'New permission has been created',
            "A new permission for \"{$permission->name}\" was created by {$username}."
        );

        return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $permission = Permission::findOrFail($id);
        return response()->json($permission);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:permissions,name,' . $id,
            'title' => 'nullable',
        ]);

        $permission = Permission::findOrFail($id);
        $oldTitle = $permission->name;
        $oldDescription = $permission->description;

        $permission->update($request->all());

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        $changes = [];

        if ($oldTitle !== $permission->name) {
            $changes[] = "Permission name changed was changed from \"{$oldTitle}\" to \"{$permission->name}\"";
        }
        
        if ($oldDescription !== $permission->description) {
            $changes[] = "Permission description was changed from \"{$oldDescription}\" to \"{$permission->description}\"";
        }

        $changeDetails = implode(" and ", $changes);

        LogHelper::logAction(
            'A Permission has been updated',
            "The permission \"{$oldTitle}\" was updated by {$username}. {$changeDetails}."
        );


        return redirect()->route('permissions.index')->with('success', 'Permission updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permissionTitle = $permission->name;
        $permission->delete();

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        LogHelper::logAction(
            'A permission has been deleted',
            "The permission \"{$permissionTitle}\" was deleted by {$username}."
        );


        return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully!');
    }
}
