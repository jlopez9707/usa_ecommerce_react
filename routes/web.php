<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::resource('products', ProductController::class)->names('admin.products');
        Route::resource('categories', CategoryController::class)->names('admin.categories');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
