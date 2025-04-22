<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller;
use App\Models\AboutUsSection;
use App\Models\Constant;
use App\Models\ContactInfo;
use App\Models\HeroBanner;
use App\Models\Promotion;
use App\Models\TopbarAlert;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('CMS/ContentManagement', [
            "promotions" => Promotion::all(),
            "aboutInfos" => AboutUsSection::all(),
            "contactInfos" => ContactInfo::all(),
            "banners" => HeroBanner::all(),
            "alerts" => TopbarAlert::all(),
            "constants" => Constant::orderBy('type')->get(),
        ]);
    }
}
