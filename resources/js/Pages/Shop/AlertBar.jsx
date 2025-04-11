'use client';

import { useEffect, useState } from 'react';

const AlertBar = () => {
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

    const alerts = [
        {
            text: 'FREE SHIPPING on all orders over $100',
            link: '#',
        },
        {
            text: 'NEW ARRIVALS: Spring Collection 2025 is here!',
            link: '/collections/spring-2025',
        },
        {
            text: 'FLASH SALE: 25% OFF all golf polos - ends tonight!',
            link: '/sale',
        },
    ];

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
        <div className={`bg-green-950 px-4 py-2 text-white`}>
            <div className="relative mx-auto flex w-full items-center justify-center">
                <div className="px-8 text-center text-sm font-medium sm:text-base">
                    {currentAlert.link ? (
                        <a
                            href={currentAlert.link}
                            className="inline-block hover:underline"
                        >
                            {currentAlert.text}
                        </a>
                    ) : (
                        <span>{currentAlert.text}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlertBar;
