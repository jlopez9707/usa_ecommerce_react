<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('home');
    }
    
    public function store()
    {
        return Inertia::render('store');
    }

    public function cart()
    {
        return Inertia::render('cart');
    }

    public function show()
    {
        return Inertia::render('product-details');
    }
}
