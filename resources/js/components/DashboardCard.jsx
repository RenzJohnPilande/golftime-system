const DashboardCard = ({ icon: Icon, current, title, color, total, sub }) => {
    const borderBase = {
        purple: 'border-purple-800',
        blue: 'border-blue-800',
        green: 'border-green-800',
        red: 'border-red-800',
        yellow: 'border-yellow-800',
    };

    const textBase = {
        purple: 'text-purple-800',
        blue: 'text-blue-800',
        green: 'text-green-800',
        red: 'text-red-800',
        yellow: 'text-yellow-800',
    };

    const textColor = textBase[color] || 'text-gray-800';
    const borderColor = borderBase[color] || 'border-gray-800';

    return (
        <div
            className={`flex w-full max-w-[260px] flex-wrap items-center gap-4 rounded-lg border border-b-4 bg-white ${borderColor} p-5 text-zinc-900 shadow-lg transition-all hover:shadow-md`}
        >
            <div className="flex w-full">
                <div className="flex flex-grow flex-col">
                    <p className="text-xs font-medium md:text-sm">{title}</p>
                    <p className="text-2xl font-bold">{current}</p>
                </div>
                <div
                    className={`hidden h-12 w-12 items-center justify-center rounded-full border-2 p-2 md:flex ${borderColor} ${textColor}`}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="flex w-full flex-col flex-wrap">
                <p className="text-xs text-gray-600">
                    {sub}: {total}
                </p>
            </div>
        </div>
    );
};

export default DashboardCard;
