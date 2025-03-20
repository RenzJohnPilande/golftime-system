import TableComponent from '@/components/datatable/TableComponent';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import PrimaryButton from '@/components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
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

    return (
        <AuthenticatedLayout>
            <Head title="jobs" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
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
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
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
                <div className="flex w-full flex-wrap py-5">
                    <TableComponent
                        columns={columns}
                        data={jobs}
                        rowsPerPage={10}
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
