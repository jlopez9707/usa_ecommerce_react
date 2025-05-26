<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\StoreSettingController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('/store', [HomeController::class, 'store'])->name('store');
Route::get('/cart', [HomeController::class, 'cart'])->name('cart');
Route::get('/product/{product}', [HomeController::class, 'show'])->name('product.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('home');
        }
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::resource('products', ProductController::class)->names('admin.products');
        Route::resource('categories', CategoryController::class)->names('admin.categories');
        Route::resource('storeSettings', StoreSettingController::class)->names('admin.storeSettings');

        // User management routes
        Route::resource('users', \App\Http\Controllers\UserController::class)->names('admin.users');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
