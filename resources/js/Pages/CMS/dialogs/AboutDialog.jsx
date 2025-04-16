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

const AboutDialog = ({
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
                .get(route('aboutcms.show', { id: selected }))
                .then((response) => {
                    const content = response.data;
                    setData({
                        section_type: content.section_type ?? '',
                        content: content.content ?? '',
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

        setDialogConfig({
            title: 'Update Content',
            message:
                'Are you done modifying this content? The details can be modified again later.',
            formAction: 'update content',
        });

        setConfirmationDialogOpen(true);
    };

    if (!selected) {
        return;
    }

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-h-[800px] max-w-sm overflow-auto rounded-lg md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {'Update Content'}
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading article data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex w-full flex-wrap gap-4">
                            {/* Section Type */}
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="section_type"
                                    value="Section Type"
                                />
                                <TextInput
                                    id="section_type"
                                    name="section_type"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data.section_type}
                                    onChange={(e) =>
                                        setData('section_type', e.target.value)
                                    }
                                    required
                                />
                                {errors.section_type && (
                                    <InputError className="mt-2">
                                        {errors.section_type}
                                    </InputError>
                                )}
                            </div>

                            {/* Content */}
                            <div className="w-full">
                                <InputLabel htmlFor="content" value="Content" />
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={8}
                                    className="mt-1 block w-full resize-y rounded border px-2 py-2 text-sm shadow focus:ring-2"
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    required
                                />
                                {errors.content && (
                                    <InputError className="mt-2">
                                        {errors.content}
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

export default AboutDialog;
