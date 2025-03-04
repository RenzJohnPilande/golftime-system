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
        $this->event = $task->event;
        $this->user = $task->event->user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database']; // Add database notifications
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Reminder: Task "' . $this->task->task_name . '" Due Tomorrow')
            ->greeting('Hello ' . $this->user->name . '!')
            ->line('This is a reminder that your task "' . $this->task->task_name . '" for the event "' . $this->event->name . '" is due tomorrow.')
            ->line('Make sure to complete it on time!')
            ->line('Thank you for staying on top of your tasks!');
    }

    /**
     * Store the notification in the database.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'task_name' => $this->task->task_name,
            'event_id' => $this->event->id,
            'event_name' => $this->event->name,
            'assigned_to' => $this->user ? $this->user->name : 'Unknown',
            'message' => 'Reminder: Your task "' . $this->task->task_name . '" for event "' . $this->event->name . '" is due tomorrow.',
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
            'event_id' => $this->event->id,
            'event_name' => $this->event->name,
            'due_date' => $this->task->deadline,
        ];
    }
}
