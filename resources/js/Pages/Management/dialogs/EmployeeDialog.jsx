import CheckBoxGroup from '@/components/CheckBoxGroup';
import CheckBoxInput from '@/components/CheckBoxInput';
import SelectInput from '@/components/SelectInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect } from 'react';
import InputError from '../../../components/InputError';
import InputLabel from '../../../components/InputLabel';
import PrimaryButton from '../../../components/PrimaryButton';
import TextInput from '../../../components/TextInput';

const EmployeeDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
    departments,
    jobs,
    permissions,
}) => {
    const { data, setData, errors, reset } = formData;

    useEffect(() => {
        if (selected && open) {
            axios
                .get(route('employees.show', { id: selected }))
                .then((response) => {
                    setData((prevData) => ({
                        ...prevData,
                        user_id: response.data.employee.user_id,
                        firstname: response.data.employee.firstname,
                        middlename: response.data.employee.middlename,
                        lastname: response.data.employee.lastname,
                        email: response.data.employee.user.email,
                        department: response.data.employee.department,
                        salary: response.data.employee.salary,
                        hire_date:
                            response.data.employee.hire_date.split(' ')[0],
                        position: response.data.employee.position,
                        status: response.data.employee.status,
                        permissions:
                            response.data.permissions.map((p) => p.id) || [],
                    }));
                    return axios.get(
                        route('users.show', {
                            id: response.data.employee.user_id,
                        }),
                    );
                })
                .then((response) => {
                    setData((prevData) => ({
                        ...prevData,
                        role: response.data.role,
                    }));
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: selected ? 'Update Employee' : 'Create New Employee',
            message: selected
                ? 'Are you done modifying this employee? The details can be modified again later.'
                : 'Are you done creating this employee? The details can be modified later.',
            formAction: selected ? 'update employee' : 'create employee',
        });
        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-sm rounded-lg md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {selected ? 'Update Employee' : 'Create New Employee'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="flex w-full flex-wrap gap-2">
                        <div className="grid w-full grid-cols-3 gap-2">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="firstname"
                                    value="First Name"
                                />
                                <TextInput
                                    id="firstname"
                                    name="firstname"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data?.firstname || ''}
                                    onChange={(e) =>
                                        setData('firstname', e.target.value)
                                    }
                                    required
                                />
                                {errors.firstname && (
                                    <InputError className="mt-2">
                                        {errors.firstname}
                                    </InputError>
                                )}
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="middlename"
                                    value="Middle Name"
                                />
                                <TextInput
                                    id="middlename"
                                    name="middlename"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data?.middlename || ''}
                                    onChange={(e) =>
                                        setData('middlename', e.target.value)
                                    }
                                />
                                {errors.middlename && (
                                    <InputError className="mt-2">
                                        {errors.middlename}
                                    </InputError>
                                )}
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="lastname"
                                    value="Last Name"
                                />
                                <TextInput
                                    id="lastname"
                                    name="lastname"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data?.lastname || ''}
                                    onChange={(e) =>
                                        setData('lastname', e.target.value)
                                    }
                                    required
                                />
                                {errors.lastname && (
                                    <InputError className="mt-2">
                                        {errors.lastname}
                                    </InputError>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full flex-wrap gap-4">
                            {!selected && (
                                <>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />
                                        <TextInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                            value={data?.email || ''}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            required
                                        />
                                        {errors.email && (
                                            <InputError className="mt-2">
                                                {errors.email}
                                            </InputError>
                                        )}
                                    </div>
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />
                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                            value={data?.password || ''}
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        {errors.password && (
                                            <InputError className="mt-2">
                                                {errors.password}
                                            </InputError>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="department"
                                    value="Department"
                                />
                                <SelectInput
                                    id="department"
                                    name="department"
                                    options={[
                                        ...departments.map((department) => ({
                                            value: department.name,
                                            label: department.name,
                                        })),
                                    ]}
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data?.department || ''}
                                    onChange={(e) =>
                                        setData('department', e.target.value)
                                    }
                                    required
                                />
                                {errors.department && (
                                    <InputError className="mt-2">
                                        {errors.department}
                                    </InputError>
                                )}
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    htmlFor="position"
                                    value="Position"
                                />
                                <SelectInput
                                    id="position"
                                    name="position"
                                    options={[
                                        ...jobs.map((job) => ({
                                            value: job.job_title,
                                            label: job.job_title,
                                        })),
                                    ]}
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data?.position || ''}
                                    onChange={(e) =>
                                        setData('position', e.target.value)
                                    }
                                    required
                                />
                                {errors.position && (
                                    <InputError className="mt-2">
                                        {errors.position}
                                    </InputError>
                                )}
                            </div>
                        </div>
                        <div className="grid w-full grid-cols-2 gap-2">
                            <div className="w-full">
                                <InputLabel htmlFor="salary" value="Salary" />
                                <TextInput
                                    id="salary"
                                    name="salary"
                                    type="number"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data?.salary || ''}
                                    onChange={(e) =>
                                        setData('salary', e.target.value)
                                    }
                                    required
                                />
                                {errors.salary && (
                                    <InputError className="mt-2">
                                        {errors.salary}
                                    </InputError>
                                )}
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    htmlFor="hire_date"
                                    value="Hire Date"
                                />
                                <TextInput
                                    id="hire_date"
                                    name="hire_date"
                                    type="date"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data?.hire_date || ''}
                                    onChange={(e) =>
                                        setData('hire_date', e.target.value)
                                    }
                                    required
                                />
                                {errors.hire_date && (
                                    <InputError className="mt-2">
                                        {errors.hire_date}
                                    </InputError>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full gap-2">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="permission"
                                    value="Permissions"
                                />
                                <CheckBoxGroup
                                    options={permissions.map((permission) => ({
                                        value: permission.id,
                                        label: permission.description,
                                    }))}
                                    selectedValues={data.permissions || []}
                                    onChange={(newPermissions) =>
                                        setData('permissions', newPermissions)
                                    }
                                    className="grid w-full grid-cols-2 gap-2 text-sm"
                                />
                                {errors.permissions && (
                                    <InputError className="mt-2">
                                        {errors.permissions}
                                    </InputError>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full gap-2">
                            <div className="w-full">
                                <InputLabel htmlFor="status" value="Status" />
                                <CheckBoxInput
                                    label="Active"
                                    checked={data?.status === 'active'}
                                    onChange={(checked) =>
                                        setData(
                                            'status',
                                            checked ? 'active' : 'inactive',
                                        )
                                    }
                                />
                                {errors.permissions && (
                                    <InputError className="mt-2">
                                        {errors.permissions}
                                    </InputError>
                                )}
                            </div>
                        </div>

                        <div className="flex w-full flex-wrap justify-end gap-2">
                            <PrimaryButton
                                text="Cancel"
                                type="button"
                                style={{
                                    wrapper:
                                        'border text-zinc-800 hover:bg-zinc-500 hover:text-white',
                                    text: 'capitalize text-sm',
                                }}
                                onClick={() => {
                                    reset();
                                    close();
                                }}
                            />
                            <PrimaryButton
                                type="submit"
                                text={selected ? 'Save' : 'Submit'}
                                style={{
                                    wrapper:
                                        'border bg-zinc-800 hover:bg-zinc-600 text-white',
                                    text: 'capitalize text-sm',
                                }}
                            />
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeDialog;
