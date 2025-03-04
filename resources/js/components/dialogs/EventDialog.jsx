import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect } from 'react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import PrimaryButton from '../PrimaryButton';
import TextInput from '../TextInput';
import { Textarea } from '../ui/textarea';

const EventDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;

    useEffect(() => {
        if (selected && open) {
            axios
                .get(route('events.show', { id: selected }))
                .then((response) => {
                    const formattedDate =
                        response.data.event.date.split(' ')[0];
                    setData({
                        name: response.data.event.name ?? '',
                        location: response.data.event.location ?? '',
                        date: formattedDate ?? '',
                        status: response.data.event.status ?? '',
                        personnel: Array.isArray(response.data.event.personnel)
                            ? response.data.event.personnel
                            : [],
                        notes: response.data.event.notes ?? '',
                        user_id: response.data.event.user_id ?? '',
                        notification_sent:
                            response.data.event.notification_sent ?? '',
                    });
                })
                .catch((error) => {
                    console.error('Error fetching event:', error);
                });
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: selected ? 'Update Event' : 'Create New Event',
            message: selected
                ? 'Are you done modifying this event? The details can be modified again later.'
                : 'Are you done creating this event? The details can be modified later.',
            formAction: selected ? 'update' : 'create',
        });
        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-sm rounded-lg md:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {selected ? 'Update event' : 'Create new event'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="flex w-full flex-wrap gap-2">
                        <div className="flex w-full gap-4">
                            <div className="w-full">
                                <InputLabel htmlFor="name" value="Event Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />
                                {errors.name && (
                                    <InputError className="mt-2">
                                        {errors.name}
                                    </InputError>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full gap-4">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="location"
                                    value="Location"
                                />
                                <TextInput
                                    id="location"
                                    name="location"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData('location', e.target.value)
                                    }
                                    required
                                />
                                {errors.location && (
                                    <InputError className="mt-2">
                                        {errors.location}
                                    </InputError>
                                )}
                            </div>
                        </div>

                        <div className="flex w-full flex-col flex-wrap">
                            <InputLabel htmlFor="date" value="Event Date" />
                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                value={data.date}
                                onChange={(e) =>
                                    setData('date', e.target.value)
                                }
                                required
                            />
                            {errors.date && (
                                <InputError className="mt-2">
                                    {errors.date}
                                </InputError>
                            )}
                        </div>
                        <div className="flex w-full flex-wrap">
                            <InputLabel htmlFor="notes" value="Notes" />
                            <Textarea
                                id="notes"
                                name="notes"
                                className="mt-1 block max-h-[100px] w-full text-sm"
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                            />
                            {errors.notes && (
                                <InputError className="mt-2">
                                    {errors.notes}
                                </InputError>
                            )}
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

export default EventDialog;
