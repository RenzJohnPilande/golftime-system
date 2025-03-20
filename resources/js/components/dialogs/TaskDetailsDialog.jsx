import { Dialog, DialogContent } from '@/components/ui/dialog';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const TaskDetailsDialog = ({ open, close, selected, employees, events }) => {
    const { auth } = usePage().props;
    const [task, setTask] = useState([]);
    const [event, setEvent] = useState([]);
    const authUser = auth.user;

    useEffect(() => {
        if (selected && open) {
            axios
                .get(route('tasks.show_task', { id: selected }))
                .then((response) => {
                    setTask(response.data[0]);
                    const foundEvent = events.find(
                        (e) => e.id === response.data[0].event_id,
                    );
                    setEvent(foundEvent || {});
                })
                .catch((error) => {
                    console.error('Error fetching task:', error);
                });
        }
    }, [selected, open]);

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-sm rounded-lg md:max-w-md">
                <div className="flex w-full flex-wrap gap-4">
                    <div className="flex w-full flex-col gap-2">
                        <p className="text-xs font-medium capitalize text-zinc-700">
                            Task
                        </p>
                        <p className="font-medium capitalize">
                            {task.task_name}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <p className="text-xs font-medium capitalize text-zinc-700">
                            overview
                        </p>
                        <p className="text-sm font-medium">
                            {task.task_description}
                        </p>
                    </div>
                    <div className="grid w-full grid-cols-2">
                        <div className="flex w-full flex-col gap-2">
                            <p className="text-xs font-medium capitalize text-zinc-700">
                                Deadline
                            </p>
                            <p className="py-1 text-xs font-medium text-zinc-800">
                                {task.deadline
                                    ? new Date(
                                          task.deadline,
                                      ).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                      })
                                    : 'N/A'}
                            </p>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <p className="text-xs font-medium capitalize text-zinc-700">
                                Status
                            </p>
                            <p
                                className={`w-fit rounded px-2 py-1 text-xs font-medium capitalize text-white ${task.status === 'complete' ? 'bg-green-500' : task.status === 'ongoing' ? 'bg-blue-500' : 'bg-yellow-500'}`}
                            >
                                {task.status}
                            </p>
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-2">
                        <div className="flex w-full flex-col gap-2">
                            <p className="text-xs font-medium capitalize text-zinc-700">
                                Task Type
                            </p>
                            <p className="text-xs font-medium capitalize">
                                {task.type}
                            </p>
                        </div>
                        {task.type === 'event' && (
                            <div className="flex w-full flex-col gap-2">
                                <p className="text-xs font-medium capitalize text-zinc-700">
                                    Event
                                </p>
                                <p className="text-xs font-medium capitalize">
                                    {event.name}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TaskDetailsDialog;
