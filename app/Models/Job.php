<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_title',
        'job_description',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'position', 'job_title');
    }
}
