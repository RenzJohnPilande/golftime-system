<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskReminder extends Notification
{
    use Queueable;

    public $task;
    public $event;
    public $user;

    /**
     * Create a new notification instance.
     */
    public function __construct($task)
    {
        $this->task = $task;
        $this->event = $task->event ?? null; // Handle tasks without events
        $this->user = $this->event ? $this->event->user : $task->assignedUser ?? null; // Use task's assigned user if no event
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Reminder: Task "' . $this->task->task_name . '" Due Tomorrow')
            ->view('emails.task-reminder', [
                'user' => $this->user,
                'task' => $this->task,
                'event' => $this->event,
            ]);
    }

    /**
     * Store the notification in the database.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'task_name' => $this->task->task_name,
            'event_id' => $this->event ? $this->event->id : null,
            'event_name' => $this->event ? $this->event->name : null,
            'assigned_to' => $this->user ? $this->user->name : 'Unknown',
            'message' => $this->event
                ? 'Reminder: Your task "' . $this->task->task_name . '" for event "' . $this->event->name . '" is due tomorrow.'
                : 'Reminder: Your task "' . $this->task->task_name . '" is due tomorrow.',
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'task_name' => $this->task->task_name,
            'event_id' => $this->event ? $this->event->id : null,
            'event_name' => $this->event ? $this->event->name : null,
            'due_date' => $this->task->deadline,
        ];
    }
}
