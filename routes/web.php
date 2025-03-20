<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;

// Public Routes
Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
});

// Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

    //Account
    Route::get('/account', [UserController::class, 'index'])->name("account.index");
    Route::patch('/update-info/{id}', [UserController::class, 'update_info'])->name("account.update_info");
    Route::patch('/update-contact/{id}', [UserController::class, 'update_contact_info'])->name("account.update_contact_info");

    // Profile
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Events
    Route::prefix('events')->middleware(['auth', 'permission:event_management'])->group(function () {
        Route::get('/', [EventsController::class, 'index'])->name('events.index');
        Route::post('/', [EventsController::class, 'store'])->name('events.store');
        Route::get('/{id}', [EventsController::class, 'show'])->name('events.show');
        Route::patch('/{id}', [EventsController::class, 'update'])->name('events.update');
        Route::delete('/{id}', [EventsController::class, 'destroy'])->name('events.delete');
    });

    // Tasks
    Route::prefix('tasks')->middleware(['auth', 'permission:task_management'])->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name("tasks.index");
        Route::get('/{eventId}', [TaskController::class, 'show'])->name('tasks.show');
        Route::get('/show/{id}', [TaskController::class, 'show_task'])->name('tasks.show_task');
        Route::post('/', [TaskController::class, 'store'])->name("tasks.store");
        Route::patch('/{id}', [TaskController::class, 'update'])->name('tasks.update');
        Route::patch('/complete/{id}', [TaskController::class, 'complete'])->name('tasks.complete');
        Route::delete('/{id}', [TaskController::class, 'destroy'])->name('tasks.delete');
    });

    // Users & Employees
    Route::prefix('users')->middleware(['auth', 'permission:employee_management'])->group(function () {
        Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
        Route::patch('/register/{id}', [RegisterController::class, 'update'])->name('register.update');
        Route::get('/{id}', [UserController::class, 'show'])->name('users.show');
    });


    Route::prefix('employees')->group(function () {
        Route::get('/', [EmployeeController::class, 'index'])->name('employees.index');
        Route::get('/{id}', [EmployeeController::class, 'show'])->name('employees.show');
        Route::patch('/update/{id}', [EmployeeController::class, 'update'])->name('employees.update');
        Route::delete('/{id}', [EmployeeController::class, 'destroy'])->name('employees.delete');
    });

    // Jobs
    Route::prefix('jobs')->middleware(['auth', 'permission:job_management'])->group(function () {
        Route::get('/', [JobController::class, 'index'])->name('jobs.index');
        Route::get('/{job}', [JobController::class, 'show'])->name('jobs.show');
        Route::post('/', [JobController::class, 'store'])->name('jobs.store');
        Route::patch('/update/{id}', [JobController::class, 'update'])->name('jobs.update');
        Route::delete('/delete/{id}', [JobController::class, 'destroy'])->name('jobs.delete');
    });

    // Departments
    Route::prefix('departments')->middleware(['auth', 'permission:department_management'])->group(function () {
        Route::get('/', [DepartmentController::class, 'index'])->name('departments.index');
        Route::get('/{department}', [DepartmentController::class, 'show'])->name('departments.show');
        Route::post('/', [DepartmentController::class, 'store'])->name('departments.store');
        Route::patch('/{department}', [DepartmentController::class, 'update'])->name('departments.update');
        Route::delete('/{department}', [DepartmentController::class, 'destroy'])->name('departments.delete');
    });

    // Logs
    Route::get('/logs', [LogController::class, 'index'])->name('logs.index');

    // Notifications
    Route::get('/notifications', function (Request $request) {
        return response()->json(['notifications' => $request->user()->unreadNotifications]);
    })->name('notifications.index');
});

// Email Preview
Route::get('/preview-email', function () {
    return view('emails.event-created', [
        'event' => (object) ['name' => 'Test Event', 'date' => '2025-02-10', 'id' => 123],
        'user' => (object) ['firstname' => 'Renz'],
    ]);
});

require __DIR__.'/auth.php';
