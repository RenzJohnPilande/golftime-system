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

const ContactDialog = ({
    open,
    close,
    selected,
    formData,
    dialogConfig,
    setDialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setLoading(true);
            axios
                .get(route('contactcms.show', { id: selected }))
                .then((response) => {
                    const content = response.data;
                    setData({
                        address: content.address ?? '',
                        email: content.email ?? '',
                        phone: content.phone ?? '',
                        business_hours: content.business_hours ?? '',
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching content:', error);
                    setLoading(false);
                });
        } else if (!selected) {
            reset();
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
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
                        Loading contact data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex w-full flex-wrap gap-4">
                            {dialogConfig.formAction === 'update address' && (
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="address"
                                        value="Address"
                                    />
                                    <TextInput
                                        id="address"
                                        name="address"
                                        type="textarea"
                                        className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.address && (
                                        <InputError className="mt-2">
                                            {errors.address}
                                        </InputError>
                                    )}
                                </div>
                            )}

                            {dialogConfig.formAction === 'update email' && (
                                <div className="w-full">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                        value={data.email}
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
                            )}

                            {dialogConfig.formAction === 'update phone' && (
                                <div className="w-full">
                                    <InputLabel htmlFor="phone" value="Phone" />
                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.phone && (
                                        <InputError className="mt-2">
                                            {errors.phone}
                                        </InputError>
                                    )}
                                </div>
                            )}

                            {dialogConfig.formAction ===
                                'update business_hours' && (
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="business_hours"
                                        value="Business Hours"
                                    />
                                    <TextInput
                                        id="business_hours"
                                        name="business_hours"
                                        className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                        value={data.business_hours}
                                        onChange={(e) =>
                                            setData(
                                                'business_hours',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {errors.business_hours && (
                                        <InputError className="mt-2">
                                            {errors.business_hours}
                                        </InputError>
                                    )}
                                </div>
                            )}

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

export default ContactDialog;
