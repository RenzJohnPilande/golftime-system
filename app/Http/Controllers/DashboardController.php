<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use App\Models\Events;
use App\Models\Job;
use App\Models\Log;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $permissions = $user ? $user->permissions->pluck('name')->toArray() : [];
        $logs = Log::where('action_by', $user->id)->latest()->take(10)->get();

        $data = [];

        $isAdmin = in_array('admin', $permissions);

        if ($isAdmin || in_array('event_management', $permissions)) {
            $data['events'] = $isAdmin
                ? Events::latest()->take(10)->get()
                : Events::where('assigned_to', $user->id)->latest()->take(10)->get();
        }

        if ($isAdmin || in_array('task_management', $permissions)) {
            $data['tasks'] = $isAdmin
                ? Task::latest()->take(10)->get()
                : Task::where('assigned_to', $user->id)->latest()->take(10)->get();
        }

        if ($isAdmin || in_array('employee_management', $permissions)) {
            $data['employees'] = Employee::latest()->take(10)->get();
        }

        if ($isAdmin || in_array('department_management', $permissions)) {
            $data['departments'] = Department::latest()->take(10)->get();
        }

        if ($isAdmin || in_array('job_management', $permissions)) {
            $data['jobs'] = Job::latest()->take(10)->get();
        }

        return Inertia::render('Dashboard', [
            'permissions' => $permissions,
            'logs' => $logs,
            'data' => $data,
        ]);
    }
}
