import DashboardCard from '@/components/DashboardCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    MdBusiness,
    MdChecklist,
    MdEvent,
    MdOutlineCases,
    MdPeople,
} from 'react-icons/md';
import BarChartComponent from './Charts/BarChartComponent';

const Dashboard = ({ permissions, logs, data }) => {
    const cardData = [
        {
            permission: 'event_management',
            mainValue: data?.events?.current,
            title: 'My Events',
            sub: 'Total Events',
            icon: MdEvent,
            color: 'purple',
            subValue: data?.events?.total,
        },
        {
            permission: 'task_management',
            mainValue: data?.tasks?.current,
            title: 'Tasks',
            sub: 'Total Assigned Tasks',
            icon: MdChecklist,
            color: 'blue',
            subValue: data?.tasks?.total,
        },
        {
            permission: 'employee_management',
            mainValue: data?.employees?.active,
            title: 'Active Employees',
            sub: 'Inactive employees',
            icon: MdPeople,
            color: 'green',
            subValue: data?.employees?.inactive,
        },
        {
            permission: 'department_management',
            mainValue: data?.departments?.total,
            title: 'Departments',
            sub: 'Empty Departments',
            icon: MdBusiness,
            color: 'red',
            subValue: data?.departments?.vacancies,
        },
        {
            permission: 'job_management',
            mainValue: data?.jobs?.total,
            title: 'Job Positions',
            sub: 'Open Positions',
            icon: MdOutlineCases,
            color: 'yellow',
            subValue: data?.jobs?.vacancies,
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
                <div className="grid w-full grid-cols-1 items-center gap-4 py-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                    {filteredCards.map((card, index) => (
                        <DashboardCard
                            key={index}
                            icon={card.icon}
                            mainValue={card.mainValue}
                            title={card.title}
                            color={card.color}
                            subValue={card.subValue}
                            sub={card.sub}
                        />
                    ))}
                </div>
                <div className="flex w-full flex-wrap gap-4 pb-4 md:flex-nowrap">
                    <div className="flex w-full flex-wrap">
                        <p className="mb-4 text-lg font-semibold">Charts</p>
                        <div className="flex w-full flex-wrap border bg-white">
                            <BarChartComponent data={data?.tasks?.data} />
                        </div>
                    </div>

                    <div className="flex w-full max-w-[400px] flex-col content-start overflow-auto rounded px-4 text-zinc-800">
                        <p className="mb-4 text-lg font-semibold">Recents</p>
                        <div className="flex w-full flex-col rounded border bg-white capitalize">
                            {logs.map((log, index) => (
                                <div
                                    key={index}
                                    className={`flex w-full flex-wrap items-center justify-between gap-4 border-b border-zinc-300 hover:bg-zinc-100`}
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
