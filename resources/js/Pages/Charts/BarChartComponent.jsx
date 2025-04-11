'use client';

import {
    Bar,
    CartesianGrid,
    BarChart as RechartsBarChart,
    XAxis,
} from 'recharts';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

import { format, parseISO } from 'date-fns';

// Function to process tasks based on status (pending, ongoing, complete)
const processChartData = (tasks) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const dataMap = {};

    // Initialize each month with status categories
    months.forEach((month) => {
        dataMap[month] = { month, pending: 0, ongoing: 0, complete: 0 };
    });

    tasks.forEach((task) => {
        const month = format(parseISO(task.deadline), 'MMMM'); // Extract full month name
        if (dataMap[month]) {
            dataMap[month][task.status] += 1; // Increment task count for the corresponding status
        }
    });

    return Object.values(dataMap);
};

const chartConfig = {
    pending: {
        label: 'Pending',
        color: 'hsl(var(--chart-1))',
    },
    ongoing: {
        label: 'Ongoing',
        color: 'hsl(var(--chart-2))',
    },
    complete: {
        label: 'Complete',
        color: 'hsl(var(--chart-3))',
    },
};

const BarChartComponent = ({ data }) => {
    const chartData = processChartData(data);
    console.log('Processed Chart Data:', chartData);

    return (
        <div className="flex w-full flex-wrap">
            <CardHeader className="w-full">
                <CardTitle>Task Status</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
                <ChartContainer
                    config={chartConfig}
                    className="flex max-h-[500px] w-full flex-wrap justify-center"
                >
                    <RechartsBarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)} // Shorten to 3-letter format
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="pending"
                            fill="#EAB308"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="ongoing"
                            fill="#3B82F6"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="complete"
                            fill="#22C55E"
                            radius={[4, 4, 0, 0]}
                        />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </div>
    );
};

export default BarChartComponent;
