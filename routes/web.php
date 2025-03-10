<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    if (auth()->check()) { 
        return redirect()->route('dashboard');
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/events', [EventsController::class, 'index'])->name('events.index');
    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy'])->name('employees.delete');
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::get('/sales', fn() => Inertia::render('Sales'))->name('sales');

    // Users
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Events
    Route::post('/events', [EventsController::class, 'store'])->name('events.store');
    Route::get('/events/{id}', [EventsController::class, 'show'])->name('events.show');
    Route::patch('/events/{id}', [EventsController::class, 'update'])->name('events.update');
    Route::delete('/events/{id}', [EventsController::class, 'destroy'])->name('events.delete');

    // Tasks
    Route::get('/tasks', [TaskController::class, 'index'])->name("tasks.index");
    Route::get('/tasks/{eventId}', [TaskController::class, 'show'])->name('tasks.show');
    Route::get('/tasks/show/{id}', [TaskController::class, 'show_task'])->name('tasks.show_task');
    Route::post('/tasks', [TaskController::class, 'store'])->name("tasks.store");
    Route::patch('/tasks/{id}', [TaskController::class, 'update'])->name('tasks.update');
    Route::patch('/tasks/complete/{id}', [TaskController::class, 'complete'])->name('tasks.complete');
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->name('tasks.delete');

    // Users
    Route::get('/account', [UserController::class, 'index'])->name("account.index");
    Route::post('/register/store', [RegisterController::class, 'store'])->name('register.store');
    Route::patch('/register/update/{id}', [RegisterController::class, 'update'])->name('register.update');
    Route::get('/employees/{id}', [EmployeeController::class, 'show'])->name('employees.show');
    Route::patch('/employees/update/{id}', [EmployeeController::class, 'update'])->name('employees.update');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::patch('/account/update-info/{id}', [UserController::class, 'update_info'])->name("account.update_info");
    Route::patch('/account/update-contact/{id}', [UserController::class, 'update_contact_info'])->name("account.update_contact_info");
    
    // Departments
    Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
    Route::get('/departments/{department}', [DepartmentController::class, 'show'])->name('departments.show');
    Route::post('/departments', [DepartmentController::class, 'store'])->name('departments.store');
    Route::patch('/departments/{department}', [DepartmentController::class, 'update'])->name('departments.update');
    Route::put('/departments/{department}', [DepartmentController::class, 'update'])->name('departments.update'); 
    Route::delete('/departments/{department}', [DepartmentController::class, 'destroy'])->name('departments.delete');

    // Roles
    Route::get('/roles/{role}', [RoleController::class, 'show'])->name('roles.show');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::patch('/roles/update/{id}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/delete/{id}', [RoleController::class, 'destroy'])->name('roles.delete');

    // Logs
    Route::get('/logs', [LogController::class, 'index'])->name('logs.index');

    // Notifications
    Route::get('/notifications', function (Request $request) {
        return response()->json([
            'notifications' => $request->user()->unreadNotifications
        ]);
    })->name('notifications.index');
});

Route::get('/preview-email', function () {
    $event = (object) [
        'name' => 'Test Event',
        'date' => '2025-02-10',
        'id' => 123
    ];
    $user = (object) [
        'firstname' => 'Renz',
    ];
    return view('emails.event-created', compact('event', 'user'));
});

require __DIR__.'/auth.php';
