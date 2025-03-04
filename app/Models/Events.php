<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use App\Notifications\EventCreated;
use App\Notifications\EventUpdated;

class Events extends Model
{
    /** @use HasFactory<\Database\Factories\EventsFactory> */
    use HasFactory;

    protected $fillable = [
		"name",
		"location",
		"date",
		"status",
		"personnel",
		"user_id",
		"notification_sent",
		"notes",
	];

    protected $casts = [
        "personnel" => "array", 
    ];

	const ALLOWED_STATUSES = [
        'pending',
        'preparation',
        'in-progress',
        'post-event',
        'completed',
		'cancelled',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

	public function setStatusAttribute($value)
    {
        if (!in_array($value, self::ALLOWED_STATUSES, true)) {
            throw ValidationException::withMessages([
                'status' => "The status must be one of the following: " . implode(', ', self::ALLOWED_STATUSES),
            ]);
        }

        $this->attributes['status'] = $value;
    }

    protected static function booted()
    {
        static::created(function ($event) {
            if ($event->user) {
                $event->user->notify(new EventCreated($event));
            }
        });

        static::updated(function ($event) {
            if ($event->user) {
                $event->user->notify(new EventUpdated($event));
            }
        });
    }
}
