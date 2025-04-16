<?php

namespace App\Http\Controllers;

use App\Models\AboutUsSection;
use App\Models\Article;
use App\Models\Product;
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
        return Inertia::render('Shop/pages/Shop', [
            'products' => Product::all(),
            'articles' => Article::latest()->take(4)->get(),
        ]);
    }
    public function news(Request $request)
    {
        return Inertia::render('Shop/pages/News', [
            'products' => Product::latest()->take(4)->get(),
            'articles' => Article::all(),
        ]);
    }

    public function about(Request $request)
    {
        return Inertia::render('Shop/pages/About');
    }

    public function companyProfile(Request $request)
    {
        $companyProfile = AboutUsSection::find(1);

        return Inertia::render('Shop/pages/CompanyProfile', [
            'content' => $companyProfile,
        ]);
    }

    public function mission(Request $request)
    {
        $mission = AboutUsSection::find(2);

        return Inertia::render('Shop/pages/Mission', [
            'content' => $mission,
        ]);
    }

    public function vision(Request $request)
    {
        $vision = AboutUsSection::find(3);

        return Inertia::render('Shop/pages/Vision', [
            'content' => $vision,
        ]);
    }


    public function contact(Request $request)
    {
        return Inertia::render('Shop/pages/Contact');
    }
}
