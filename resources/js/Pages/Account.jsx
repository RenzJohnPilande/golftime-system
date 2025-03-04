import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const Account = ({ user }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.warning) {
            toast.warning('Personal Information Missing', {
                description: flash.warning,
                duration: 5000,
            });
        }
    }, [flash]);

    return (
        <AuthenticatedLayout>
            <Head title="My Account" />
            <div className="flex min-h-screen w-full flex-col flex-wrap gap-4 bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-center justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            My Account
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage your personal details, update your
                            credentials, and configure your account preferences.
                        </h2>
                    </div>
                </div>
                <div className="flex w-full flex-wrap gap-4">
                    <div className="flex w-full flex-wrap gap-1">
                        <p className="w-full text-sm font-bold">
                            Personal Information
                        </p>
                        <div className="grid w-full max-w-[500px] grid-cols-2 gap-4 rounded border border-zinc-200 bg-white p-5">
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">
                                    First Name
                                </p>
                                <p className="text-sm">
                                    {user.firstname ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">
                                    Middle Name
                                </p>
                                <p className="text-sm">
                                    {user.middlename ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">
                                    Last Name
                                </p>
                                <p className="text-sm">
                                    {user.lastname ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">Email</p>
                                <p className="text-sm">{user.email ?? 'N/A'}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">Sex</p>
                                <p className="text-sm">{user.sex ?? 'N/A'}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">
                                    Birthdate
                                </p>
                                <p className="text-sm">
                                    {user.birthdate ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">
                                    Contact Number
                                </p>
                                <p className="text-sm">
                                    {user.contact_number ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">Address</p>
                                <p className="text-sm">
                                    {user.address ?? 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-wrap gap-1">
                        <p className="w-full text-sm font-bold">Job Details</p>
                        <div className="grid w-full max-w-[500px] grid-cols-2 gap-4 rounded border border-zinc-200 bg-white p-5">
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">
                                    Position
                                </p>
                                <p className="text-sm">
                                    {user.position ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">
                                    Department
                                </p>
                                <p className="text-sm">
                                    {user.department ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">Salary</p>
                                <p className="text-sm">
                                    ₱
                                    {new Intl.NumberFormat('en-PH').format(
                                        user.salary ?? 0,
                                    )}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">
                                    Hire Date
                                </p>
                                <p className="text-sm">
                                    {user.hire_date ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">Status</p>
                                <p className="text-sm">
                                    {user.status ?? 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-zinc-500">Role</p>
                                <p className="text-sm">{user.role ?? 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Account;
