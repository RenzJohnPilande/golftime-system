<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'supervisor',
    ];

    public function supervisor()
    {
        return $this->belongsTo(Employee::class, 'supervisor');
    }
}
