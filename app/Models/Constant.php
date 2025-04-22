<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Constant extends Model
{
    protected $fillable = [
        'type',
        'description',
        'value',
        'active',
    ];
}
