import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import PrimaryButton from '../PrimaryButton';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';

const TaskDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
    employees,
    events,
}) => {
    const { data, setData, errors, reset } = formData;
    const { auth } = usePage().props;
    const authUser = auth.user;
    console.log(authUser);

    useEffect(() => {
        if (selected && open) {
            axios
                .get(route('tasks.show_task', { id: selected }))
                .then((response) => {
                    const formattedDeadline = response.data[0].deadline
                        ? response.data[0].deadline.split('T')[0]
                        : '';
                    setData({
                        task_name: response.data[0].task_name ?? '',
                        task_description:
                            response.data[0].task_description ?? '',
                        deadline: formattedDeadline ?? '',
                        type: response.data[0].type ?? '',
                        status: response.data[0].status ?? 'pending',
                        event_id: response.data[0].event_id ?? '',
                        assigned_to: response.data[0].assigned_to ?? '',
                    });
                })
                .catch((error) => {
                    console.error('Error fetching task:', error);
                });
        } else {
            setData((prevData) => ({
                ...prevData,
                assigned_to: authUser.id,
            }));
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: selected ? 'Update Task' : 'Create New Task',
            message: selected
                ? 'Are you done modifying this task? You can edit it later.'
                : 'Are you done creating this task? You can modify the details later.',
            formAction: selected ? 'update task' : 'create task',
        });
        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-sm rounded-lg md:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {selected ? 'Update Task' : 'Create New Task'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="flex w-full flex-wrap gap-2">
                        {/* Task Name */}
                        <div className="w-full">
                            <InputLabel htmlFor="task_name" value="Task Name" />
                            <TextInput
                                id="task_name"
                                name="task_name"
                                className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                value={data.task_name}
                                onChange={(e) =>
                                    setData('task_name', e.target.value)
                                }
                                required
                            />
                            {errors.task_name && (
                                <InputError className="mt-2">
                                    {errors.task_name}
                                </InputError>
                            )}
                        </div>
                        <div className="w-full">
                            <InputLabel
                                htmlFor="task_description"
                                value="Description"
                            />
                            <TextInput
                                id="task_description"
                                name="task_description"
                                type="textarea"
                                className="mt-1 block max-h-[120px] w-full border px-2 py-2 text-sm shadow"
                                value={data.task_description}
                                onChange={(e) =>
                                    setData('task_description', e.target.value)
                                }
                                required
                            />
                            {errors.task_description && (
                                <InputError className="mt-2">
                                    {errors.task_description}
                                </InputError>
                            )}
                        </div>

                        {/* Deadline */}
                        <div className="w-full">
                            <InputLabel htmlFor="deadline" value="Deadline" />
                            <TextInput
                                id="deadline"
                                name="deadline"
                                type="date"
                                className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                value={data.deadline}
                                onChange={(e) =>
                                    setData('deadline', e.target.value)
                                }
                            />
                            {errors.deadline && (
                                <InputError className="mt-2">
                                    {errors.deadline}
                                </InputError>
                            )}
                        </div>

                        {/* Task Type */}
                        <div className="w-full">
                            <InputLabel htmlFor="type" value="Type" />
                            <SelectInput
                                id="type"
                                name="type"
                                options={[
                                    { value: 'event', label: 'Event' },
                                    {
                                        value: 'individual',
                                        label: 'Individual',
                                    },
                                ]}
                                className="mt-1 block w-full border px-2 py-2 text-sm text-zinc-900 shadow"
                                value={data.type}
                                onChange={(e) =>
                                    setData('type', e.target.value)
                                }
                                required
                            />
                            {errors.type && (
                                <InputError className="mt-2">
                                    {errors.type}
                                </InputError>
                            )}
                        </div>

                        {data?.type === 'event' && (
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="event_id"
                                    value="Associated Event"
                                />
                                <SelectInput
                                    id="event_id"
                                    name="event_id"
                                    options={events.map((event) => ({
                                        value: event.id,
                                        label: event.name,
                                    }))}
                                    className="mt-1 block w-full border px-2 py-2 text-sm text-zinc-900 shadow"
                                    value={data.event_id}
                                    onChange={(e) =>
                                        setData('event_id', e.target.value)
                                    }
                                    required
                                />
                                {errors.event_id && (
                                    <InputError className="mt-2">
                                        {errors.event_id}
                                    </InputError>
                                )}
                            </div>
                        )}

                        {/* Status */}
                        <div className="grid w-full grid-cols-2 gap-4">
                            <div className="w-full">
                                <InputLabel htmlFor="status" value="Status" />
                                <SelectInput
                                    id="status"
                                    name="status"
                                    options={[
                                        { value: 'pending', label: 'Pending' },
                                        {
                                            value: 'ongoing',
                                            label: 'Ongoing',
                                        },
                                        {
                                            value: 'complete',
                                            label: 'Complete',
                                        },
                                    ]}
                                    className="mt-1 block w-full border px-2 py-2 text-sm text-zinc-900 shadow"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    required
                                />
                                {errors.status && (
                                    <InputError className="mt-2">
                                        {errors.status}
                                    </InputError>
                                )}
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="assigned_to"
                                    value="Assign To"
                                />
                                <SelectInput
                                    id="assigned_to"
                                    name="assigned_to"
                                    options={employees.map((employee) => ({
                                        value: employee.user_id,
                                        label: `${employee.firstname} ${employee.lastname}`,
                                    }))}
                                    className="mt-1 block w-full border px-2 py-2 text-sm text-zinc-900 shadow"
                                    value={data.assigned_to || authUser.id}
                                    onChange={(e) =>
                                        setData('assigned_to', e.target.value)
                                    }
                                    disabled={authUser?.role === 'employee'}
                                    required
                                />

                                {errors.assigned_to && (
                                    <InputError className="mt-2">
                                        {errors.assigned_to}
                                    </InputError>
                                )}
                            </div>
                        </div>

                        <div className="flex w-full flex-wrap justify-end gap-2">
                            <PrimaryButton
                                type="button"
                                text="Cancel"
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
                                type="button"
                                text="try"
                                style={{
                                    wrapper:
                                        'border bg-zinc-800 hover:bg-zinc-600 text-white',
                                    text: 'capitalize text-sm',
                                }}
                                onClick={() => {
                                    console.log(data);
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

export default TaskDialog;
