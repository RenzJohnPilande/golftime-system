<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AboutUsSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('about_us_sections')->insert([
            [
                'section_type' => 'company profile',
                'content' => 'Golf Time Corp. was established in the year 2015 as the Official Distributor of K&G Golf Fashion in the Philippines. As one of the Top 3 leading high-class fashion sports apparel and accessories for golf, we have been participating in the big tournaments of the different major golf courses in the Philippines, for around 300+ events yearly. As we strive to be trusted golf wear, Golf Time Corp aims to distribute and deliver our products nationwide and become the No. 1 golf wear distributor in the coming years.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'section_type' => 'Our Mission',
                'content' => 'At Golf Time Corp., our mission is to elevate the golfing experience by providing high-quality, innovative, and stylish apparel that not only enhances performance on the course but also reflects the unique lifestyle and passion of golf enthusiasts. We strive to be a trusted companion to golfers worldwide, delivering products that blend functionality with fashion, enabling every player to express their individuality while enjoying the game they love.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'section_type' => 'Our Vision',
                'content' => 'At Golf Time Corp., our vision is to inspire confidence and pride in golfers of all levels, fostering a community where our brand is celebrated for its commitment to quality, sustainability, and continuous innovation. By staying at the forefront of design and technology, we aim to create a lasting impact on the golfing world, shaping the future of the sport with our iconic and purposeful apparel.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
