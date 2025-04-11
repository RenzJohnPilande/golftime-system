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

const DepartmentChart = ({ data }) => {
    const chartColors = ['#5EEAD4', '#2DD4BF', '#14B8A6', '#0D9488', '#0F766E'];

    const chartData = Object.entries(
        data?.reduce((acc, department, index) => {
            const name = department.name || 'Unknown';
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {}),
    ).map(([name, count], index) => ({
        name,
        count,
        fill: '#5EEAD4',
    }));

    console.log(chartData);

    return (
        <Card className="flex w-full flex-col border-0 shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent className="w-full flex-1 pb-0">
                <ChartContainer className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px] min-h-[250px] w-full">
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="count"
                                    hideLabel
                                />
                            }
                        />
                        <Pie data={chartData} dataKey="count" nameKey="name">
                            <LabelList
                                dataKey="name"
                                className="fill-background"
                                stroke="none"
                                fontSize={10}
                                position="inside"
                                fill="#ffffff"
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="w-full flex-col gap-2">
                <p className="w-full text-balance text-center text-xs">
                    This chart displays the number of employees categorized by
                    their respective departments.
                </p>
            </CardFooter>
        </Card>
    );
};

export default DepartmentChart;
