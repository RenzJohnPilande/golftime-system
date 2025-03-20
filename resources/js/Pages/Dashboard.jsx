import DashboardCard from '@/components/DashboardCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    MdBusiness,
    MdChecklist,
    MdEvent,
    MdNotificationImportant,
    MdOutlineCases,
    MdPeople,
} from 'react-icons/md';
import EmployeeChart from './Charts/EmployeeChart';
import EventChart from './Charts/EventChart';
import TaskChart from './Charts/TaskChart';

const Dashboard = ({ permissions, logs, data }) => {
    console.log('Events:', data.events);
    console.log('Tasks:', data.tasks);
    console.log('Employees:', data.employees);
    const chartConfig = {
        pending: {
            label: 'Pending',
            color: '#FACC15',
        },
        preparation: {
            label: 'Preparation',
            color: '#60A5FA',
        },
        ongoing: {
            label: 'Ongoing',
            color: '#C084FC',
        },
        completed: {
            label: 'Completed',
            color: '#4ADE80',
        },
        cancelled: {
            label: 'Cancelled',
            color: '#F87171',
        },
    };

    const chartData = Object.entries(
        data?.events.reduce((acc, event) => {
            const status = event.status || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {}),
    ).map(([status, count]) => ({
        status,
        count: count,
        fill: chartConfig[status]?.color || '#000',
    }));

    const cardData = [
        {
            permission: 'event_management',
            current: 6,
            title: 'My Events',
            sub: 'Total Events',
            icon: MdEvent,
            color: 'purple',
            total: 20,
        },
        {
            permission: 'task_management',
            current: 12,
            title: 'My Tasks',
            sub: 'Total Tasks',
            icon: MdChecklist,
            color: 'blue',
            total: 50,
        },
        {
            permission: 'employee_management',
            current: 50,
            title: 'Current Employees',
            sub: 'Total Employees',
            icon: MdPeople,
            color: 'green',
            total: 200,
        },
        {
            permission: 'department_management',
            current: 8,
            title: 'Departments',
            sub: 'Total Departments',
            icon: MdBusiness,
            color: 'red',
            total: 15,
        },
        {
            permission: 'job_management',
            current: 15,
            title: 'Job Positions',
            sub: 'Total jobs',
            icon: MdOutlineCases,
            color: 'yellow',
            total: 30,
        },
    ];

    const filteredCards = permissions.includes('admin')
        ? cardData
        : cardData.filter((card) => permissions.includes(card.permission));

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex h-screen w-full flex-col bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-center justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Dashboard
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Stay updated with key insights, recent activities,
                            and essential tools to help you manage your workflow
                            efficiently.
                        </h2>
                    </div>
                </div>
                <div className="grid w-full grid-cols-2 items-center gap-4 py-4 md:grid-cols-3 xl:grid-cols-6">
                    {filteredCards.map((card, index) => (
                        <DashboardCard
                            key={index}
                            icon={card.icon}
                            current={card.current}
                            title={card.title}
                            color={card.color}
                            total={card.total}
                            sub={card.sub}
                        />
                    ))}
                    <DashboardCard
                        key="sample"
                        icon={MdNotificationImportant}
                        current="sample"
                        title="sample"
                        color="gray"
                        total="sample"
                        sub="sample"
                    />
                </div>
                <div className="flex w-full grow flex-wrap gap-4 pb-4 md:flex-nowrap">
                    <div className="flex w-full grow flex-wrap content-start gap-4 overflow-auto rounded border border-zinc-300 bg-white p-4 shadow-lg">
                        <p className="text-lg font-semibold">Performance</p>
                        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                            <EventChart data={data.events} />
                            <TaskChart data={data.tasks} />
                            <EmployeeChart data={data.employees} />
                        </div>
                    </div>

                    <div className="flex w-full max-w-[400px] flex-col content-start overflow-auto rounded border border-zinc-300 bg-white p-4 text-zinc-800 shadow-lg">
                        <p className="mb-4 text-lg font-semibold">Recents</p>
                        <div className="flex w-full flex-col gap-2 capitalize">
                            {logs.map((log, index) => (
                                <div
                                    key={index}
                                    className="flex w-full flex-wrap items-center justify-between gap-4 rounded border-2 border-zinc-300 shadow hover:bg-zinc-100"
                                >
                                    <div className="flex flex-col px-2 py-3">
                                        <p className="text-[10px] font-bold">
                                            Action
                                        </p>
                                        <p className="text-sm font-medium">
                                            {log.action}
                                        </p>
                                    </div>
                                    <div className="px-2 py-3">
                                        <p className="text-[10px] font-bold">
                                            Date
                                        </p>
                                        <p className="text-sm font-medium">
                                            {(() => {
                                                const date = new Date(
                                                    log.created_at,
                                                );
                                                return date.toLocaleDateString(
                                                    'en-PH',
                                                    {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric',
                                                    },
                                                );
                                            })()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
