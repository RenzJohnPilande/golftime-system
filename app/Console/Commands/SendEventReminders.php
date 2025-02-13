<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Events;
use App\Models\User;
use Carbon\Carbon;
use App\Notifications\EventReminder;

class SendEventReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'events:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email reminders one day before an event';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tomorrow = Carbon::tomorrow()->toDateString();
        $events = Events::whereDate('date', $tomorrow)->get();

        foreach ($events as $event) {
            $user = User::find($event->user_id);

            if ($user) {
                $user->notify(new EventReminder($event));
                $this->info("Reminder sent to: " . $user->email);
            } else {
                $this->warn("User not found for event: " . $event->id);
            }
        }
    }
}
