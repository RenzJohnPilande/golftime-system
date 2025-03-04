<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use App\Notifications\TaskCreated;

class Task extends Model
{
    use HasFactory;

    // Mass assignable attributes
    protected $fillable = [
        'task_name',
        'deadline',
        'type',
        'status',
        'event_id', 
    ];

    protected $casts = [
        'deadline' => 'datetime',
    ];

    // Constants for Task Types (optional)
    const ALLOWED_TYPES = [
        'event',
        'miscellaneous', 
        'admin', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Events::class);
    }

    /**
     * Accessor to ensure task type is always valid
     */
    public function setTypeAttribute($value)
    {
        if (!in_array($value, self::ALLOWED_TYPES, true)) {
            throw ValidationException::withMessages([
                'type' => "The type must be one of the following: " . implode(', ', self::ALLOWED_TYPES),
            ]);
        }

        $this->attributes['type'] = $value;
    }

    /**
     * Scope to filter by task type (example scope)
     */
    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to filter by event (optional if you want to easily filter tasks by event)
     */
    public function scopeForEvent($query, $eventId)
    {
        return $query->where('event_id', $eventId);
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($task) {
            $user = $task->event->user;

            if ($user) {
                $user->notify(new TaskCreated($task));
            } else {
                \Log::warning("Task created without an associated user for Event ID {$task->event_id}. Task ID: {$task->id}");
            }
        });
    }
}
