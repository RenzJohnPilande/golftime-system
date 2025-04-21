import CheckBoxInput from '@/components/CheckBoxInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import InputError from '../../../components/InputError';
import InputLabel from '../../../components/InputLabel';
import PrimaryButton from '../../../components/PrimaryButton';
import TextInput from '../../../components/TextInput';

const AlertDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    dialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setLoading(true);
            axios
                .get(route('alertcms.show', { id: selected }))
                .then((response) => {
                    const alert = response.data;
                    setData({
                        message: alert.message ?? '',
                        active: Boolean(alert.active),
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching alert:', error);
                    setLoading(false);
                });
        } else if (!selected) {
            reset();
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: selected ? 'Update Alert' : 'Create New Alert',
            message: selected
                ? 'Are you done modifying this alert? The details can be modified again later.'
                : 'Are you done creating this alert? The details can be modified later.',
            formAction: selected ? 'update alert' : 'create alert',
        });
        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-h-[800px] max-w-sm overflow-auto rounded-lg md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {dialogConfig.title}
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading alert data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex w-full flex-wrap gap-4">
                            {/* Section Type */}
                            <div className="w-full">
                                <InputLabel htmlFor="message" value="Message" />
                                <TextInput
                                    id="message"
                                    type="textarea"
                                    name="message"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    required
                                />
                                {errors.message && (
                                    <InputError className="mt-2">
                                        {errors.message}
                                    </InputError>
                                )}
                            </div>

                            {/* Active */}
                            <div className="w-full">
                                <InputLabel htmlFor="active" value="Active" />
                                <CheckBoxInput
                                    label="Active"
                                    checked={data?.active === true}
                                    onChange={(checked) =>
                                        setData('active', checked)
                                    }
                                />
                                {errors.active && (
                                    <InputError className="mt-2">
                                        {errors.active}
                                    </InputError>
                                )}
                            </div>

                            {/* Buttons */}
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
                                    text="Save"
                                    style={{
                                        wrapper:
                                            'border bg-zinc-800 hover:bg-zinc-600 text-white',
                                        text: 'capitalize text-sm',
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AlertDialog;
