import { useEffect, useState } from 'react';
const AlertBar = ({ alerts }) => {
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
    useEffect(() => {
        if (alerts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentAlertIndex((prevIndex) =>
                prevIndex === alerts.length - 1 ? 0 : prevIndex + 1,
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [alerts.length]);

    if (alerts.length === 0) return null;

    const currentAlert = alerts[currentAlertIndex];

    return (
        <div className="hidden bg-green-950 px-4 py-2 text-white md:flex">
            <div className="relative mx-auto flex w-full items-center justify-center">
                <div className="px-8 text-center text-sm font-medium">
                    <span className="line-clamp-1">{currentAlert.message}</span>
                </div>
            </div>
        </div>
    );
};

export default AlertBar;
