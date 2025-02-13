import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <main className="w-full">
                <div className="flex w-full flex-wrap justify-end bg-zinc-700 px-2 py-3 lg:hidden">
                    <SidebarTrigger className="align-right bg-white text-zinc-900 shadow-lg" />
                </div>
                {children}
            </main>
        </SidebarProvider>
    );
}
