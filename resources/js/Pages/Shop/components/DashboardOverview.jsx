// DashboardOverview.jsx
import {
    BriefcaseBusinessIcon,
    BriefcaseIcon,
    Calendar,
    ListCheck,
    NewspaperIcon,
    ShoppingBagIcon,
    Users,
} from 'lucide-react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

export default function DashboardOverview({
    data = [],
    logs = [],
    departmentData = [],
    permissions,
}) {
    return (
        <div className="flex w-full flex-wrap space-y-6">
            {/* Stat Cards */}
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {['admin', 'event_management'].some((p) =>
                    permissions.includes(p),
                ) && (
                    <StatCard
                        icon={<Calendar className="h-6 w-6" />}
                        iconBg="bg-zinc-100"
                        title="Events"
                        value={data?.events?.current}
                        subtext="Ongoing"
                        footerLabel="Total Events"
                        footerValue={data?.events?.total}
                    />
                )}
                {['admin', 'task_management'].some((p) =>
                    permissions.includes(p),
                ) && (
                    <StatCard
                        icon={<ListCheck className="h-6 w-6" />}
                        iconBg="bg-zinc-100"
                        title="Tasks"
                        value={data?.tasks?.current}
                        subtext="Ongoing"
                        footerLabel="Total Tasks"
                        footerValue={data?.tasks?.total}
                    />
                )}

                {/* Products */}
                {['admin', 'content_management'].some((p) =>
                    permissions.includes(p),
                ) && (
                    <StatCard
                        icon={<ShoppingBagIcon className="h-6 w-6" />}
                        iconBg="bg-zinc-100"
                        title="Products"
                        value={data?.cms?.products?.length || 0}
                        subtext="Total"
                    />
                )}

                {/* Articles */}
                {['admin', 'content_management'].some((p) =>
                    permissions.includes(p),
                ) && (
                    <StatCard
                        icon={<NewspaperIcon className="h-6 w-6" />}
                        iconBg="bg-zinc-100"
                        title="Articles"
                        value={data?.cms?.articles?.length || 0}
                        subtext="Total"
                    />
                )}

                {/* Employees */}
                {['admin', 'employee_management'].some((p) =>
                    permissions.includes(p),
                ) && (
                    <StatCard
                        icon={<Users className="h-6 w-6" />}
                        iconBg="bg-zinc-100"
                        title="Employees"
                        value={data?.employees?.active}
                        subtext="Active"
                        footerLabel="Total Employees"
                        footerValue={
                            (data?.employees?.active || 0) +
                            (data?.employees?.inactive || 0)
                        }
                    />
                )}

                {/* Job Positions */}
                {['admin', 'role_management'].some((p) =>
                    permissions.includes(p),
                ) && (
                    <StatCard
                        icon={<BriefcaseIcon className="h-6 w-6" />}
                        iconBg="bg-zinc-100"
                        title="Job Positions"
                        value={data?.jobs?.total}
                        subtext="Total"
                        footerLabel="Open Positions"
                        footerValue={data?.jobs?.vacancies}
                    />
                )}

                {/* Departments */}
                {['admin', 'department_management'].some((p) =>
                    permissions.includes(p),
                ) && (
                    <StatCard
                        icon={<BriefcaseBusinessIcon className="h-6 w-6" />}
                        iconBg="bg-zinc-100"
                        title="Departments"
                        value={data?.departments?.total}
                        subtext="Total"
                        footerLabel="Empty Departments"
                        footerValue={data?.departments?.vacancies}
                    />
                )}
            </div>
        </div>
    );
}

function StatCard({
    icon,
    iconBg,
    title,
    value,
    subtext,
    footerLabel,
    footerValue,
}) {
    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBg}`}
                >
                    {icon}
                </div>
                <div className="ml-4">
                    <h3 className="text-sm font-medium text-zinc-500">
                        {title}
                    </h3>
                    <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-zinc-900">
                            {value}
                        </p>
                        <p className="ml-2 text-sm text-zinc-500">{subtext}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">{footerLabel}</span>
                    <span className="font-medium text-zinc-900">
                        {footerValue}
                    </span>
                </div>
            </div>
        </div>
    );
}
