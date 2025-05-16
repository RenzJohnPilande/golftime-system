import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import EventDetailsDialog from '@/components/dialogs/EventDetailsDialog';
import EventDialog from '@/components/dialogs/EventDialog';
import Pagination from '@/components/Pagination';
import PrimaryButton from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import EventCard from './components/EventCard';

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
                route('events.index'),
                { search: searchTerm },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        } else {
            router.get(route('events.index'), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

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
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-gray-700 hover:bg-gray-600 text-white shadow-lg',
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
                <div className="flex w-full flex-wrap items-end justify-between gap-2 md:flex-nowrap">
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
                {events.data.length > 0 ? (
                    <div className="grid w-full grow grid-cols-1 flex-wrap content-start gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {events.data.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onView={() => {
                                    setSelected(event.id);
                                    setViewOpen(true);
                                }}
                                onEdit={() => {
                                    setSelected(event.id);
                                    setOpen(true);
                                }}
                                onDelete={() => {
                                    setDialogConfig({
                                        title: 'Delete Event',
                                        message:
                                            'Are you sure you want to delete this event? This action cannot be undone.',
                                        formAction: 'delete event',
                                    });
                                    setSelected(event.id);
                                    setConfirmationDialogOpen(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full grow flex-wrap content-center items-center justify-center">
                        No event data found.
                    </div>
                )}
                <Pagination
                    currentPage={events.current_page}
                    totalPages={events.last_page}
                    onPageChange={handlePageChange}
                />
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
