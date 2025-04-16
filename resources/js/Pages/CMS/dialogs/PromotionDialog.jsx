import FileInput from '@/components/FileInput';
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

const PromotionDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setLoading(true);
            axios
                .get(route('promotioncms.show', { id: selected }))
                .then((response) => {
                    const promo = response.data;
                    setData({
                        title: promo.title ?? '',
                        description: promo.description ?? '',
                        image: promo.image ?? '',
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching article:', error);
                    setLoading(false);
                });
        } else if (!selected) {
            reset();
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();

        setDialogConfig({
            title: selected ? 'Update Promotion' : 'Create New Promotion',
            message: selected
                ? 'Are you done modifying this promotion? The details can be modified again later.'
                : 'Are you done creating this promotion? The details can be modified later.',
            formAction: selected ? 'update promotion' : 'create promotion',
        });

        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-h-[800px] max-w-sm overflow-auto rounded-lg md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {selected ? 'Update Promotion' : 'Create New Promotion'}
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading article data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex w-full flex-wrap gap-4">
                            {/* Title */}
                            <div className="w-full">
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    name="title"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    required
                                />
                                {errors.title && (
                                    <InputError className="mt-2">
                                        {errors.title}
                                    </InputError>
                                )}
                            </div>
                            {/* Description */}
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                                <TextInput
                                    type="textarea"
                                    id="description"
                                    name="description"
                                    className="mt-1 block min-h-[100px] w-full border px-2 py-2 text-sm shadow"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    required
                                />
                                {errors.description && (
                                    <InputError className="mt-2">
                                        {errors.description}
                                    </InputError>
                                )}
                            </div>
                            {!selected && (
                                <div className="w-full">
                                    <FileInput
                                        id="image"
                                        name="image"
                                        label="Image"
                                        onChange={(e) =>
                                            setData('image', e.target.files[0])
                                        }
                                        error={errors.image}
                                    />
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
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PromotionDialog;
