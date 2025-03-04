import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect } from 'react';
import InputError from '../../../components/InputError';
import InputLabel from '../../../components/InputLabel';
import PrimaryButton from '../../../components/PrimaryButton';
import TextInput from '../../../components/TextInput';

const RoleDialog = ({
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
                .get(route('roles.show', { id: selected }))
                .then((response) => {
                    setData({
                        job_title: response.data.job_title ?? '',
                        job_description: response.data.job_description ?? '',
                    });
                })
                .catch((error) => {
                    console.error('Error fetching role:', error);
                });
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: selected ? 'Update Role' : 'Create New Role',
            message: selected
                ? 'Are you done modifying this role? The details can be modified again later.'
                : 'Are you done creating this role? The details can be modified later.',
            formAction: selected ? 'update role' : 'create role',
        });
        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-sm rounded-lg md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {selected ? 'Update Role' : 'Create New Role'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="flex w-full flex-wrap gap-2">
                        <div className="w-full">
                            <InputLabel htmlFor="job_title" value="Role Name" />
                            <TextInput
                                id="job_title"
                                name="job_title"
                                className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                value={data.job_title}
                                onChange={(e) =>
                                    setData('job_title', e.target.value)
                                }
                                required
                            />
                            {errors.job_title && (
                                <InputError className="mt-2">
                                    {errors.job_title}
                                </InputError>
                            )}
                        </div>
                        <div className="w-full">
                            <InputLabel
                                htmlFor="job_description"
                                value="Description"
                            />
                            <TextInput
                                id="job_description"
                                name="job_description"
                                type="textarea"
                                className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                value={data.job_description}
                                onChange={(e) =>
                                    setData('job_description', e.target.value)
                                }
                            />
                            {errors.job_description && (
                                <InputError className="mt-2">
                                    {errors.job_description}
                                </InputError>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full flex-wrap justify-end gap-2 py-2">
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
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RoleDialog;
