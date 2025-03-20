import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { LabelList, Pie, PieChart } from 'recharts';

const TaskChart = ({ data }) => {
    const chartConfig = {
        pending: { label: 'Pending', color: '#3B82F6' }, // Blue-500
        ongoing: { label: 'Ongoing', color: '#2563EB' }, // Blue-600
        complete: { label: 'Completed', color: '#1E40AF' }, // Blue-800
    };

    // Transform task data into chart format
    const chartData = Object.entries(
        data?.reduce((acc, task) => {
            const status = task.status || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {}),
    ).map(([status, count]) => ({
        status,
        count,
        fill: chartConfig[status]?.color || '#000',
    }));

    return (
        <Card className="flex w-full flex-col border-0 shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>Task Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="w-full flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px] min-h-[250px] w-full"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="count"
                                    hideLabel
                                />
                            }
                        />
                        <Pie data={chartData} dataKey="count" nameKey="status">
                            <LabelList
                                dataKey="status"
                                className="fill-background"
                                stroke="none"
                                fontSize={10}
                                position="inside"
                                fill="#ffffff"
                                formatter={(value) => chartConfig[value]?.label}
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="status" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="w-full flex-col gap-2">
                <p className="w-full text-balance text-center text-xs">
                    This chart displays the number of tasks categorized by their
                    current status (Pending, Ongoing, Completed).
                </p>
            </CardFooter>
        </Card>
    );
};

export default TaskChart;
