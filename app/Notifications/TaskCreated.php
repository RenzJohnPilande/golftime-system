<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskCreated extends Notification
{
    use Queueable;

    public $event;
    public $user;
    public $task;

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
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('New Task Assigned: ' . $this->task->task_name)
        ->greeting('Hello ' . $notifiable->name . ',')
        ->line("A new task has been added to the event **" . $this->event->name . "** by **" . ($this->user ? $this->user->name : "Unknown") . "**.")
        ->line('**Task:** ' . $this->task->task_name)
        ->line('**Type:** ' . ucfirst($this->task->type))
        ->line('**Deadline:** ' . ($this->task->deadline ? $this->task->deadline->format('F d, Y') : 'No deadline set'))
        ->action('View Event', url('/events/' . $this->event->id))
        ->line("This is just a notification. No action is required.")
        ->salutation('Best regards,  
        **Golf Time PH Team**');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'task_name' => $this->task->task_name,
            'event_id' => $this->event->id,
            'event_name' => $this->event->name,
            'created_by' => $this->user ? $this->user->name : 'Unknown',
            'message' => 'A new task "' . $this->task->task_name . '" has been added to event "' . $this->event->name . '" by ' . ($this->user ? $this->user->name : 'someone') . '.',
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
            //
        ];
    }
}
