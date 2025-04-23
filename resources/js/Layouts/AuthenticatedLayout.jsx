import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import ErrorPage from '@/Pages/Errors/ErrorPage';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, status } = usePage().props;
    const user = auth.user;
    const permissions = auth.permissions || [];

    if (status) {
        return <ErrorPage status={status} />;
    }

    return (
        <SidebarProvider>
            <AppSidebar user={user} permissions={permissions} />
            <main className="w-full">
                <div className="flex w-full flex-wrap justify-between bg-zinc-50 px-4 py-3 lg:hidden">
                    <div className="flex flex-wrap content-center items-center gap-4">
                        <img
                            src="/images/GolfTimeLogo.png"
                            alt="Golftime Logo"
                            className="w-8"
                        />
                        <p className="font-semibold uppercase">golftime corp</p>
                    </div>
                    <SidebarTrigger className="align-right bg-white text-zinc-900 shadow-lg" />
                </div>
                {children}
            </main>
            <Toaster richColors />
        </SidebarProvider>
    );
}
