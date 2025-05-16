import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    CalendarIcon,
    CheckCircle2Icon,
    Clock3Icon,
    TagIcon,
    User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const TaskDetailsDialog = ({ open, close, selected, events }) => {
    const [task, setTask] = useState([]);
    const [event, setEvent] = useState([]);

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'complete':
                return 'bg-green-500 hover:bg-green-600';
            case 'ongoing':
                return 'bg-blue-500 hover:bg-blue-600';
            default:
                return 'bg-yellow-500 hover:bg-yellow-600';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';

        return new Date(dateString).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-md rounded-lg sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {task.task_name}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">
                        Task details and information
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    <div className="space-y-2">
                        <h3 className="text-muted-foreground text-sm font-medium">
                            Overview
                        </h3>
                        <p className="text-sm">{task.task_description}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <CheckCircle2Icon className="text-muted-foreground h-4 w-4" />
                                <h3 className="text-muted-foreground text-sm font-medium">
                                    Status
                                </h3>
                            </div>
                            <Badge
                                className={`${getStatusColor(task.status)} capitalize`}
                            >
                                {task.status}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="text-muted-foreground h-4 w-4" />
                                <h3 className="text-muted-foreground text-sm font-medium">
                                    Deadline
                                </h3>
                            </div>
                            <p className="text-sm">
                                {formatDate(task.deadline)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <TagIcon className="text-muted-foreground h-4 w-4" />
                                <h3 className="text-muted-foreground text-sm font-medium">
                                    Task Type
                                </h3>
                            </div>
                            <p className="text-sm capitalize">{task.type}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Clock3Icon className="text-muted-foreground h-4 w-4" />
                                <h3 className="text-muted-foreground text-sm font-medium">
                                    Event
                                </h3>
                            </div>
                            <p className="text-sm">
                                {task.type === 'event' ? event.name : 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <User className="text-muted-foreground h-4 w-4" />
                                <h3 className="text-muted-foreground text-sm font-medium">
                                    Assigned To
                                </h3>
                            </div>
                            <p className="text-sm">
                                {task?.user?.firstname}{' '}
                                {task?.user?.middlename
                                    ? task?.user?.middlename + ' '
                                    : ''}
                                {task?.user?.lastname}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TaskDetailsDialog;
