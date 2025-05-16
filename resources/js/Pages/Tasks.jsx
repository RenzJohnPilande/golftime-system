import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import TaskDetailsDialog from '@/components/dialogs/TaskDetailsDialog';
import TaskDialog from '@/components/dialogs/TaskDialog';
import Pagination from '@/components/Pagination';
import PrimaryButton from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard';

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
        } else {
            router.get(route('tasks.index'), {
                preserveScroll: true,
                preserveState: true,
            });
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
                <div className="flex w-full flex-wrap items-end justify-end gap-2 md:flex-nowrap">
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
                {tasks.data.length > 0 ? (
                    <div className="grid w-full grow grid-cols-1 flex-wrap content-start gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {tasks.data.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onView={() => {
                                    setSelected(task.id);
                                    setViewOpen(true);
                                }}
                                onEdit={() => {
                                    setSelected(task.id);
                                    setOpen(true);
                                }}
                                onDelete={() => {
                                    setDialogConfig({
                                        title: 'Delete Task',
                                        message:
                                            'Are you sure you want to delete this task? This action cannot be undone.',
                                        formAction: 'delete task',
                                    });
                                    setSelected(task.id);
                                    setConfirmationDialogOpen(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full grow flex-wrap content-center items-center justify-center">
                        No task data found.
                    </div>
                )}
                <Pagination
                    currentPage={tasks.current_page}
                    totalPages={tasks.last_page}
                    onPageChange={handlePageChange}
                />
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
