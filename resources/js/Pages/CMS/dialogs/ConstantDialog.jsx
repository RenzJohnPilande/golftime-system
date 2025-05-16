import CheckBoxInput from '@/components/CheckBoxInput';
import SelectInput from '@/components/SelectInput';
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

const ConstantDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    dialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setLoading(true);
            axios
                .get(route('constantscms.show', { id: selected }))
                .then((response) => {
                    const constant = response.data;
                    setData({
                        type: constant.type ?? '',
                        description: constant.description ?? '',
                        value: constant.value ?? '',
                        active: Boolean(constant.active),
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching constant:', error);
                    setLoading(false);
                });
        } else if (!selected) {
            reset();
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: selected ? 'Update Constant' : 'Create New Constant',
            message: selected
                ? 'Are you done modifying this item? The details can be modified again later.'
                : 'Are you done creating this item? The details can be modified later.',
            formAction: selected ? 'update constant' : 'create constant',
        });
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
                        Loading alert data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex w-full flex-wrap gap-4">
                            {/*Type */}
                            <div className="w-full">
                                <InputLabel htmlFor="type" value="Type" />
                                <SelectInput
                                    id="type"
                                    name="type"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    options={[
                                        {
                                            label: 'Category',
                                            value: 'Category',
                                        },
                                        {
                                            label: 'Product Column',
                                            value: 'Product Column',
                                        },
                                        {
                                            label: 'About Column',
                                            value: 'About Column',
                                        },
                                    ]}
                                    value={data.type || ''}
                                    onChange={(e) =>
                                        setData('type', e.target.value)
                                    }
                                    required
                                />
                                {errors.type && (
                                    <InputError className="mt-2">
                                        {errors.type}
                                    </InputError>
                                )}
                            </div>
                            {/*Description */}
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
                                    required
                                />
                                {errors.description && (
                                    <InputError className="mt-2">
                                        {errors.description}
                                    </InputError>
                                )}
                            </div>
                            {/*Value */}
                            <div className="w-full">
                                <InputLabel htmlFor="value" value="Value" />
                                <TextInput
                                    id="value"
                                    name="value"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data.value}
                                    onChange={(e) =>
                                        setData('value', e.target.value)
                                    }
                                    required
                                />
                                {errors.value && (
                                    <InputError className="mt-2">
                                        {errors.value}
                                    </InputError>
                                )}
                            </div>

                            {/* Active */}
                            <div className="w-full">
                                <InputLabel htmlFor="active" value="Active" />
                                <CheckBoxInput
                                    label="Active"
                                    checked={data?.active === true}
                                    onChange={(checked) =>
                                        setData('active', checked)
                                    }
                                />
                                {errors.active && (
                                    <InputError className="mt-2">
                                        {errors.active}
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

export default ConstantDialog;
