<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'firstname',
        'middlename',
        'lastname',
        'position',
        'department',
        'salary',
        'hire_date',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
