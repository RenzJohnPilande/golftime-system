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
import DepartmentColumns from './columns/DepartmentColumn';
import DepartmentDialog from './dialogs/DepartmentDialog';

const Department = ({ departments, employees }) => {
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
        name: '',
        supervisor: '',
    });

    const onClose = () => {
        setDepartmentDialogOpen(false);
        setConfirmationDialogOpen(false);
        reset();
        setSelected(null);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;

        if (formAction === 'create department') {
            post(route('departments.store'), {
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'update department') {
            patch(route('departments.update', { id: selected }), {
                ...data,
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.log('Submission failed with errors:', errors);
                },
            });
        } else if (formAction === 'delete department') {
            destroy(route('departments.delete', { id: selected }), {
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
        return DepartmentColumns(
            isMobile,
            setSelected,
            setViewOpen,
            setDepartmentDialogOpen,
            setDialogConfig,
            setConfirmationDialogOpen,
            employees,
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
                route('departments.index'),
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
            <Head title="Department Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap gap-2 bg-zinc-50 p-5">
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
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-gray-700 hover:bg-gray-600 text-white shadow-lg',
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
                <div className="flex w-full flex-wrap">
                    <div className="flex w-full flex-wrap items-end justify-between gap-2 md:flex-nowrap">
                        <h1 className="w-full text-lg font-bold capitalize">
                            Department List
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
                    <TableComponent columns={columns} data={departments.data} />
                    <Pagination
                        currentPage={departments.current_page}
                        totalPages={departments.last_page}
                        onPageChange={handlePageChange}
                    />
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
                    employees={employees}
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
