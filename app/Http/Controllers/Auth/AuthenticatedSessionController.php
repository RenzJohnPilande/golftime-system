<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();
        $employee = Employee::where('user_id', $user->id)->first();

        if(!$user->hasPermission('admin') && $employee && $employee->status !== 'active') {
            Auth::logout();
            return redirect()->route('login')->withErrors([
                'email' => 'Your account has been deactivated. Please contact the administrator for assistance.',
            ]);
        }


        if ($employee) {
            $incompleteFields = collect([
                'firstname' => $employee->firstname,
                'lastname' => $employee->lastname,
                'department' => $employee->department,
                'position' => $employee->position,
                'salary' => $employee->salary,
                'hire_date' => $employee->hire_date,
            ])->filter(fn($value) => empty($value));
    
            if ($employee && collect([
                'firstname', 'lastname', 'email', 'sex', 'birthdate', 
                'contact_number', 'address', 'position', 'department', 
                'salary', 'hire_date', 'status'
            ])->contains(fn($field) => is_null($employee->$field))) {
                return redirect()->route('account.index')->with('warning', 'Please complete your profile information.');
            }
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();  
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('login');
    }
}
