import TableComponent from '@/components/datatable/TableComponent';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import TaskDetailsDialog from '@/components/dialogs/TaskDetailsDialog';
import TaskDialog from '@/components/dialogs/TaskDialog';
import Pagination from '@/components/Pagination';
import PrimaryButton from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
    MdMoreHoriz,
    MdOutlineDelete,
    MdOutlineRemoveRedEye,
} from 'react-icons/md';

const Tasks = ({ tasks, employees, events }) => {
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
        patch,
        put,
        delete: destroy,
        errors,
        processing,
        reset,
    } = useForm({
        id: '',
        task_name: '',
        task_description: '',
        deadline: '',
        type: 'individual',
        status: 'pending',
        event_id: '',
        assigned_to: '',
    });

    const columns = useMemo(() => {
        if (isMobile) {
            return [
                {
                    accessorKey: 'task_name',
                    header: 'Task Name',
                    cell: (row) => (
                        <div className="flex w-full flex-wrap gap-1 p-2">
                            <div className="flex w-full">
                                <h1 className="text-sm font-medium capitalize">
                                    {row.task_name}
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
                accessorKey: 'task_name',
                header: 'Task Name',
                cell: (row) => (
                    <div className="flex w-full flex-wrap gap-1 p-2">
                        <div className="flex w-full">
                            <h1 className="text-sm font-medium capitalize">
                                {row.task_name}
                            </h1>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'task_description',
                header: 'Task Overview',
                cell: (row) => (
                    <div className="flex w-full flex-wrap gap-1 p-2">
                        <div className="flex w-full">
                            <h1 className="text-pretty text-sm capitalize">
                                {row.task_description}
                            </h1>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'deadline',
                header: 'Deadline',
                cell: (row) => {
                    const formattedDate = row.deadline
                        ? new Date(row.deadline).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                          })
                        : 'N/A';
                    return (
                        <div className="flex w-full flex-wrap gap-1 p-2">
                            <div className="flex w-full">
                                <h1 className="text-sm font-medium capitalize">
                                    {formattedDate}
                                </h1>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'type',
                header: 'Type',
                cell: (row) => (
                    <div className="flex w-full flex-wrap gap-1 p-2">
                        <div className="flex w-full">
                            <h1 className="text-sm font-medium capitalize">
                                {row.type}
                            </h1>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'event',
                header: 'Event',
                cell: (row) => {
                    const event = events.find(
                        (event) => event.id === row.event_id,
                    );
                    return (
                        <div className="flex w-full flex-wrap gap-1 p-2">
                            <div className="flex w-full">
                                <h1 className="text-sm font-medium capitalize">
                                    {event ? event.name : 'N/A'}
                                </h1>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: (row) => (
                    <div className="flex w-full flex-wrap gap-1 p-2">
                        <div className="flex w-full">
                            <p
                                className={`w-fit rounded px-2 py-1 text-center text-xs capitalize text-white ${
                                    row.status === 'pending'
                                        ? 'bg-yellow-500'
                                        : row.status === 'ongoing'
                                          ? 'bg-blue-500'
                                          : row.status === 'complete'
                                            ? 'bg-green-500'
                                            : 'bg-gray-500'
                                }`}
                            >
                                {row.status}
                            </p>
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
                                        icon={<MdOutlineRemoveRedEye />}
                                        text={'Edit'}
                                        style={{
                                            wrapper:
                                                'flex w-full gap-3 bg-blue-500 text-white',
                                        }}
                                        onClick={() => {
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
                                                title: 'Delete Task',
                                                message:
                                                    'Are you sure you want to delete this task? This action cannot be undone.',
                                                formAction: 'delete task',
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

    const onClose = () => {
        setOpen(false);
        setViewOpen(false);
        reset();
        setSelected(null);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'create task') {
            post(route('tasks.store'), {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'update task') {
            patch(route('tasks.update', { id: selected }), {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'delete task') {
            destroy(route('tasks.delete', { id: selected }), {
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

    //Pagination
    const { url } = usePage();
    const handlePageChange = (page) => {
        router.get(url.split('?')[0], { page }, { preserveScroll: true });
    };

    // Search
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get(
                route('tasks.index'),
                { search: searchTerm },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tasks" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-center justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            My Tasks
                        </h1>
                        <h2 className="text-xs md:text-sm">
                            Keep track of all tasks, deadlines, and statuses
                            efficiently.
                        </h2>
                    </div>
                    <div className="flex w-full flex-wrap gap-2 md:w-auto md:flex-nowrap">
                        <PrimaryButton
                            text={'New Task'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-gray-700 hover:bg-gray-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Task',
                                    message:
                                        'Are you sure you want to create this task? You can modify details later.',
                                    formAction: 'create task',
                                });
                                setOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-wrap">
                    <div className="flex w-full flex-wrap items-end justify-between gap-2 md:flex-nowrap">
                        <h1 className="w-full text-lg font-bold capitalize">
                            Task List
                        </h1>
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex w-full items-center justify-end gap-2 pb-2"
                        >
                            <Input
                                type="search"
                                placeholder="Search"
                                className="w-full md:max-w-[200px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                            <Button
                                variant="outline"
                                type="submit"
                                className="bg-gray-700 text-white hover:bg-gray-600 hover:text-white"
                            >
                                <Search />
                            </Button>
                        </form>
                    </div>
                    <TableComponent columns={columns} data={tasks.data} />
                    <Pagination
                        currentPage={tasks.current_page}
                        totalPages={tasks.last_page}
                        onPageChange={handlePageChange}
                    />
                </div>
                <TaskDialog
                    open={open}
                    close={onClose}
                    selected={selected}
                    user={user}
                    employees={employees}
                    events={events}
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
                <TaskDetailsDialog
                    open={viewOpen}
                    close={onClose}
                    selected={selected}
                    user={user}
                    employees={employees}
                    events={events}
                    setSelected={setSelected}
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

export default Tasks;
