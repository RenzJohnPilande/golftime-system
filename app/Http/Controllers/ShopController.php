<?php

namespace App\Http\Controllers;

use App\Models\AboutUsSection;
use App\Models\Article;
use App\Models\ContactInfo;
use App\Models\HeroBanner;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\TopbarAlert;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Shop/pages/Index', [
            'banners' => HeroBanner::all(),
            'shirts' => Product::whereJsonContains('categories', 'shirts')->latest()->take(6)->get(),
            'accessories' => Product::whereJsonContains('categories', 'accessories')->latest()->take(4)->get(),
            'news' => Article::latest()->take(6)->get(),
            'alerts' => TopbarAlert::all(),
            'promotions' => Promotion::all(),
        ]);
    }

    public function shop(Request $request)
    {
        return Inertia::render('Shop/pages/Shop', [
            'products' => Product::paginate(8),
            'articles' => Article::latest()->take(4)->get(),
            'alerts' => TopbarAlert::all(),
        ]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Shop/pages/ProductShow', [
            'product' => $product,
        ]);
    }

    public function category($slug)
    {
        return Inertia::render('Shop/pages/Shop', [
            'products' => Product::whereJsonContains('categories', $slug)->paginate(8),
            'articles' => Article::latest()->take(4)->get(),
            'alerts' => TopbarAlert::all(),
            'activeCategory' => $slug,
        ]);
    }

    public function news(Request $request)
    {
        return Inertia::render('Shop/pages/News', [
            'products' => Product::latest()->take(4)->get(),
            'articles' => Article::paginate(6),
            'alerts' => TopbarAlert::all(),
        ]);
    }

    public function about(Request $request)
    {
        return Inertia::render('Shop/pages/About', [
            'alerts' => TopbarAlert::all(),
        ]);
    }

    public function companyProfile(Request $request)
    {
        $companyProfile = AboutUsSection::find(1);

        return Inertia::render('Shop/pages/CompanyProfile', [
            'content' => $companyProfile,
            'alerts' => TopbarAlert::all(),
        ]);
    }

    public function mission(Request $request)
    {
        $mission = AboutUsSection::find(2);

        return Inertia::render('Shop/pages/Mission', [
            'content' => $mission,
            'alerts' => TopbarAlert::all(),
        ]);
    }

    public function vision(Request $request)
    {
        $vision = AboutUsSection::find(3);

        return Inertia::render('Shop/pages/Vision', [
            'content' => $vision,
            'alerts' => TopbarAlert::all(),
        ]);
    }


    public function contact(Request $request)
    {
        return Inertia::render('Shop/pages/Contact', [
            'alerts' => TopbarAlert::all(),
            'info' => ContactInfo::first(),
        ]);
    }
}
