import FileInput from '@/components/FileInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdCheckCircleOutline } from 'react-icons/md';

const BannerImageUpload = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState(null);
    const [changesAreMade, setChangesAreMade] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setChangesAreMade(false);
            setLoading(true);
            axios
                .get(route('bannercms.show', { id: selected }))
                .then((response) => {
                    const { image, background } = response.data;
                    setData({
                        image: image ?? null,
                        background: background ?? null,
                    });
                    setImagePreview(image ?? null);
                    setBackgroundPreview(background ?? null);
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
            title: 'Confirm Save',
            message:
                'Do you want to save these banner images? This action will update the banner and cannot be undone.',
            formAction: 'update banner image',
        });
        setConfirmationDialogOpen(true);
    };

    const handleTempUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadForm = new FormData();
        uploadForm.append(type, file);

        try {
            const response = await axios.post(
                route('bannercms.tempUpload'),
                uploadForm,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );

            const filePath = response.data[type]; // ✅ this now gets 'image' or 'background'

            if (type === 'image') {
                setImagePreview(filePath);
            } else if (type === 'background') {
                setBackgroundPreview(filePath);
            }

            setData((prev) => ({
                ...prev,
                [type]: filePath,
            }));
            setChangesAreMade(true);
        } catch (error) {
            console.error(`Temp upload for ${type} failed:`, error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-md rounded-lg">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        Manage Banner Images
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading banner data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex w-full flex-wrap gap-4">
                                <div className="w-full">
                                    <div className="mb-1 text-sm font-medium">
                                        Image
                                    </div>
                                    {imagePreview ? (
                                        <img
                                            src={`/public/${imagePreview}`}
                                            alt="Banner Image"
                                            className="aspect-video h-auto w-full rounded-md border object-contain p-2"
                                        />
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            No image selected
                                        </div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <div className="mb-1 text-sm font-medium">
                                        Background
                                    </div>
                                    {backgroundPreview ? (
                                        <img
                                            src={`/public/${backgroundPreview}`}
                                            alt="Banner Background"
                                            className="aspect-video h-auto w-full rounded-md border object-contain p-2"
                                        />
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            No background selected
                                        </div>
                                    )}
                                </div>
                            </div>

                            {changesAreMade && (
                                <div className="flex w-full">
                                    <button
                                        type="submit"
                                        className="w-full rounded border bg-zinc-900 py-2 text-xs capitalize text-white"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                )}

                <Separator />

                <div className="flex w-full flex-col gap-2">
                    <FileInput
                        id="bannerImage"
                        name="bannerImage"
                        label="Upload Image"
                        onChange={(e) => handleTempUpload(e, 'image')}
                        error={errors.image}
                    />
                    <FileInput
                        id="bannerBackground"
                        name="bannerBackground"
                        label="Upload Background"
                        onChange={(e) => handleTempUpload(e, 'background')}
                        error={errors.background}
                    />

                    <div className="grid w-full grid-cols-2 gap-2 pt-2">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded border bg-zinc-600 py-2 text-xs capitalize text-white"
                            onClick={close}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded border bg-zinc-900 py-2 text-xs capitalize text-white"
                            onClick={close}
                        >
                            <MdCheckCircleOutline />
                            Done
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BannerImageUpload;
