<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Events>
 */
class EventsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence, 
            'location' => $this->faker->city, 
            'date' => $this->faker->dateTimeBetween('now', '+1 year'), // Random date in the future
            'status' => $this->faker->randomElement(['upcoming', 'completed', 'canceled']), // Random status
            'personnel' => json_encode(
        $this->faker->randomElements(
            [$this->faker->name, $this->faker->name, $this->faker->name]
        )
    ),
            'user_id' => "1",
            'notification_sent' => $this->faker->boolean, // Random boolean for notification status
            'notes' => $this->faker->optional()->text, // Optional notes field with random text
        ];
    }
}
