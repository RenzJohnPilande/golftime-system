const DashboardCard = ({
    icon: Icon,
    mainValue,
    title,
    color,
    subValue,
    sub,
}) => {
    const bgBase = {
        purple: 'bg-purple-800',
        blue: 'bg-blue-800',
        green: 'bg-green-800',
        red: 'bg-red-800',
        yellow: 'bg-yellow-800',
    };

    const bgColor = bgBase[color] || 'bg-gray-800';

    return (
        <div
            className={`flex w-full flex-wrap items-center justify-between gap-4 rounded-lg border bg-white p-5 text-zinc-900 shadow-lg transition-all hover:shadow-md md:grid-cols-2`}
        >
            <div>
                <div className="flex w-full">
                    <div className="flex flex-grow flex-col">
                        <p className="text-xs font-medium md:text-sm">
                            {title}
                        </p>
                        <p className="text-2xl font-bold">{mainValue}</p>
                    </div>
                </div>
                <div className="flex w-full flex-col flex-wrap">
                    <p className="text-xs capitalize text-gray-600">
                        {sub} {subValue}
                    </p>
                </div>
            </div>
            <div
                className={`flex h-10 w-10 content-start items-center justify-center rounded-full p-2 ${bgColor} text-white`}
            >
                <Icon className="h-6 w-6" />
            </div>
        </div>
    );
};

export default DashboardCard;
