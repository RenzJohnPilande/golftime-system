import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Eye, Loader, Pencil, Trash2 } from 'lucide-react';

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'complete':
            return 'bg-green-100 text-green-800 hover:bg-green-100 border-green-300';
        case 'ongoing':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-300';
        default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-300';
    }
};

const StatusIcons = ({ status }) => {
    switch (status) {
        case 'pending':
            return <Clock className="mr-2 h-5 w-5 text-yellow-500" />;
        case 'ongoing':
            return <Loader className="mr-2 h-5 w-5 text-blue-500" />;
        case 'complete':
            return <CheckCircle className="mr-2 h-5 w-5 text-green-500" />;
        default:
            return null;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const TaskCard = ({ task, onView, onEdit, onDelete }) => {
    return (
        <div className="flex w-full flex-wrap gap-2 rounded-lg border bg-white shadow">
            <div
                className={`flex w-full items-center justify-center rounded-t-lg py-2 text-xs capitalize ${getStatusColor(task.status)}`}
            >
                <StatusIcons status={task.status} />
                {task.status}
            </div>
            <div className="flex w-full flex-wrap gap-2 rounded-b-lg bg-white px-4 py-2">
                <div className="flex w-full items-start justify-between">
                    <p className="line-clamp-1 text-lg font-semibold">
                        {task.task_name}
                    </p>
                </div>
                <div className="flex w-full flex-wrap">
                    <p className="mb-1 text-xs text-gray-500">Description</p>
                    <div className="h-20 w-full overflow-hidden rounded bg-slate-50 p-2">
                        <p className="line-clamp-2 text-sm">
                            {task.task_description}
                        </p>
                    </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-3">
                    <div>
                        <p className="mb-1 text-xs text-gray-500">Deadline</p>
                        <p className="text-sm font-medium">
                            {formatDate(task.deadline)}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-xs text-gray-500">Type</p>
                        <p className="text-sm font-medium capitalize">
                            {task.type}
                        </p>
                    </div>
                </div>
                <div className="w-full">
                    <p className="mb-1 text-xs text-gray-500">Assigned to</p>
                    <p className="text-sm font-medium">
                        {task.user.firstname}{' '}
                        {task.user.middlename ? task.user.middlename + ' ' : ''}
                        {task.user.lastname}
                    </p>
                </div>
                <div className="flex w-full flex-wrap justify-between gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-800 bg-blue-50 p-2 text-blue-800 hover:bg-blue-200 hover:text-blue-800"
                        onClick={onView}
                    >
                        <Eye className="mr-1 h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-yellow-800 bg-yellow-50 p-2 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-800"
                        onClick={onEdit}
                    >
                        <Pencil className="mr-1 h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 flex-wrap justify-center border-red-800 bg-red-50 p-2 text-red-800 hover:bg-red-200 hover:text-red-800"
                        onClick={onDelete}
                    >
                        <Trash2 className="mr-1 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
