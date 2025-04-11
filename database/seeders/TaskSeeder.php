<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['pending', 'ongoing', 'complete'];
        $tasks = [];

        for ($month = 1; $month <= 12; $month++) {
            $taskCount = rand(3, 6); // Random number of tasks per month

            for ($i = 1; $i <= $taskCount; $i++) {
                $tasks[] = [
                    'task_name' => "Task {$i} for " . Carbon::create(2024, $month, 1)->format('F'),
                    'task_description' => "Description for task {$i} in " . Carbon::create(2024, $month, 1)->format('F'),
                    'deadline' => Carbon::create(2024, $month, rand(1, 28))->toDateString(),
                    'type' => 'individual',
                    'status' => $statuses[array_rand($statuses)],
                    'event_id' => null,
                    'assigned_to' => 2,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('tasks')->insert($tasks);
    }
}
