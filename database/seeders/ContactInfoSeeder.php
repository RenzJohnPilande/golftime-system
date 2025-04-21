<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContactInfo::create([
            'email' => 'Service@Golftime.Ph',
            'address' => 'Lot 1b Blk 3-E Marigold St. Jasmine St. Unit Ruby Park, Victoria Homes Tunasan Muntinlupa City',
            'phone' => '02-83506666',
            'business_hours' => 'Monday - Friday: 9:00 AM - 6:00 PM',
        ]);
    }
}
