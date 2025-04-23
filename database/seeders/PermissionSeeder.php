<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            ['name' => 'admin', 'description' => "admin"],
            ['name' => 'event_management', 'description' => "event management"],
            ['name' => 'task_management', 'description' => "task management"],
            ['name' => 'employee_management', 'description' => "employee management"],
            ['name' => 'role_management', 'description' => "role management"],
            ['name' => 'department_management', 'description' => "department management"],
            ['name' => 'content_management', 'description' => "content management"],
        ];

        DB::table('permissions')->insert($permissions);
    }
}
