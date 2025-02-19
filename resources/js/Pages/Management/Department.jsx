import TableComponent from '@/components/datatable/TableComponent';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import PrimaryButton from '@/components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import DepartmentColumns from './columns/DepartmentColumn';
import DepartmentDialog from './dialogs/DepartmentDialog';

const Department = ({ departments }) => {
    const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
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

    const { data, setData, post, errors, processing, reset, patch } = useForm({
        id: '',
        name: '',
        description: '',
    });

    const onClose = () => {
        setDepartmentDialogOpen(false);
        setConfirmationDialogOpen(false);
        reset();
        setSelected(null);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;

        if (formAction === 'create_department') {
            post(route('departments.store'), {
                name: data.name,
                description: data.description,
            })
                .then((response) => {
                    console.log('Department created:', response.data);
                    onClose();
                })
                .catch((errors) => {
                    console.log('Error creating department:', errors);
                });
        } else if (formAction === 'update_department') {
            patch(route('departments.update', { id: selected }), {
                name: data.name,
                description: data.description,
            })
                .then((response) => {
                    console.log('Department updated:', response.data);
                    onClose();
                })
                .catch((errors) => {
                    console.log('Error updating department:', errors);
                });
        }
    };

    const columns = useMemo(() => {
        return DepartmentColumns(
            isMobile,
            setSelected,
            setViewOpen,
            setDepartmentDialogOpen,
            setDialogConfig,
            setConfirmationDialogOpen,
        );
    }, [isMobile]);

    return (
        <AuthenticatedLayout>
            <Head title="Department Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-end justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Department Management
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage your departments and stay organized with all
                            the details in one place.
                        </h2>
                    </div>
                    <div className="w-full md:w-auto">
                        <PrimaryButton
                            text={'new department'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Department',
                                    formAction: 'create_department',
                                });
                                setDepartmentDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-wrap py-5">
                    <TableComponent columns={columns} data={departments} />
                </div>

                <DepartmentDialog
                    open={departmentDialogOpen}
                    close={onClose}
                    selected={selected}
                    user={user}
                    formData={{
                        data: data,
                        setData: setData,
                        errors: errors,
                        processing: processing,
                        reset: reset,
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

export default Department;
