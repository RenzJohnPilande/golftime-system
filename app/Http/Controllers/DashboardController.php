<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Events;
use App\Models\HeroBanner;
use App\Models\Job;
use App\Models\Log;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\Task;
use App\Models\TopbarAlert;
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
            $data['events'] = [
                'total' => $isAdmin ? Events::count() : Events::where('assigned_to', $user->id)->count(),
                'current' => $isAdmin
                    ? Events::whereIn('status', ['pending', 'preparation', 'ongoing'])->count()
                    : Events::where('assigned_to', $user->id)
                    ->whereIn('status', ['pending', 'preparation', 'ongoing'])
                    ->count(),
                'data' => $isAdmin
                    ? Events::all()
                    : Events::where('assigned_to', $user->id)->get(),
            ];
        }

        if ($isAdmin || in_array('task_management', $permissions)) {
            $data['tasks'] = [
                'total' => $isAdmin ? Task::count() : Task::where('assigned_to', $user->id)->count(),
                'current' => $isAdmin
                    ? Task::whereIn('status', ['pending', 'ongoing'])->count()
                    : Task::where('assigned_to', $user->id)
                    ->whereIn('status', ['pending', 'ongoing'])
                    ->count(),
                'data' => $isAdmin
                    ? Task::all()
                    : Task::where('assigned_to', $user->id)->get(),
            ];
        }

        if ($isAdmin || in_array('employee_management', $permissions)) {
            $data['employees'] = [
                'inactive' => Employee::where('status', "inactive")->count(),
                'active' => Employee::where('status', "active")->count(),
                'data' => Employee::all(),
            ];
        }

        if ($isAdmin || in_array('department_management', $permissions)) {
            $data['departments'] = [
                'total' => Department::count(),
                "vacancies" => Department::doesntHave('employees')->count(),
                'data' => Department::withCount('employees')->get(),
            ];
        }

        if ($isAdmin || in_array('job_management', $permissions)) {
            $data['jobs'] = [
                // "vacancies"
                "total" => Job::count(),
                "vacancies" => Job::doesntHave('employees')->count(),
                "data" => Job::withCount('employees')->get()
            ];
        }

        if ($isAdmin || in_array('content_management', $permissions)) {
            $data['cms'] = [
                "products" => Product::all(),
                "articles" => Article::all(),
                "promotions" => Promotion::all(),
                "banners" => HeroBanner::all(),
                "topbar_alerts" => TopbarAlert::all(),
            ];
        }

        return Inertia::render('Dashboard', [
            'permissions' => $permissions,
            'logs' => $logs,
            'data' => $data,
        ]);
    }
}
