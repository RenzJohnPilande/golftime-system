import FileInput from '@/components/FileInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdCheckCircleOutline } from 'react-icons/md';

const ImagesDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);
    const [addImage, setAddImage] = useState(false);
    const [changesAreMade, setChangesAreMade] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setChangesAreMade(false);
            setAddImage(false);
            setLoading(true);
            axios
                .get(route('products.show', { id: selected }))
                .then((response) => {
                    setData({
                        images: response.data.images ?? [],
                    });
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
        console.log('Submitting images:', data.images);
        setDialogConfig({
            title: 'Confirm Save',
            message:
                'Do you want to save these changes? This action will update the product images and cannot be undone.',
            formAction: 'update images',
        });
        setConfirmationDialogOpen(true);
    };

    const removeImage = (imageToRemove) => {
        setData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((image) => image !== imageToRemove),
        }));
        setChangesAreMade(true);
    };

    const handleAddImages = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('images[]', file);
        });

        try {
            const response = await axios.post(
                route('products.tempUpload'),
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );

            setData((prev) => ({
                ...prev,
                images: [...(prev.images ?? []), ...response.data.paths], // array of temp paths
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
                        Manage Product Images
                    </DialogTitle>
                </DialogHeader>
                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading product data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex w-full flex-wrap gap-4">
                            {Array.isArray(data?.images) &&
                                data?.images.length > 0 && (
                                    <div className="flex w-full flex-wrap gap-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            {data?.images.map(
                                                (image, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col items-center gap-1"
                                                    >
                                                        <img
                                                            src={`storage/${image}`}
                                                            alt={`Existing Image ${index + 1}`}
                                                            className="w-full rounded-md border object-cover p-2"
                                                        />
                                                        <div className="flex w-full flex-wrap">
                                                            <button
                                                                type="button"
                                                                className="w-full rounded border border-red-600 p-1 text-xs font-semibold capitalize text-red-600"
                                                                title="Remove image"
                                                                onClick={() =>
                                                                    removeImage(
                                                                        image,
                                                                    )
                                                                }
                                                            >
                                                                remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
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
                                )}
                        </div>
                    </form>
                )}
                <Separator />
                {addImage ? (
                    <div className="flex w-full flex-wrap gap-2">
                        <FileInput
                            id="images"
                            name="images"
                            label="File Upload"
                            multiple
                            onChange={handleAddImages}
                            error={errors.images}
                        />
                        <div className="grid w-full grid-cols-2 gap-2">
                            <button
                                type="button"
                                className="flex w-full content-center items-center justify-center gap-2 rounded border bg-zinc-600 py-2 text-xs capitalize text-white"
                                title="cancel"
                                onClick={() => setAddImage(false)}
                            >
                                cancel
                            </button>
                            <button
                                type="button"
                                className="flex w-full content-center items-center justify-center gap-2 rounded border bg-zinc-900 py-2 text-xs capitalize text-white"
                                title="Done"
                                onClick={() => setAddImage(false)}
                            >
                                <MdCheckCircleOutline />
                                Done
                            </button>
                        </div>
                    </div>
                ) : (
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
                            title="Add images"
                            onClick={() => setAddImage(true)}
                        >
                            <MdAddCircleOutline />
                            Add images
                        </button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ImagesDialog;
