import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-zinc-50 py-5">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 text-center text-gray-900">
                        <p className="text-lg text-gray-600">
                            this is the dashboard
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
