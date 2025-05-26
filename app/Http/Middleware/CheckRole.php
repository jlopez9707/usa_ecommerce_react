<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // If no roles are specified, check if user can access admin area
        if (empty($roles) && !$request->user()->canAccessAdmin()) {
            return redirect()->route('home')->with('error', 'No tienes permisos para acceder a esta sección.');
        }

        // If roles are specified, check if user has any of those roles
        if (!empty($roles) && !in_array($request->user()->role, $roles)) {
            return redirect()->route('home')->with('error', 'No tienes permisos para acceder a esta sección.');
        }

        return $next($request);
    }
}
