<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class EventCreated extends Notification
{
    use Queueable;

    public $event;
    public $user;

    /**
     * Create a new notification instance.
     */
    public function __construct($event)
    {
        $this->event = $event;
        $this->user = $event->user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', "database"];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('New Event Created')
        ->greeting('Hello!')
        ->line('A new event has been created:')
        ->line(new HtmlString('<strong>' . $this->event->name . '</strong>'))
        ->action('View Event', url('/events/' . $this->event->id))
        ->line('Thank you for using our application!')
        ->view('event-created', [
            'event' => $this->event,
            'user' => $this->user,
        ]);
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'event_id' => $this->event->id,
            'event_name' => $this->event->name,
            'message' => 'A new event "' . $this->event->name . '" has been created!',
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
