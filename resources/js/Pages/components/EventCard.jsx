import { Button } from '@/components/ui/button';
import {
    Ban,
    CheckCircle,
    Clock,
    Eye,
    Loader,
    MapPin,
    Pencil,
    Settings,
    Trash2,
} from 'lucide-react';

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-300';
        case 'preparation':
            return 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-300';
        case 'ongoing':
            return 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300';
        case 'completed':
            return 'bg-green-100 text-green-800 hover:bg-green-100 border-green-300';
        case 'cancelled':
            return 'bg-red-100 text-red-800 hover:bg-red-100 border-red-300';
        default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-300';
    }
};

const StatusIcons = ({ status }) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return <Clock className="mr-2 h-5 w-5 text-yellow-500" />;
        case 'preparation':
            return <Settings className="mr-2 h-5 w-5 text-purple-500" />;
        case 'ongoing':
            return (
                <Loader className="mr-2 h-5 w-5 animate-spin text-blue-500" />
            );
        case 'completed':
            return <CheckCircle className="mr-2 h-5 w-5 text-green-500" />;
        case 'cancelled':
            return <Ban className="mr-2 h-5 w-5 text-red-500" />;
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

const EventCard = ({ event, onView, onEdit, onDelete }) => {
    let personnel = [];

    try {
        personnel = JSON.parse(event.personnel || '[]');
    } catch (e) {
        console.error('Invalid personnel data:', e);
        personnel = [];
    }
    return (
        <div className="flex h-full min-h-[314px] w-full flex-col rounded-lg border bg-white shadow">
            <div
                className={`flex w-full items-center justify-center rounded-t-lg py-2 text-xs capitalize ${getStatusColor(event.status)}`}
            >
                <StatusIcons status={event.status} />
                {event.status}
            </div>
            <div className="flex grow flex-col gap-4 p-4">
                <div className="flex w-full grow flex-wrap content-start gap-2 overflow-auto">
                    <div className="flex w-full items-start justify-between">
                        <p className="line-clamp-1 text-lg font-semibold">
                            {event.name}
                        </p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-3">
                        <div>
                            <p className="mb-1 text-xs text-gray-500">
                                Location
                            </p>
                            <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                                <p className="truncate text-sm font-medium">
                                    {event.location}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="mb-1 text-xs text-gray-500">Date</p>
                            <p className="text-sm font-medium">
                                {formatDate(event.date)}
                            </p>
                        </div>
                    </div>
                    {event.notes && (
                        <div className="flex w-full flex-wrap">
                            <p className="mb-1 text-xs text-gray-500">Notes</p>
                            <div className="h-20 w-full overflow-hidden rounded bg-slate-50 p-2">
                                <p className="line-clamp-2 text-sm">
                                    {event.notes || 'No notes available'}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="w-full">
                        <p className="mb-1 text-xs text-gray-500">
                            Assigned to
                        </p>
                        <p className="text-sm font-medium">
                            {event.user
                                ? `${event.user.firstname} ${event.user.middlename ? event.user.middlename + ' ' : ''}${event.user.lastname}`
                                : `User ID: ${event.assigned_to}`}
                        </p>
                    </div>
                    {personnel.length > 0 ? (
                        <div className="w-full">
                            <p className="mb-1 text-xs text-gray-500">
                                Personnel
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {personnel.slice(0, 3).map((name, index) => (
                                    <span
                                        key={index}
                                        className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs"
                                    >
                                        {name}
                                    </span>
                                ))}
                                {personnel.length > 3 && (
                                    <span className="inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
                                        +{personnel.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <p className="mb-1 text-xs text-gray-500">
                                Personnel
                            </p>
                            <div className="flex flex-wrap gap-1">
                                <p className="text-xs capitalize">
                                    No personnel listed
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex w-full flex-wrap content-end justify-between gap-2">
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

export default EventCard;
