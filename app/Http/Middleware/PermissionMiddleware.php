<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $permission)
    {
        if (!auth()->check()) {
            return $this->denyAccess('You must be logged in.');
        }

        $user = $request->user();

        if ($user->hasPermission('admin') || $user->hasPermission($permission)) {
            return $next($request);
        }

        return $this->denyAccess('You do not have permission.');
    }

    private function denyAccess($message)
    {
        return Inertia::render('Errors/ErrorPage', [
            'status' => 403,
            'message' => $message,
        ])->toResponse(request())->setStatusCode(403);
    }
}
