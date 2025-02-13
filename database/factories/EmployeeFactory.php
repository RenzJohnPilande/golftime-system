<?php

namespace Database\Factories;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'position' => $this->faker->jobTitle,
            'department' => $this->faker->randomElement(['HR', 'Engineering', 'Sales']),
            'salary' => $this->faker->randomFloat(2, 30000, 150000),
            'hire_date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['active', 'inactive', 'terminated']),
        ];
    }
}
