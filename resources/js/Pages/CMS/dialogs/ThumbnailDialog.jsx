import FileInput from '@/components/FileInput';
import PrimaryButton from '@/components/PrimaryButton';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

const ThumbnailDialog = ({ open, close, selected, onUpload }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        onUpload(selected.id, file);
        setFile(null);
        setError(null);
        close();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError(null);
    };

    return (
        <Dialog open={open && !!selected} onOpenChange={close}>
            <DialogContent className="max-w-md rounded-lg">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        Upload Thumbnail
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {selected?.thumbnail && (
                            <div className="flex justify-center">
                                <img
                                    src={`/storage/${selected.thumbnail}`}
                                    alt="Current Thumbnail"
                                    className="rounded-md border object-cover"
                                />
                            </div>
                        )}

                        <FileInput
                            id="thumbnail"
                            name="thumbnail"
                            label="Select Thumbnail"
                            multiple={false}
                            onChange={handleFileChange}
                            error={error}
                        />

                        <div className="flex justify-end gap-2">
                            <PrimaryButton
                                type="button"
                                text="Cancel"
                                onClick={close}
                                style={{
                                    wrapper:
                                        'border text-zinc-800 hover:bg-zinc-500 hover:text-white',
                                    text: 'capitalize text-sm',
                                }}
                            />
                            <PrimaryButton
                                type="submit"
                                text="Upload"
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

export default ThumbnailDialog;
