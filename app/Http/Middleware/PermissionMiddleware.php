<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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
            abort(403, 'You must be logged in.');
        }
    
        $user = $request->user();
    
        if ($user->hasPermission('admin') || $user->hasPermission($permission)) {
            return $next($request);
        }
    
        abort(403, 'You do not have permission.');
    }
}
