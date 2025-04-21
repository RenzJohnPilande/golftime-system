import FileInput from '@/components/FileInput';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BannerDialog = ({
    open,
    close,
    selected,
    user,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
    setSelected,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setLoading(true);
            axios
                .get(route('bannercms.show', { id: selected }))
                .then((response) => {
                    const banner = response.data;
                    setData({
                        title: banner.title ?? '',
                        description: banner.description ?? '',
                        image: banner.image ?? '',
                        background: banner.background ?? '',
                        link: banner.link ?? '',
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching banner:', error);
                    setLoading(false);
                });
        } else if (!selected) {
            reset();
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();

        setDialogConfig({
            title: selected ? 'Update Banner' : 'Create New Banner',
            message: selected
                ? 'Are you done editing this banner? Changes will reflect immediately.'
                : 'Are you ready to add this new banner? You can edit it later.',
            formAction: selected ? 'update banner' : 'create banner',
        });

        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-h-[800px] max-w-sm overflow-auto rounded-lg md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {selected ? 'Update Banner' : 'Create New Banner'}
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading banner data...
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

                            {/* Image input (only on create) */}
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

                            {/* Background input (only on create) */}
                            {!selected && (
                                <div className="w-full">
                                    <FileInput
                                        id="background"
                                        name="background"
                                        label="Background"
                                        onChange={(e) =>
                                            setData(
                                                'background',
                                                e.target.files[0],
                                            )
                                        }
                                        error={errors.background}
                                    />
                                </div>
                            )}
                            {/* Link */}
                            <div className="w-full">
                                <InputLabel htmlFor="link" value="Link" />
                                <TextInput
                                    id="link"
                                    name="link"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data.link}
                                    onChange={(e) =>
                                        setData('link', e.target.value)
                                    }
                                />
                                {errors.link && (
                                    <InputError className="mt-2">
                                        {errors.link}
                                    </InputError>
                                )}
                            </div>
                            {/* Buttons */}
                            <div className="flex w-full justify-end gap-2">
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
                                        setSelected(null);
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

export default BannerDialog;
