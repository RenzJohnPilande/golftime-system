import TableComponent from '@/components/datatable/TableComponent';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import EventDetailsDialog from '@/components/dialogs/EventDetailsDialog';
import EventDialog from '@/components/dialogs/EventDialog';
import PrimaryButton from '@/components/PrimaryButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import {
    MdMoreHoriz,
    MdOutlineDelete,
    MdOutlineEdit,
    MdOutlineRemoveRedEye,
} from 'react-icons/md';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

const Events = ({ events, employees }) => {
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        formAction: '',
    });

    const user = usePage().props.auth.user;

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

    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset,
        patch,
        delete: destroy,
        put,
    } = useForm({
        id: '',
        name: '',
        location: '',
        date: '',
        status: 'pending',
        personnel: [],
        notes: '',
        assigned_to: '',
        notification_sent: false,
    });

    const onClose = () => {
        setOpen(false);
        reset();
        setSelected(null);
    };

    const onViewClose = () => {
        setViewOpen(false);
        reset();
        setSelected(null);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'update') {
            patch(route('events.update', { id: selected }), {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'create') {
            post(route('events.store'), {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'delete') {
            destroy(route('events.delete', { id: selected }), {
                onSuccess: () => {
                    setSelected(null);
                    onClose();
                },
                onError: (errors) => {
                    console.error('Error deleting event:', errors);
                },
            });
        }
    };

    const columns = useMemo(() => {
        if (isMobile) {
            return [
                {
                    accessorKey: 'event',
                    header: 'Event',
                    cell: (row) => {
                        return (
                            <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                                <div className="flex w-full">
                                    <h1 className="text-base font-medium">
                                        {row.name}
                                    </h1>
                                </div>
                            </div>
                        );
                    },
                },
                {
                    id: 'actions',
                    header: () => {
                        return <p className="text-center">Actions</p>;
                    },
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
                                    <DropdownMenuItem>
                                        <PrimaryButton
                                            icon={<MdOutlineEdit />}
                                            text={'Edit'}
                                            style={{
                                                wrapper:
                                                    'flex w-full gap-3 bg-blue-500 text-white',
                                            }}
                                            onClick={() => {
                                                setDialogConfig({
                                                    title: 'Update Event',
                                                    message:
                                                        'Are you sure you want to save? The details can be modified again later',
                                                    formAction: 'update',
                                                });
                                                setSelected(row.id);
                                                setOpen(true);
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
                                                    title: 'Delete Event',
                                                    message:
                                                        'Are you sure you want to delete this event? This action cannot be undone.',
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
        }

        return [
            {
                accessorKey: 'event',
                header: 'Event',
                cell: (row) => {
                    return (
                        <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                            <div className="flex w-full">
                                <h1 className="text-base font-medium">
                                    {row.name}
                                </h1>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'location',
                header: 'Location',
                cell: (row) => {
                    return (
                        <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                            <div className="flex w-full gap-2 text-xs capitalize text-zinc-600">
                                <p className="capitalize">{row.location}</p>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'date',
                header: 'Date',
                cell: (row) => {
                    const formattedDate = new Date(row.date).toLocaleDateString(
                        'en-US',
                        {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        },
                    );
                    return (
                        <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                            <div className="flex w-full gap-2 text-xs capitalize text-zinc-600">
                                <p className="capitalize">{formattedDate}</p>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: (row) => {
                    return (
                        <div className="flex w-full flex-wrap gap-1 px-2 py-3">
                            <div className="flex w-full gap-2 text-xs capitalize text-zinc-600">
                                <p
                                    className={`w-[80px] rounded px-2 py-1 text-center font-semibold capitalize text-white ${
                                        {
                                            pending: 'bg-yellow-400',
                                            preparation: 'bg-blue-400',
                                            ongoing: 'bg-purple-400',
                                            completed: 'bg-green-400',
                                            cancelled: 'bg-red-400',
                                        }[row.status] || ''
                                    }`}
                                >
                                    {row.status}
                                </p>
                            </div>
                        </div>
                    );
                },
            },
            {
                id: 'actions',
                header: () => {
                    return <p className="text-center">Actions</p>;
                },
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
                                        icon={<MdOutlineEdit />}
                                        text={'Edit'}
                                        style={{
                                            wrapper:
                                                'flex w-full gap-3 bg-blue-500 text-white',
                                        }}
                                        onClick={() => {
                                            setDialogConfig({
                                                title: 'Update Event',
                                                message:
                                                    'Are you sure you want to save? The details can be modified again later',
                                                formAction: 'update',
                                            });
                                            setSelected(row.id);
                                            setOpen(true);
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
                                                title: 'Delete Event',
                                                message:
                                                    'Are you sure you want to delete this event? This action cannot be undone.',
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
            <Head title="Events" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-center justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            My Events
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage your events and stay organized with all the
                            details in one place.
                        </h2>
                    </div>
                    <div className="w-full md:w-auto">
                        <PrimaryButton
                            text={'new event'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Event',
                                    message:
                                        'Are you done creating this event? The details can be modified later',
                                    formAction: 'create',
                                });
                                setOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-wrap py-5">
                    <TableComponent
                        columns={columns}
                        data={events}
                        rowsPerPage={10}
                    />
                </div>
                <EventDialog
                    open={open}
                    close={onClose}
                    selected={selected}
                    user={user}
                    employees={employees}
                    formData={{
                        data,
                        setData,
                        post,
                        errors,
                        processing,
                        reset,
                        patch,
                        put,
                    }}
                    setDialogConfig={setDialogConfig}
                    setSelected={setSelected}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <EventDetailsDialog
                    open={viewOpen}
                    close={onViewClose}
                    selected={selected}
                    formData={{
                        data,
                        setData,
                        patch,
                    }}
                    setDialogConfig={setDialogConfig}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ConfirmationDialog
                    open={isConfirmationDialogOpen}
                    onClose={() => {
                        setConfirmationDialogOpen(false);
                        onClose();
                    }}
                    onConfirm={handleConfirm}
                    config={dialogConfig}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Events;
