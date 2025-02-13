<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EmployeeController;

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/events', [EventsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('events.index');

Route::get('/employees', [EmployeeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('employees.index');


Route::get('/sales', function () {
    return Inertia::render('Sales');
})->middleware(['auth', 'verified'])->name('sales');


Route::middleware('auth')->group(function () {
    //Users
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    
    //Events
    Route::post('/events', [EventsController::class, 'store'])->name('events.store');
    Route::get('/events/{id}', [EventsController::class, 'show'])->name('events.show');
    Route::patch('/events/{id}', [EventsController::class, 'update'])->name('events.update');
    Route::delete('/events/{id}', [EventsController::class, 'destroy'])->name('events.delete');

    //Tasks
    Route::get('/tasks', [TaskController::class, 'index'])->name("tasks.index");
    Route::get('/tasks/{eventId}', [TaskController::class, 'show'])->name('tasks.show');
    Route::post('/tasks', [TaskController::class, 'store'])->name("tasks.store");
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->name('tasks.delete');

    

});

Route::middleware(['auth'])->get('/notifications', function (Request $request) {
    return response()->json([
        'notifications' => $request->user()->unreadNotifications
    ]);
})->name('notifications.index');

// // Mark a notification as read
// Route::middleware(['auth'])->post('/notifications/{id}/read', function ($id) {
//     $notification = auth()->user()->notifications()->find($id);
    
//     if ($notification) {
//         $notification->markAsRead();
//         return response()->json(['message' => 'Notification marked as read']);
//     }

//     return response()->json(['message' => 'Notification not found'], 404);
// })->name('notifications.read');

// // Mark all notifications as read
// Route::middleware(['auth'])->post('/notifications/read-all', function () {
//     auth()->user()->unreadNotifications->markAsRead();
//     return response()->json(['message' => 'All notifications marked as read']);
// })->name('notifications.read-all');

Route::get('/preview-email', function () {
    $event = (object) [
        'name' => 'Test Event',
        'date' => '2025-02-10',
        'id' => 123
    ];
    return view('event-created', compact('event'));
});



require __DIR__.'/auth.php';
