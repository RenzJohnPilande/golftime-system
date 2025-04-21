<?php

use App\Http\Controllers\AboutUsSectionController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CMS\ContentManagementController;
use App\Http\Controllers\ContactInfoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\HeroBannerController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\TopbarAlertController;
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


    Route::prefix('employees')->middleware(['auth', 'permission:employee_management'])->group(function () {
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

    // CMS
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('products.index');
        Route::post('/', [ProductController::class, 'store'])->name('products.store');
        Route::get('/{id}', [ProductController::class, 'show'])->name('products.show');
        Route::patch('/{product}/details', [ProductController::class, 'updateDetails'])->name('products.updateDetails');
        Route::patch('/{product}/thumbnail', [ProductController::class, 'updateThumbnail'])->name('products.updateThumbnail');
        Route::patch('/{product}/images', [ProductController::class, 'updateImages'])->name('products.updateImages');
        Route::delete('/{product}', [ProductController::class, 'destroy'])->name('products.delete');
        Route::post('/temp-upload', [ProductController::class, 'tempUpload'])->name('products.tempUpload');
        Route::post('/temp-thumbnail-upload', [ProductController::class, 'tempThumbnailUpload'])->name('products.tempThumbnailUpload');
    });

    Route::prefix('articles')->group(function () {
        Route::get('/', [ArticleController::class, 'index'])->name('articles.index');
        Route::post('/', [ArticleController::class, 'store'])->name('articles.store');
        Route::get('/{id}', [ArticleController::class, 'show'])->name('articles.show');
        Route::patch('/{article}', [ArticleController::class, 'update'])->name('articles.update');
        Route::post('/temp-cover-upload', [ArticleController::class, 'tempCoverUpload'])->name('articles.tempCoverUpload');
        Route::patch('/{article}/Cover', [ArticleController::class, 'updateCover'])->name('articles.updateCover');
        Route::delete('/{article}', [ArticleController::class, 'destroy'])->name('articles.delete');
    });

    Route::prefix('cms')->group(function () {
        Route::prefix('management')->group(function () {
            Route::get('/', [ContentManagementController::class, 'index'])->name('cms.index');
        });

        // Promotion CMS routes
        Route::prefix('promotioncms')->group(function () {
            Route::get('/', [PromotionController::class, 'index'])->name('promotioncms.index');
            Route::post('/store', [PromotionController::class, 'store'])->name('promotioncms.store');
            Route::get('/{id}', [PromotionController::class, 'show'])->name('promotioncms.show');
            Route::patch('/{id}', [PromotionController::class, 'update'])->name('promotioncms.update');
            Route::post('/temp-cover-upload', [PromotionController::class, 'tempCoverUpload'])->name('promotioncms.tempCoverUpload');
            Route::patch('/{promotion}/update-cover', [PromotionController::class, 'updateCover'])->name('promotioncms.updateCover');
        });

        // About CMS
        Route::prefix('aboutcms')->group(function () {
            Route::get('/', [AboutUsSectionController::class, 'index'])->name('aboutcms.index');
            Route::get('/{id}', [AboutUsSectionController::class, 'show'])->name('aboutcms.show');
            Route::patch('/{id}', [AboutUsSectionController::class, 'update'])->name('aboutcms.update');
        });

        // Contact CMS
        Route::prefix('contactcms')->group(function () {
            Route::get('/', [ContactInfoController::class, 'index'])->name('contactcms.index');
            Route::get('/{id}', [ContactInfoController::class, 'show'])->name('contactcms.show');
            Route::patch('/{id}', [ContactInfoController::class, 'update'])->name('contactcms.update');
        });

        // Banner CMS
        Route::prefix('bannercms')->group(function () {
            Route::get('/', [HeroBannerController::class, 'index'])->name('bannercms.index');
            Route::post('/store', [HeroBannerController::class, 'store'])->name('bannercms.store');
            Route::get('/{id}', [HeroBannerController::class, 'show'])->name('bannercms.show');
            Route::patch('/{id}', [HeroBannerController::class, 'update'])->name('bannercms.update');
            Route::post('/temp-upload', [HeroBannerController::class, 'tempUpload'])->name('bannercms.tempUpload');
            Route::patch('/{banner}/update-images', [HeroBannerController::class, 'updateImages'])->name('bannercms.updateImages');
            Route::delete('/{id}', [HeroBannerController::class, 'destroy'])->name('bannercms.delete');
        });

        // Alert CMS
        Route::prefix('alertcms')->group(function () {
            Route::get('/', [TopbarAlertController::class, 'index'])->name('alertcms.index');
            Route::post('/store', [TopbarAlertController::class, 'store'])->name('alertcms.store');
            Route::get('/{id}', [TopbarAlertController::class, 'show'])->name('alertcms.show');
            Route::patch('/{id}', [TopbarAlertController::class, 'update'])->name('alertcms.update');
            Route::delete('/{id}', [TopbarAlertController::class, 'destroy'])->name('alertcms.delete');
        });
    });

    // Logs
    Route::get('/logs', [LogController::class, 'index'])->name('logs.index');

    Route::get('/error/{code}', [ErrorController::class, 'show'])->name('error.page');

    // Notifications
    Route::get('/notifications', function (Request $request) {
        return response()->json(['notifications' => $request->user()->unreadNotifications]);
    })->name('notifications.index');
});

Route::get('/', [ShopController::class, 'index']);
Route::get('/shop', [ShopController::class, 'shop']);
Route::get('/news', [ShopController::class, 'news']);
Route::get('/about', [ShopController::class, 'about']);
Route::get('/about/company-profile', [ShopController::class, 'companyProfile']);
Route::get('/about/mission', [ShopController::class, 'mission']);
Route::get('/about/vision', [ShopController::class, 'vision']);
Route::get('/contact', [ShopController::class, 'contact']);

// Email Preview
Route::get('/preview-email', function () {
    return view('emails.event-created', [
        'event' => (object) ['name' => 'Test Event', 'date' => '2025-02-10', 'id' => 123],
        'user' => (object) ['firstname' => 'Renz'],
    ]);
});

require __DIR__ . '/auth.php';

Route::fallback(function () {
    return Inertia::render('Errors/ErrorPage', [
        'status' => 404,
        'message' => 'Page Not Found',
    ])->toResponse(request())->setStatusCode(404);
});
