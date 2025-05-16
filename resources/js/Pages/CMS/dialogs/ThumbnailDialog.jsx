import FileInput from '@/components/FileInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { MdCheckCircleOutline } from 'react-icons/md';

const ThumbnailDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);
    const [addthumbnail, setAddThumbnail] = useState(null);
    const [changesAreMade, setChangesAreMade] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setChangesAreMade(false);
            setLoading(true);
            axios
                .get(route('products.show', { id: selected }))
                .then((response) => {
                    setData({
                        thumbnail: response.data.thumbnail ?? null,
                    });
                    setAddThumbnail(response.data.thumbnail ?? null);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                });
        } else if (!selected) {
            reset();
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
        console.log('Submitting thumbnail:', data.thumbnail);
        setDialogConfig({
            title: 'Confirm Save',
            message:
                'Do you want to save this thumbnail? This action will update the product thumbnail and cannot be undone.',
            formAction: 'update thumbnail',
        });
        setConfirmationDialogOpen(true);
    };

    const handleAddThumbnail = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('thumbnail', file);

        try {
            const response = await axios.post(
                route('products.tempThumbnailUpload'),
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );

            setAddThumbnail(response.data.path);
            setData((prev) => ({
                ...prev,
                thumbnail: response.data.path,
            }));
            setChangesAreMade(true);
        } catch (error) {
            console.error('Temp upload failed:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-md rounded-lg">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        Manage Product Thumbnail
                    </DialogTitle>
                </DialogHeader>
                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading product data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex flex-col items-center gap-4">
                            {addthumbnail ? (
                                <div className="flex flex-col items-center gap-1">
                                    <img
                                        src={`/public/${data.thumbnail}`}
                                        alt="Thumbnail"
                                        className="w-full rounded-md border object-cover p-2"
                                    />
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">
                                    No thumbnail selected
                                </div>
                            )}
                            {changesAreMade && (
                                <div className="flex w-full flex-wrap">
                                    <button
                                        type="submit"
                                        className="w-full rounded border bg-zinc-900 py-2 text-xs capitalize text-white"
                                        title="Save Changes"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                )}
                <Separator />
                <div className="flex w-full flex-wrap gap-2">
                    <FileInput
                        id="thumbnail"
                        name="thumbnail"
                        label="Thumbnail Upload"
                        onChange={handleAddThumbnail}
                        error={errors.thumbnail}
                    />
                    <div className="grid w-full grid-cols-2 gap-2">
                        <button
                            type="button"
                            className="flex w-full content-center items-center justify-center gap-2 rounded border bg-zinc-600 py-2 text-xs capitalize text-white"
                            title="cancel"
                            onClick={close}
                        >
                            cancel
                        </button>
                        <button
                            type="button"
                            className="flex w-full content-center items-center justify-center gap-2 rounded border bg-zinc-900 py-2 text-xs capitalize text-white"
                            title="Done"
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

export default ThumbnailDialog;
