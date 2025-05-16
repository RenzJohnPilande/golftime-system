import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdClose, MdOutlineAdd } from 'react-icons/md';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import ConfirmationDialog from './ConfirmationDialog';

const EventDetailsDialog = ({ open, close, selected, formData }) => {
    const [showForm, setShowForm] = useState({ personnel: false });
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
            })
            .catch((error) => {
                console.error('Error fetching event details:', error);
            });
    };

    const fetchTasks = (selected, setTodoList) => {
        axios
            .get(route('tasks.show', { eventId: selected }))
            .then((response) => {
                setTodoList(response.data);
                setEmptyToDoList(false);
            })
            .catch(() => {
                console.warn('Error fetching tasks or no tasks exist.');
                setTodoList([]);
                setEmptyToDoList(true);
            });
    };

    useEffect(() => {
        if (selected && open) {
            fetchEventDetails(selected, setEventData);
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

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'update personnel') {
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
            <DialogContent className="max-w-sm overflow-y-auto rounded-lg px-3 md:max-w-md">
                <div className="flex flex-col gap-4">
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
                        <TabsList className="grid w-full grid-cols-2 bg-transparent">
                            <TabsTrigger
                                value="todo"
                                className="border border-zinc-900 text-zinc-900 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                            >
                                Todo
                            </TabsTrigger>
                            <TabsTrigger
                                value="personnel"
                                className="border border-zinc-900 text-zinc-900 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                            >
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
                                        <div className="flex items-center justify-start gap-4 rounded-t bg-zinc-900 p-2">
                                            <div className="w-40 text-sm font-semibold text-white">
                                                Task
                                            </div>
                                            <div className="w-20 text-sm font-semibold text-white">
                                                Deadline
                                            </div>
                                            <div className="text-sm font-semibold text-white">
                                                Status
                                            </div>
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
                                                        className="flex w-full grid-cols-4 items-center justify-start gap-4 border-b px-2 py-3 text-xs hover:bg-gray-100"
                                                    >
                                                        <div className="w-40">
                                                            {task.task_name}
                                                        </div>
                                                        <div className="w-20 proportional-nums">
                                                            {formatDate(
                                                                task.deadline,
                                                            )}
                                                        </div>
                                                        <div
                                                            className={`w-[80px] rounded px-2 py-1 text-center font-semibold capitalize text-white ${
                                                                {
                                                                    pending:
                                                                        'bg-yellow-400',
                                                                    ongoing:
                                                                        'bg-blue-400',
                                                                    complete:
                                                                        'bg-green-400',
                                                                }[
                                                                    task.status
                                                                ] ||
                                                                'bg-gray-400'
                                                            }`}
                                                        >
                                                            {task.status}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
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
                                        <Separator />

                                        {showForm.personnel && (
                                            <form
                                                onSubmit={handleAddPersonnel}
                                                className="w-full rounded border px-2 py-2"
                                            >
                                                <div className="flex w-full flex-wrap gap-2 py-1">
                                                    <InputLabel
                                                        htmlFor="personnel"
                                                        value="Name"
                                                        className="text-xs font-semibold"
                                                    />
                                                    <TextInput
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
                                                        type="button"
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
                                        <Separator />

                                        <div className="grid w-full grid-cols-2 gap-2">
                                            <Button
                                                type="button"
                                                className="w-full bg-zinc-600 capitalize hover:bg-zinc-400"
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
                                        <div className="flex w-full flex-wrap gap-1 rounded border p-2">
                                            {eventData.personnel.length > 0 ? (
                                                eventData.personnel.map(
                                                    (person, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex w-full text-sm"
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
                    fetchEventDetails(selected, setEventData);
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
