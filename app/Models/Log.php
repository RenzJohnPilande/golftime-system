<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = ['action', 'action_by', 'details', 'ip_address', 'user_agent'];

    public function user()
    {
        return $this->belongsTo(User::class, 'action_by');
    }
}
