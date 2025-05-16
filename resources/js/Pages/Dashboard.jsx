import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    BellRing,
    CalendarDays,
    CalendarRange,
    ClipboardCheck,
    ClipboardList,
    GalleryThumbnails,
    Newspaper,
    Plus,
    Shirt,
} from 'lucide-react';
import { MdBusiness, MdPeople, MdWork } from 'react-icons/md';

const Dashboard = ({ permissions, data }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            {/* Main Content */}
            <div className="flex w-full flex-col overflow-hidden">
                <main className="flex min-h-screen flex-wrap content-start overflow-y-auto bg-zinc-50 p-6">
                    <div className="flex h-full w-full flex-wrap gap-4 pb-6">
                        <div className="flex w-full items-center">
                            <h1 className="text-2xl font-bold text-zinc-900">
                                Dashboard Overview
                            </h1>
                        </div>
                    </div>

                    <div className="flex w-full flex-wrap gap-4">
                        {/* Events */}
                        {['admin', 'event_management'].some((p) =>
                            permissions.includes(p),
                        ) && (
                            <div className="flex w-full flex-wrap">
                                <div className="mb-4 flex w-full flex-wrap border-b">
                                    <h1 className="font-semibold">Events</h1>
                                </div>
                                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-medium text-zinc-900">
                                                Upcoming Events
                                            </h3>
                                            <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                                                {data?.events?.current || 0}{' '}
                                                Total
                                            </span>
                                        </div>
                                        <div className="flex min-h-[150px] flex-1 flex-col items-center justify-start gap-2 px-4 py-2 text-center">
                                            <div className="flex w-full flex-wrap justify-between capitalize">
                                                <p className="text-xs text-zinc-400">
                                                    Event
                                                </p>
                                                <p className="text-xs text-zinc-400">
                                                    Date
                                                </p>
                                            </div>
                                            {data.events.current > 0 ? (
                                                [...data.events.upcoming_events]
                                                    .sort()
                                                    .slice(0, 4)
                                                    .map((event) => (
                                                        <div
                                                            key={event.id}
                                                            className="flex w-full flex-wrap justify-between pb-1"
                                                        >
                                                            <p className="gap-1 text-sm font-medium text-zinc-800">
                                                                {event.name}
                                                            </p>
                                                            <p className="text-sm text-zinc-800">
                                                                {new Date(
                                                                    event.date,
                                                                ).toLocaleDateString(
                                                                    'en-PH',
                                                                    {
                                                                        year: 'numeric',
                                                                        month: '2-digit',
                                                                        day: '2-digit',
                                                                    },
                                                                )}
                                                            </p>
                                                        </div>
                                                    ))
                                            ) : (
                                                <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                                                        <CalendarDays className="h-8 w-8 text-indigo-600" />
                                                    </div>
                                                    <p className="text-zinc-500">
                                                        No upcoming events
                                                        scheduled
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="border-t p-4">
                                            <Link
                                                href="/events"
                                                className="flex w-full items-center justify-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100"
                                            >
                                                <Plus className="mr-1 h-4 w-4" />
                                                Schedule Event
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-medium text-zinc-900">
                                                This Month
                                            </h3>
                                        </div>
                                        {data.events.event_month_total > 0 ? (
                                            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
                                                    <CalendarRange className="h-8 w-8 text-violet-600" />
                                                </div>
                                                <p className="text-zinc-500">
                                                    This month's total events:{' '}
                                                    {
                                                        data.events
                                                            .event_month_total
                                                    }
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
                                                    <CalendarRange className="h-8 w-8 text-violet-600" />
                                                </div>
                                                <p className="text-zinc-500">
                                                    No events this month
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tasks */}
                        {['admin', 'task_management'].some((p) =>
                            permissions.includes(p),
                        ) && (
                            <div className="flex w-full flex-wrap">
                                <div className="mb-4 flex w-full flex-wrap border-b">
                                    <h1 className="font-semibold">Tasks</h1>
                                </div>
                                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-medium text-zinc-900">
                                                Pending Tasks
                                            </h3>
                                            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                                {data?.tasks?.current || 0}{' '}
                                                Tasks
                                            </span>
                                        </div>
                                        <div className="flex min-h-[150px] flex-1 flex-col items-center justify-start gap-2 px-4 py-2 text-center">
                                            {data.tasks.current > 0 ? (
                                                <>
                                                    <div className="flex w-full flex-wrap justify-between capitalize">
                                                        <p className="text-xs text-zinc-400">
                                                            task
                                                        </p>
                                                        <p className="text-xs text-zinc-400">
                                                            deadline
                                                        </p>
                                                    </div>
                                                    {[
                                                        ...data.tasks
                                                            .current_data,
                                                    ]
                                                        .sort(
                                                            (a, b) =>
                                                                new Date(
                                                                    a.deadline,
                                                                ) -
                                                                new Date(
                                                                    b.deadline,
                                                                ),
                                                        )
                                                        .slice(0, 4)
                                                        .map((task) => (
                                                            <div
                                                                key={task.id}
                                                                className="flex w-full flex-wrap justify-between pb-1"
                                                            >
                                                                <p className="gap-1 text-sm font-medium text-zinc-800">
                                                                    {
                                                                        task.task_name
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-zinc-800">
                                                                    {new Date(
                                                                        task.deadline,
                                                                    ).toLocaleDateString(
                                                                        'en-PH',
                                                                        {
                                                                            year: 'numeric',
                                                                            month: '2-digit',
                                                                            day: '2-digit',
                                                                        },
                                                                    )}
                                                                </p>
                                                            </div>
                                                        ))}
                                                </>
                                            ) : (
                                                <div className="flex w-full flex-wrap justify-center">
                                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime-100">
                                                        <ClipboardList className="h-8 w-8 text-lime-600" />
                                                    </div>
                                                    <p className="w-full text-zinc-500">
                                                        No pending tasks
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t p-4">
                                            <Link
                                                href="/tasks"
                                                className="flex w-full items-center justify-center rounded-md bg-amber-50 px-4 py-2 text-sm font-medium capitalize text-amber-600 hover:bg-amber-100"
                                            >
                                                view all Task
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-medium text-zinc-900">
                                                Completed Tasks
                                            </h3>
                                            <span className="rounded-full bg-lime-100 px-2 py-1 text-xs font-medium text-lime-800">
                                                {data?.tasks?.complete || 0}{' '}
                                                Tasks
                                            </span>
                                        </div>
                                        <div className="flex min-h-[150px] flex-1 flex-col items-center justify-start gap-2 px-4 py-2 text-center">
                                            {data.tasks.complete > 0 ? (
                                                <>
                                                    <div className="flex w-full capitalize">
                                                        <p className="text-xs text-zinc-400">
                                                            task
                                                        </p>
                                                    </div>
                                                    {[
                                                        ...data.tasks
                                                            .complete_data,
                                                    ]
                                                        .sort(
                                                            (a, b) =>
                                                                new Date(
                                                                    a.deadline,
                                                                ) -
                                                                new Date(
                                                                    b.deadline,
                                                                ),
                                                        )
                                                        .slice(0, 4)
                                                        .map((task) => (
                                                            <div
                                                                key={task.id}
                                                                className="flex w-full flex-wrap pb-1"
                                                            >
                                                                <p className="text-sm font-medium text-zinc-800">
                                                                    {
                                                                        task.task_name
                                                                    }
                                                                </p>
                                                            </div>
                                                        ))}
                                                </>
                                            ) : (
                                                <div className="flex w-full flex-wrap justify-center">
                                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime-100">
                                                        <ClipboardCheck className="h-8 w-8 text-lime-600" />
                                                    </div>
                                                    <p className="w-full text-zinc-500">
                                                        No completed tasks
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="border-t p-4">
                                            <Link
                                                href="/tasks"
                                                className="flex w-full items-center justify-center rounded-md bg-lime-50 px-4 py-2 text-sm font-medium capitalize text-lime-600 hover:bg-lime-100"
                                            >
                                                View All Tasks
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CMS */}
                        {['admin', 'content_management'].some((p) =>
                            permissions.includes(p),
                        ) && (
                            <div className="flex w-full flex-wrap">
                                <div className="mb-4 flex w-full flex-wrap border-b">
                                    <h1 className="font-semibold">Content</h1>
                                </div>
                                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                    <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-medium text-zinc-900">
                                                Products
                                            </h3>
                                            <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-800">
                                                {data?.cms?.products?.length ||
                                                    0}{' '}
                                                Total
                                            </span>
                                        </div>
                                        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
                                                <Shirt className="h-8 w-8 text-sky-600" />
                                            </div>
                                            <p className="font-medium text-zinc-900">
                                                {data?.cms?.products?.length ||
                                                    0}{' '}
                                                Products
                                            </p>
                                            <p className="mt-1 text-sm text-zinc-500">
                                                Manage your product catalog
                                            </p>
                                        </div>
                                        <div className="border-t p-4">
                                            <Link
                                                href="/products"
                                                className="flex w-full items-center justify-center rounded-md bg-sky-50 px-4 py-2 text-sm font-medium text-sky-600 hover:bg-sky-100"
                                            >
                                                View Products
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-medium text-zinc-900">
                                                Articles
                                            </h3>
                                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                                                {data?.cms?.articles?.length ||
                                                    0}{' '}
                                                Total
                                            </span>
                                        </div>
                                        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                                <Newspaper className="h-8 w-8 text-emerald-600" />
                                            </div>
                                            <p className="font-medium text-zinc-900">
                                                {data?.cms?.articles?.length ||
                                                    0}{' '}
                                                Articles
                                            </p>
                                            <p className="mt-1 text-sm text-zinc-500">
                                                News and blog content
                                            </p>
                                        </div>
                                        <div className="border-t p-4">
                                            <Link
                                                href="/articles"
                                                className="flex w-full items-center justify-center rounded-md bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-100"
                                            >
                                                View Articles
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-medium text-zinc-900">
                                                Banners
                                            </h3>
                                            <span className="rounded-full bg-fuchsia-100 px-2 py-1 text-xs font-medium text-fuchsia-800">
                                                {data?.cms?.banners?.length ||
                                                    0}{' '}
                                                Total
                                            </span>
                                        </div>
                                        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-fuchsia-100">
                                                <GalleryThumbnails className="h-8 w-8 text-fuchsia-600" />
                                            </div>
                                            <p className="font-medium text-zinc-900">
                                                {data?.cms?.banners?.length ||
                                                    0}{' '}
                                                Banners
                                            </p>
                                            <p className="mt-1 text-sm text-zinc-500">
                                                Website banners and hero images
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-medium text-zinc-900">
                                                Alerts
                                            </h3>
                                            <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-800">
                                                {data?.cms?.topbar_alerts
                                                    ?.length || 0}{' '}
                                                Total
                                            </span>
                                        </div>
                                        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                                                <BellRing className="h-8 w-8 text-rose-600" />
                                            </div>
                                            <p className="font-medium text-zinc-900">
                                                {data?.cms?.topbar_alerts
                                                    ?.length || 0}{' '}
                                                Alerts
                                            </p>
                                            <p className="mt-1 text-sm text-zinc-500">
                                                Special offers and campaigns
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Management */}
                        {[
                            'admin',
                            'employee_management',
                            'role_management',
                            'department_management',
                        ].some((p) => permissions.includes(p)) && (
                            <div className="flex w-full flex-wrap">
                                <div className="mb-4 flex w-full flex-wrap border-b">
                                    <h1 className="font-semibold">
                                        Management
                                    </h1>
                                </div>
                                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                                    {['admin', 'employee_management'].some(
                                        (p) => permissions.includes(p),
                                    ) && (
                                        <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                            <div className="flex items-center justify-between border-b p-4">
                                                <h3 className="font-medium text-zinc-900">
                                                    Employees
                                                </h3>
                                                <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
                                                    {data?.employees?.active}{' '}
                                                    Active
                                                </span>
                                            </div>
                                            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                                                    <MdPeople className="h-8 w-8 text-teal-600" />
                                                </div>
                                                <p className="font-medium text-zinc-900">
                                                    {data?.employees?.active +
                                                        data?.employees
                                                            ?.inactive}{' '}
                                                    Total Employees
                                                </p>
                                                <p className="mt-1 text-sm text-zinc-500">
                                                    {data?.employees?.active}{' '}
                                                    active,{' '}
                                                    {data?.employees?.inactive}{' '}
                                                    inactive
                                                </p>
                                            </div>
                                            <div className="border-t p-4">
                                                <Link
                                                    href="/employees"
                                                    className="flex w-full items-center justify-center rounded-md bg-teal-50 px-4 py-2 text-sm font-medium text-teal-600 hover:bg-teal-100"
                                                >
                                                    Manage Employees
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {['admin', 'role_management'].some((p) =>
                                        permissions.includes(p),
                                    ) && (
                                        <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                            <div className="flex items-center justify-between border-b p-4">
                                                <h3 className="font-medium text-zinc-900">
                                                    Job Positions
                                                </h3>
                                                <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-800">
                                                    {data?.jobs?.total} Total
                                                </span>
                                            </div>
                                            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100">
                                                    <MdWork className="h-8 w-8 text-cyan-600" />
                                                </div>
                                                <p className="font-medium text-zinc-900">
                                                    {data?.jobs?.total} Job
                                                    Positions
                                                </p>
                                                <p className="mt-1 text-sm text-zinc-500">
                                                    {data?.jobs?.vacancies} open
                                                    positions
                                                </p>
                                            </div>
                                            <div className="border-t p-4">
                                                <Link
                                                    href="/jobs"
                                                    className="flex w-full items-center justify-center rounded-md bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-600 hover:bg-cyan-100"
                                                >
                                                    Manage Job Positions
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {['admin', 'department_management'].some(
                                        (p) => permissions.includes(p),
                                    ) && (
                                        <div className="flex flex-col rounded-lg border bg-white shadow-sm">
                                            <div className="flex items-center justify-between border-b p-4">
                                                <h3 className="font-medium text-zinc-900">
                                                    Departments
                                                </h3>
                                                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">
                                                    {data?.departments?.total}{' '}
                                                    Total
                                                </span>
                                            </div>
                                            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                                    <MdBusiness className="h-8 w-8 text-orange-600" />
                                                </div>
                                                <p className="font-medium text-zinc-900">
                                                    {data?.departments?.total}{' '}
                                                    Departments
                                                </p>
                                                <p className="mt-1 text-sm text-zinc-500">
                                                    {
                                                        data?.departments
                                                            ?.vacancies
                                                    }{' '}
                                                    empty departments
                                                </p>
                                            </div>
                                            <div className="border-t p-4">
                                                <Link
                                                    href="/departments"
                                                    className="flex w-full items-center justify-center rounded-md bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-100"
                                                >
                                                    Manage Departments
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
