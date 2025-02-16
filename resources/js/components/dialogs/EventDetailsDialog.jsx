import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    MdClose,
    MdMoreHoriz,
    MdOutlineAdd,
    MdOutlineDelete,
    MdOutlineDone,
} from 'react-icons/md';
import TextInput from '../TextInput';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import ConfirmationDialog from './ConfirmationDialog';

const EventDetailsDialog = ({ open, close, selected, formData }) => {
    const [showForm, setShowForm] = useState({ todo: false, personnel: false });
    const [personnel, setPersonnel] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [emptyToDoList, setEmptyToDoList] = useState(true);
    const [editPersonnel, setEditPersonnel] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);

    const [dialogConfig, setDialogConfig] = useState({
        id: null,
        title: '',
        message: '',
        formAction: '',
    });

    const { data: eventData, setData: setEventData, patch, put } = formData;

    const {
        data: taskData,
        setData: setTaskData,
        post,
        delete: destroy,
    } = useForm({
        task_name: '',
        deadline: '',
        type: 'event',
        event_id: eventData.id || null,
    });

    function formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
    }

    const fetchEventDetails = (eventId, setEventData, setTaskData) => {
        axios
            .get(route('events.show', { id: eventId }))
            .then(({ data: { event } }) => {
                setEventData({
                    ...event,
                    personnel: event.personnel || [],
                    notification_sent: event.notification_sent || false,
                });

                setTaskData((prev) => ({
                    ...prev,
                    event_id: eventId,
                }));

                if (eventData.personnel.length > 0) {
                    setEmptyPersonnelList(false);
                } else {
                    setEmptyPersonnelList(true);
                }
            })
            .catch((error) => {
                console.error('Error fetching event details:', error);
            });
    };

    const fetchTasks = (selected, setTodoList) => {
        axios
            .get(route('tasks.show', { eventId: selected }))
            .then((response) => {
                if (response.data.length === 0) {
                    console.log('No tasks found.');
                }
                setTodoList(response.data);
                setEmptyToDoList(false);
            })
            .catch(() => {
                console.warn('Error fetching tasks or no tasks exist.');
                setTodoList([]);
                setEmptyToDoList(true);
            });
    };
    console.log(todoList);

    useEffect(() => {
        if (selected && open) {
            fetchEventDetails(selected, setEventData, setTaskData);
            fetchTasks(selected, setTodoList);
        }
    }, [selected, open]);

    if (!eventData) return null;

    const handleAddPersonnel = (e) => {
        e.preventDefault();
        setEventData({
            ...eventData,
            personnel: [...eventData.personnel, personnel],
        });

        setPersonnel('');
        setShowForm((prev) => ({ ...prev, personnel: false }));
    };

    const handleRemovePersonnel = (e, personIndex) => {
        e.preventDefault();

        const updatedPersonnel = eventData.personnel.filter(
            (_, index) => index !== personIndex,
        );

        setEventData({
            ...eventData,
            personnel: updatedPersonnel,
        });
    };

    const handlePersonnelUpdate = (selected) => {
        setDialogConfig({
            title: 'Update Personnel',
            message: `Are you sure you want to update the personnel list of his event?`,
            formAction: 'update personnel',
        });

        setConfirmationDialogOpen(true);
    };

    const handleAddTask = (e) => {
        e.preventDefault();

        if (!taskData.task_name || !taskData.deadline) {
            console.error('Task name and deadline are required');
            return;
        }

        setDialogConfig({
            title: 'Add Task?',
            message: `Are you sure you want to add this task?`,
            formAction: 'add task',
        });

        setConfirmationDialogOpen(true);
    };

    const handleRemoveTask = (taskId) => {
        setDialogConfig({
            id: taskId,
            title: 'Remove Task?',
            message: `Are you sure you want to remove this task?`,
            formAction: 'remove task',
        });

        setConfirmationDialogOpen(true);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'add task') {
            post(route('tasks.store'), {
                onSuccess: () => {
                    fetchTasks(selected, setTodoList);
                    setTaskData({
                        task_name: '',
                        deadline: '',
                        event_id: taskData.event_id,
                    });
                    setShowForm((prev) => ({ ...prev, todo: false }));
                    setEmptyToDoList(false);
                    setConfirmationDialogOpen(false);
                },
                onError: console.error,
            });
        } else if (formAction === 'remove task') {
            destroy(route('tasks.delete', { id: dialogConfig.id }), {
                onSuccess: () => {
                    fetchTasks(selected, setTodoList);
                },
                onError: (errors) => {
                    console.error('Error deleting task:', errors);
                    setConfirmationDialogOpen(false);
                },
            });
        } else if (formAction === 'update personnel') {
            patch(route('events.update', { id: selected }), {
                onSuccess: () => {
                    setEditPersonnel(false);
                },
                onError: (errors) => {
                    console.error('Error updating event:', errors);
                    setConfirmationDialogOpen(false);
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogTitle />
            <DialogContent className="max-w-sm overflow-y-auto rounded-lg md:max-w-md">
                <div className="flex flex-col gap-4 py-3">
                    <div className="capitalize">
                        <div className="py-1">
                            <p className="w-full text-xl font-bold">
                                {eventData.name}
                            </p>
                            <p className="w-full text-sm font-bold">
                                {eventData.location}
                            </p>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="flex gap-2 py-1">
                                <p className="rounded bg-zinc-900 px-2 text-sm font-semibold text-white">
                                    Date
                                </p>
                                <Separator orientation="vertical" />
                                <p className="w-full text-sm font-bold">
                                    {new Date(
                                        eventData.date,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-2 py-1">
                                <p className="rounded bg-zinc-900 px-2 text-sm font-semibold text-white">
                                    Status
                                </p>
                                <Separator orientation="vertical" />
                                <p className="w-full text-sm font-bold">
                                    {eventData.status}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Tabs defaultValue="todo">
                        <TabsList className="flex w-full justify-start">
                            <TabsTrigger value="todo">Todo</TabsTrigger>
                            <TabsTrigger value="personnel">
                                Personnel
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="todo">
                            <div className="flex w-full flex-wrap gap-2 p-1">
                                <p className="text-sm font-semibold">
                                    To-Do List
                                </p>
                                <div className="w-full rounded border">
                                    <div className="flex flex-col">
                                        {/* Header */}
                                        <div className="flex items-center justify-start gap-2 rounded-t bg-zinc-900 p-2">
                                            <div className="w-[200px] font-bold text-white">
                                                Task
                                            </div>
                                            <div className="w-[50px] font-bold text-white">
                                                Deadline
                                            </div>
                                            <div className="font-bold text-white"></div>
                                        </div>

                                        <div className="max-h-[200px] w-full overflow-y-auto">
                                            {emptyToDoList ? (
                                                <div className="p-4 text-center text-gray-500">
                                                    No tasks added yet
                                                </div>
                                            ) : (
                                                todoList.map((task, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex w-full items-center justify-start gap-2 border-b px-2 py-3 text-xs hover:bg-gray-100"
                                                    >
                                                        <div className="w-[120px] md:w-[200px]">
                                                            {task.task_name}
                                                        </div>
                                                        <div className="min-w-[100px] proportional-nums">
                                                            {formatDate(
                                                                task.deadline,
                                                            )}
                                                        </div>
                                                        <div className="flex justify-center gap-1">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger>
                                                                    <MdMoreHoriz
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="flex min-w-[50px] flex-col gap-1">
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleRemoveTask(
                                                                                task.id,
                                                                            )
                                                                        }
                                                                        className="flex w-full cursor-pointer gap-2 text-center text-red-500 hover:text-red-700"
                                                                    >
                                                                        <MdOutlineDelete
                                                                            size={
                                                                                20
                                                                            }
                                                                        />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleRemove(
                                                                                'todoList',
                                                                                index,
                                                                            )
                                                                        }
                                                                        className="flex w-full cursor-pointer gap-2 text-center text-blue-500 hover:text-blue-700"
                                                                    >
                                                                        <MdOutlineDone
                                                                            size={
                                                                                20
                                                                            }
                                                                        />
                                                                        Done
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {!showForm.todo && (
                                    <Button
                                        className="w-full text-xs"
                                        onClick={() =>
                                            setShowForm((prev) => ({
                                                ...prev,
                                                todo: true,
                                            }))
                                        }
                                    >
                                        <MdOutlineAdd /> Add Task
                                    </Button>
                                )}
                                {showForm.todo && (
                                    <form
                                        onSubmit={handleAddTask}
                                        className="w-full"
                                    >
                                        <div className="flex w-full gap-2">
                                            <TextInput
                                                label="Task Name"
                                                name="task_name"
                                                className="w-full border border-zinc-300 p-1 text-sm shadow"
                                                value={taskData.task_name}
                                                onChange={(e) =>
                                                    setTaskData((prev) => ({
                                                        ...prev,
                                                        task_name:
                                                            e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                            <TextInput
                                                label="Deadline"
                                                name="deadline"
                                                className="w-full border border-zinc-300 p-1 text-sm shadow"
                                                type="date"
                                                value={taskData.deadline}
                                                onChange={(e) =>
                                                    setTaskData((prev) => ({
                                                        ...prev,
                                                        deadline:
                                                            e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="flex gap-2 py-2">
                                            <Button
                                                className="w-full bg-zinc-600 capitalize hover:bg-zinc-400"
                                                onClick={() => {
                                                    setShowForm(false);
                                                }}
                                            >
                                                cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="w-full capitalize"
                                            >
                                                Add Task
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="personnel">
                            <div className="flex w-full flex-wrap gap-2">
                                <p className="text-sm font-semibold">
                                    Personnel
                                </p>
                                {editPersonnel ? (
                                    <>
                                        {eventData.personnel.length > 0 ? (
                                            eventData.personnel.map(
                                                (person, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex w-full gap-2"
                                                    >
                                                        <div className="flex grow rounded border px-2 py-1">
                                                            <p>{person}</p>
                                                        </div>
                                                        <Button
                                                            onClick={(e) =>
                                                                handleRemovePersonnel(
                                                                    e,
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            <MdClose />
                                                        </Button>
                                                    </div>
                                                ),
                                            )
                                        ) : (
                                            <p className="w-full rounded border px-2 py-5 text-center text-sm text-gray-700">
                                                No personnel added yet
                                            </p>
                                        )}
                                        {!showForm.personnel && (
                                            <Button
                                                className="mt-2 w-full text-xs"
                                                onClick={() =>
                                                    setShowForm((prev) => ({
                                                        ...prev,
                                                        personnel: true,
                                                    }))
                                                }
                                            >
                                                <MdOutlineAdd /> Add Personnel
                                            </Button>
                                        )}
                                        {showForm.personnel && (
                                            <form
                                                onSubmit={handleAddPersonnel}
                                                className="w-full"
                                            >
                                                <div className="flex w-full gap-2">
                                                    <TextInput
                                                        label="Name"
                                                        name="personnel"
                                                        className="w-full border border-zinc-300 p-1 text-sm shadow"
                                                        value={personnel}
                                                        onChange={(e) =>
                                                            setPersonnel(
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="flex w-full gap-2 py-2">
                                                    <Button
                                                        className="w-full bg-zinc-600 capitalize hover:bg-zinc-400"
                                                        onClick={() => {
                                                            setShowForm(false);
                                                            setPersonnel('');
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        className="w-full"
                                                        type="submit"
                                                    >
                                                        Add Personnel
                                                    </Button>
                                                </div>
                                            </form>
                                        )}
                                        <div className="grid w-full grid-cols-2 gap-2">
                                            <Button
                                                className="w-full capitalize"
                                                onClick={() => {
                                                    setEditPersonnel(false);
                                                    setShowForm(false);
                                                    setPersonnel('');
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className="w-full capitalize"
                                                onClick={() => {
                                                    handlePersonnelUpdate(
                                                        selected,
                                                    );
                                                }}
                                            >
                                                save
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex w-full flex-wrap gap-2">
                                        <div className="flex w-full flex-wrap rounded border p-2">
                                            {eventData.personnel.length > 0 ? (
                                                eventData.personnel.map(
                                                    (person, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex w-full gap-2"
                                                        >
                                                            <p>{person}</p>
                                                        </div>
                                                    ),
                                                )
                                            ) : (
                                                <p className="w-full px-2 py-5 text-center text-sm text-gray-700">
                                                    No personnel added yet
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setEditPersonnel(true);
                                            }}
                                            className="w-full"
                                        >
                                            Edit Personnel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div>
                        <p className="text-sm font-semibold">Notes</p>
                        <p className="min-h-[100px] rounded border px-2 py-3 text-sm">
                            {eventData.notes || 'No additional notes.'}
                        </p>
                    </div>
                </div>
            </DialogContent>
            <ConfirmationDialog
                open={isConfirmationDialogOpen}
                onClose={() => {
                    fetchEventDetails(selected, setEventData, setTaskData);
                    setShowForm(false);
                    setConfirmationDialogOpen(false);
                }}
                onConfirm={handleConfirm}
                config={dialogConfig}
            />
        </Dialog>
    );
};

export default EventDetailsDialog;
