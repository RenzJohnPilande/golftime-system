export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-between bg-gray-100">
            <div className="flex w-full flex-grow flex-wrap items-center justify-center px-4">
                <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-5 rounded border bg-white px-10 pb-5 pt-10">
                    {children}
                    <div className="flex w-full justify-end">
                        <img
                            src="/public/images/GolfTimeLogo.png"
                            className="max-w-[50px]"
                            alt="Golftime Logo"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full py-2 text-center">
                <p className="text-sm font-medium">
                    Copyright © Golf Time Corporation. All rights reserved.
                </p>
            </div>
        </div>
    );
}
