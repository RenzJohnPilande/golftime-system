<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Shop/pages/Index');
    }
    public function shop(Request $request)
    {
        return Inertia::render('Shop/pages/Shop');
    }
    public function news(Request $request)
    {
        return Inertia::render('Shop/pages/News');
    }
    public function about(Request $request)
    {
        return Inertia::render('Shop/pages/About');
    }
    public function contact(Request $request)
    {
        return Inertia::render('Shop/pages/Contact');
    }
}
