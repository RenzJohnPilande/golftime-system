import TableComponent from '@/components/datatable/TableComponent';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import Pagination from '@/components/Pagination';
import PrimaryButton from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import jobColumns from './columns/JobColumn';
import JobDialog from './dialogs/JobDialog';

const Job = ({ jobs }) => {
    const [jobDialogOpen, setJobDialogOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
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
    } = useForm({
        job_title: '',
        job_description: '',
    });

    const onClose = () => {
        setConfirmationDialogOpen(false);
        reset();
        setSelected(null);
        setJobDialogOpen(false);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;

        if (formAction === 'create job') {
            post(route('jobs.store'), {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'update job') {
            patch(route('jobs.update', { id: selected }), {
                ...data,
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'delete job') {
            destroy(route('jobs.delete', { id: selected }), {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.error('Error deleting event:', errors);
                },
            });
        }
    };

    const columns = useMemo(() => {
        return jobColumns(
            isMobile,
            setSelected,
            setJobDialogOpen,
            setDialogConfig,
            setConfirmationDialogOpen,
        );
    }, [isMobile]);

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
                route('jobs.index'),
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
            <Head title="jobs" />
            <div className="flex min-h-screen w-full flex-col flex-wrap gap-2 bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-end justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Jobs Management
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage jobs for employees here
                        </h2>
                    </div>
                    <div className="w-full md:w-auto">
                        <PrimaryButton
                            text={'new job'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-gray-700 hover:bg-gray-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New job',
                                    formAction: 'create job',
                                });
                                setJobDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-wrap">
                    <div className="flex w-full flex-wrap items-end justify-between gap-2 md:flex-nowrap">
                        <h1 className="w-full text-lg font-bold capitalize">
                            Job List
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
                    <TableComponent columns={columns} data={jobs.data} />
                    <Pagination
                        currentPage={jobs.current_page}
                        totalPages={jobs.last_page}
                        onPageChange={handlePageChange}
                    />
                </div>

                <JobDialog
                    open={jobDialogOpen}
                    close={onClose}
                    selected={selected}
                    user={user}
                    formData={{
                        data: data,
                        setData: setData,
                        post: post,
                        errors: errors,
                        processing: processing,
                        reset: reset,
                        patch: patch,
                    }}
                    setDialogConfig={setDialogConfig}
                    setSelected={setSelected}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ConfirmationDialog
                    open={isConfirmationDialogOpen}
                    onClose={() => setConfirmationDialogOpen(false)}
                    onConfirm={handleConfirm}
                    config={dialogConfig}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Job;
