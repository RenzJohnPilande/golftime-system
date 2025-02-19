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

const DepartmentDialog = ({
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
                .get(route('departments.show', { id: selected }))
                .then((response) => {
                    setData({
                        name: response.data.department.name,
                        description: response.data.department.description,
                    });
                })
                .catch((error) => {
                    console.error('Error fetching department:', error);
                });
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: selected ? 'Update Department' : 'Create New Department',
            message: selected
                ? 'Are you done modifying this department? The details can be modified again later.'
                : 'Are you done creating this department? The details can be modified later.',
            formAction: selected ? 'update' : 'create',
        });
        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-w-sm rounded-lg md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {selected
                            ? 'Update Department'
                            : 'Create New Department'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="flex w-full flex-wrap gap-2">
                        <div className="w-full">
                            <InputLabel
                                htmlFor="name"
                                value="Department Name"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                            />
                            {errors.name && (
                                <InputError className="mt-2">
                                    {errors.name}
                                </InputError>
                            )}
                        </div>
                        <div className="w-full">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <TextInput
                                id="description"
                                name="description"
                                className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            {errors.description && (
                                <InputError className="mt-2">
                                    {errors.description}
                                </InputError>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full flex-wrap justify-end gap-2">
                        <PrimaryButton
                            text="Cancel"
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

export default DepartmentDialog;
