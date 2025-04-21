<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed permissions
        $this->call(PermissionSeeder::class);

        // Seed contact info
        $this->call(ContactInfoSeeder::class);

        // Create a user with admin details
        $user = User::factory()->create([
            'firstname' => 'Renz',
            'lastname' => 'Pilande',
            'middlename' => 'Ora',
            'email' => 'admin@golftime.ph',
            'password' => Hash::make('password'),
        ]);

        // Get the 'admin' permission
        $adminPermission = Permission::where('name', 'admin')->first();

        // Assign the 'admin' permission to the user
        if ($adminPermission) {
            DB::table('permission_user')->insert([
                'user_id' => $user->id,
                'permission_id' => $adminPermission->id,
            ]);
        }
    }
}
