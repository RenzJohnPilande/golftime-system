<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Notifications\TaskCreated;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    // Mass assignable attributes
    protected $fillable = [
        'task_name',
        'task_description',
        'deadline',
        'type',
        'status',
        'event_id', 
        'assigned_to',
    ];

    protected $casts = [
        'deadline' => 'datetime',
    ];

    // Constants for Task Types
    const ALLOWED_TYPES = ['event', 'individual'];

    /**
     * Relationship: The event this task is associated with (nullable)
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Events::class, 'event_id');
    }

    /**
     * Relationship: The user assigned to this task
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Scope to filter by task type
     */
    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to filter by event ID
     */
    public function scopeForEvent($query, $eventId)
    {
        return $query->where('event_id', $eventId);
    }

    /**
     * Automatically notify the assigned user when a task is created
     */
    protected static function boot()
    {
        parent::boot();

        static::created(function ($task) {
            // Notify the assigned user
            if ($task->user) { 
                $task->user->notify(new TaskCreated($task));
            } else {
                Log::info("Task created without an assigned user. Task ID: {$task->id}");
            }
        });
    }
}
