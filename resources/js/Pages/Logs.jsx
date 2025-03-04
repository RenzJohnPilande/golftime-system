import TableComponent from '@/components/datatable/TableComponent';
import PrimaryButton from '@/components/PrimaryButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import {
    MdMoreHoriz,
    MdOutlineDelete,
    MdOutlineRemoveRedEye,
} from 'react-icons/md';

const Logs = ({ logs }) => {
    const useIsMobile = () => {
        const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

        useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 640);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return isMobile;
    };
    const isMobile = useIsMobile();

    const columns = useMemo(() => {
        if (isMobile) {
            return [
                {
                    accessorKey: 'action',
                    header: 'Action',
                    cell: (row) => (
                        <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                            <div className="flex w-full">
                                <h1 className="text-base font-medium capitalize">
                                    {row.action}
                                </h1>
                            </div>
                        </div>
                    ),
                },
                {
                    id: 'actions',
                    header: () => <p className="text-center">Actions</p>,
                    cell: (row) => (
                        <div className="flex justify-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MdMoreHoriz />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <PrimaryButton
                                            icon={<MdOutlineRemoveRedEye />}
                                            text={'View'}
                                            style={{
                                                wrapper:
                                                    'flex w-full gap-3 bg-green-500 text-white',
                                            }}
                                            onClick={() => {
                                                setSelected(row.id);
                                                setViewOpen(true);
                                            }}
                                        />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ),
                },
            ];
        }

        return [
            {
                accessorKey: 'action',
                header: 'Action',
                cell: (row) => (
                    <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                        <div className="flex w-full">
                            <h1 className="text-base font-medium capitalize">
                                {row.action}
                            </h1>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'details',
                header: 'Details',
                cell: (row) => (
                    <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                        <div className="flex w-full gap-2 text-xs text-zinc-600">
                            <p>{row.details || 'N/A'}</p>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'created_at',
                header: 'Date',
                cell: (row) => {
                    const formattedDate = new Date(
                        row.created_at,
                    ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    });
                    return (
                        <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                            <div className="flex w-full gap-2 text-xs text-zinc-600">
                                <p>{formattedDate}</p>
                            </div>
                        </div>
                    );
                },
            },
            {
                id: 'actions',
                header: () => <p className="text-center">Actions</p>,
                cell: (row) => (
                    <div className="flex justify-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MdMoreHoriz />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PrimaryButton
                                        icon={<MdOutlineRemoveRedEye />}
                                        text={'View'}
                                        style={{
                                            wrapper:
                                                'flex w-full gap-3 bg-green-500 text-white',
                                        }}
                                        onClick={() => {
                                            setSelected(row.id);
                                            setViewOpen(true);
                                        }}
                                    />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <PrimaryButton
                                        icon={<MdOutlineDelete />}
                                        text={'Delete'}
                                        style={{
                                            wrapper:
                                                'flex w-full gap-3 bg-red-500 text-white',
                                        }}
                                        onClick={() => {
                                            setDialogConfig({
                                                title: 'Delete Log',
                                                message:
                                                    'Are you sure you want to delete this log? This action cannot be undone.',
                                                formAction: 'delete',
                                            });
                                            setSelected(row.id);
                                            setConfirmationDialogOpen(true);
                                        }}
                                    />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ),
            },
        ];
    }, [isMobile]);
    return (
        <AuthenticatedLayout>
            <Head title="Logs" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-center justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Activity Log
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Keep track of all activities and changes with a
                            detailed log, ensuring transparency and
                            accountability.
                        </h2>
                    </div>
                </div>
                <div className="flex w-full flex-wrap py-5">
                    <TableComponent
                        columns={columns}
                        data={logs}
                        rowsPerPage={10}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Logs;
