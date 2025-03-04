import TableComponent from '@/components/datatable/TableComponent';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import PrimaryButton from '@/components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import EmployeeColumns from './columns/EmployeeColumns';
import EmployeeDialog from './dialogs/EmployeeDialog';
import ViewEmployeeDialog from './dialogs/ViewEmployeeDialog';

const Employee = ({ employees, departments, roles }) => {
    const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);
    const [activeTab, setActiveTab] = useState('users');

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
        id: '',
        user_id: '',
        first_name: '',
        last_name: '',
        middlename: '',
        email: '',
        password: '',
        role: '',
        position: '',
        department: '',
        salary: '',
        role: '',
        hire_date: '',
        status: 'active',
        user_id: user.id,
    });

    const onClose = () => {
        setEmployeeDialogOpen(false);
        setConfirmationDialogOpen(false);
        setViewOpen(false);
        reset();
        setSelected(null);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;

        if (formAction === 'update employee' && selected) {
            patch(route('register.update', { id: selected }), {
                ...data,
                onSuccess: (response) => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'create employee') {
            post(route('register.store'), {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'delete employee') {
            destroy(route('employees.delete', { id: selected }), {
                onSuccess: () => {
                    setSelected(null);
                    onClose();
                },
                onError: (errors) => {
                    console.error('Error deleting employee:', errors);
                },
            });
        }
    };
    const columns = useMemo(() => {
        return EmployeeColumns(
            isMobile,
            setSelected,
            setViewOpen,
            setEmployeeDialogOpen,
            setDialogConfig,
            setConfirmationDialogOpen,
        );
    }, [isMobile]);

    return (
        <AuthenticatedLayout>
            <Head title="Employees" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-end justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Employee Management
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage your users and stay organized with all the
                            details in one place.
                        </h2>
                    </div>
                    <div className="w-full md:w-auto">
                        <PrimaryButton
                            text={'new employee'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Event',
                                    formAction: 'create employee',
                                });
                                setEmployeeDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-wrap py-5">
                    <TableComponent
                        columns={columns}
                        data={employees}
                        rowsPerPage={10}
                    />
                </div>
                <EmployeeDialog
                    open={employeeDialogOpen}
                    close={onClose}
                    selected={selected}
                    user={user}
                    formData={{
                        data,
                        setData,
                        post,
                        errors,
                        processing,
                        reset,
                        patch,
                    }}
                    departments={departments}
                    roles={roles}
                    setDialogConfig={setDialogConfig}
                    setSelected={setSelected}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ViewEmployeeDialog
                    open={viewOpen}
                    close={onClose}
                    selected={selected}
                    user={user}
                    setSelected={setSelected}
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

export default Employee;
