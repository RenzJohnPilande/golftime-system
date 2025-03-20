<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = ['events', 'tasks', 'employees', 'jobs', 'departments'];
        $actions = ['view', 'add', 'update', 'delete'];

        foreach ($modules as $module) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => "{$action} {$module}"]);
            }
        }

        // Create roles and assign permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $employeeRole = Role::firstOrCreate(['name' => 'employee']);

        // Assign all permissions to admin
        $adminRole->givePermissionTo(Permission::all());

        // Assign specific permissions to manager
        $managerPermissions = [
            'view events', 'add events', 'update events',
            'view tasks', 'add tasks', 'update tasks',
            'view employees', 'update employees',
            'view jobs',
            'view departments'
        ];
        $managerRole->givePermissionTo($managerPermissions);

        // Assign limited permissions to employees
        $employeePermissions = [
            'view events', 'view tasks', 'view employees'
        ];
        $employeeRole->givePermissionTo($employeePermissions);
    }
}
