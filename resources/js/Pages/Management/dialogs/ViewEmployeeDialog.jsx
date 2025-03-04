import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

const ViewEmployeeDialog = ({ open, close, selected }) => {
    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setIsLoading(true);
            axios
                .get(route('employees.show', { id: selected }))
                .then((response) => {
                    setEmployee((prevData) => ({
                        ...prevData,
                        user_id: response.data.user_id,
                        firstname: response.data.firstname,
                        middlename: response.data.middlename,
                        lastname: response.data.lastname,
                        email: response.data.user.email,
                        department: response.data.department,
                        salary: response.data.salary,
                        hire_date: response.data.hire_date.split(' ')[0],
                        position: response.data.position,
                        status: response.data.status,
                    }));
                    return axios.get(
                        route('users.show', { id: response.data.user_id }),
                    );
                })
                .then((response) => {
                    setEmployee((prevData) => ({
                        ...prevData,
                        role: response.data.role,
                    }));
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selected, open]);

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={close}>
                <DialogContent className="max-w-sm rounded-lg md:max-w-md">
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-4 w-[250px] rounded-xl" />
                        <Skeleton className="h-4 w-[150px]" />
                        <div className="flex flex-wrap gap-2 py-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-[100px] w-full" />
                        </div>
                        <div className="flex flex-wrap gap-2 py-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-[50px] w-full" />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-sm rounded-lg md:max-w-md">
                <div className="flex w-full flex-wrap">
                    <h1 className="w-full text-lg font-semibold">
                        {employee.lastname +
                            ', ' +
                            employee.firstname +
                            ' ' +
                            employee.middlename}
                    </h1>
                    <p className="text-sm text-zinc-700">{employee.email}</p>
                </div>
                <div className="flex w-full flex-wrap py-2 text-sm capitalize">
                    <h1 className="font-semibold">Job Details</h1>
                    <div className="grid w-full grid-cols-2 gap-2 py-2">
                        <div className="flex flex-wrap gap-2">
                            <p className="w-full text-xs text-zinc-700">
                                Position
                            </p>
                            <p className="w-full">{employee.position}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <p className="w-full text-xs text-zinc-700">
                                Department
                            </p>
                            <p className="w-full">{employee.department}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <p className="w-full text-xs text-zinc-700">
                                Hire Date
                            </p>
                            <p className="w-full">{employee.hire_date}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <p className="w-full text-xs text-zinc-700">
                                Salary
                            </p>
                            <p className="w-full">
                                ₱
                                {new Intl.NumberFormat('en-PH').format(
                                    employee.salary,
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-wrap py-2 text-sm capitalize">
                    <h1 className="font-semibold">Permissions</h1>
                    <div className="grid w-full grid-cols-2 gap-2 py-2">
                        <div className="flex flex-wrap gap-2">
                            <p className="w-full text-xs text-zinc-700">Role</p>
                            <p className="w-full">{employee.role}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <p className="w-full text-xs text-zinc-700">
                                Status
                            </p>
                            <p className="w-full">{employee.status}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewEmployeeDialog;
