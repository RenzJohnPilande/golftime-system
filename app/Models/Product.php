<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'thumbnail',
        'images',
        'categories',
        'materials',
        'sizes',
        'colors',
    ];

    protected $casts = [
        'images' => 'array',
        'categories' => 'array',
        'materials' => 'array',
        'sizes' => 'array',
        'colors' => 'array',
    ];
}
