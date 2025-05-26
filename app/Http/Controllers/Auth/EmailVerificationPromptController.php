<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Show the email verification prompt page.
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            // Redirección basada en rol
            if (Auth::user()->role === 'admin') {
                return redirect()->intended(route('dashboard', absolute: false));
            } else {
                return redirect()->intended(route('home', absolute: false));
            }
        }

        return Inertia::render('auth/verify-email', ['status' => $request->session()->get('status')]);
    }
}
