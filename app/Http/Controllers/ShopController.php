<?php

namespace App\Http\Controllers;

use App\Models\AboutUsSection;
use App\Models\Article;
use App\Models\Constant;
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
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }

    public function shop(Request $request)
    {
        $search = $request->input('search');

        $products = Product::query()
            ->when(
                $search,
                fn($query) =>
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%");
                })
            )
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('Shop/pages/Shop', [
            'products' => $products,
            'articles' => Article::latest()->take(4)->get(),
            'alerts' => TopbarAlert::all(),
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Shop/pages/ProductShow', [
            'product' => $product,
            'alerts' => TopbarAlert::all(),
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }

    public function category($slug)
    {
        return Inertia::render('Shop/pages/Shop', [
            'products' => Product::whereJsonContains('categories', $slug)->paginate(8),
            'articles' => Article::latest()->take(4)->get(),
            'alerts' => TopbarAlert::all(),
            'activeCategory' => $slug,
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }

    public function news(Request $request)
    {
        return Inertia::render('Shop/pages/News', [
            'products' => Product::latest()->take(4)->get(),
            'articles' => Article::paginate(6),
            'alerts' => TopbarAlert::all(),
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }

    public function about(Request $request)
    {
        return Inertia::render('Shop/pages/About', [
            'alerts' => TopbarAlert::all(),
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }

    public function companyProfile(Request $request)
    {
        $companyProfile = AboutUsSection::find(1);

        return Inertia::render('Shop/pages/CompanyProfile', [
            'content' => $companyProfile,
            'alerts' => TopbarAlert::all(),
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }

    public function mission(Request $request)
    {
        $mission = AboutUsSection::find(2);

        return Inertia::render('Shop/pages/Mission', [
            'content' => $mission,
            'alerts' => TopbarAlert::all(),
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }

    public function vision(Request $request)
    {
        $vision = AboutUsSection::find(3);

        return Inertia::render('Shop/pages/Vision', [
            'content' => $vision,
            'alerts' => TopbarAlert::all(),
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }


    public function contact(Request $request)
    {
        return Inertia::render('Shop/pages/Contact', [
            'alerts' => TopbarAlert::all(),
            'info' => ContactInfo::first(),
            'columns' => Constant::whereIn('type', ["Product Column", "About Column"])->get(),
        ]);
    }
}
