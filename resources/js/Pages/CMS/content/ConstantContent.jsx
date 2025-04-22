import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import PrimaryButton from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConstantDialog from '../dialogs/ConstantDialog';
const ConstantContent = ({ constants }) => {
    const [constantsDialogOpen, setConstantsDialogOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        formAction: '',
    });

    const user = usePage().props.auth.user;

    const useIsMobile = () => {
        const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

        useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 640);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        return isMobile;
    };

    const isMobile = useIsMobile();

    const {
        data,
        setData,
        errors,
        processing,
        reset,
        patch,
        post,
        delete: destroy,
    } = useForm({
        type: '',
        description: '',
        value: '',
        active: false,
    });

    const handleClose = () => {
        reset();
        setSelected(null);
        setConstantsDialogOpen(false);
    };

    const handleDelete = (id) => {
        setSelected(id);
        setDialogConfig({
            title: 'Delete Item',
            formAction: 'delete constant',
            message:
                'Are you sure you want to delete this item? This action cannot be undone.',
        });
        setConfirmationDialogOpen(true);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'create constant') {
            post(route('constantscms.store'), {
                onSuccess: handleClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update constant') {
            patch(route('constantscms.update', { id: selected }), {
                onSuccess: handleClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'delete constant') {
            destroy(route('constantscms.delete', { id: selected }), {
                onSuccess: () => {
                    setSelected(null);
                    onClose();
                },
                onError: (errors) =>
                    console.error('Error deleting constant:', errors),
            });
        }
    };
    return (
        <Card className="rounded-none border">
            <CardHeader>
                <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex flex-col flex-wrap">
                        <CardTitle>Constants Management</CardTitle>
                        <CardDescription>
                            Manage reusable values like categories, tags, and
                            other global settings used throughout the site.
                        </CardDescription>
                    </div>
                    <div className="w-fit">
                        <PrimaryButton
                            text={'New Constant'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Constant',
                                    formAction: 'create constant',
                                });
                                setConstantsDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-3">
                        {constants.map((constant) => (
                            <div
                                key={constant.id}
                                className="flex items-center justify-between rounded-md border p-4"
                            >
                                <div className="flex w-full items-center">
                                    <div className="grid w-full grid-cols-3 gap-4 text-start">
                                        <div className="flex w-full flex-col">
                                            <div className="text-xs text-zinc-500">
                                                Type
                                            </div>
                                            <div className="text-sm font-medium">
                                                {constant.type}
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col">
                                            <div className="text-xs text-zinc-500">
                                                Description
                                            </div>
                                            <div className="text-sm font-medium">
                                                {constant.description}
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col">
                                            <div className="text-xs text-zinc-500">
                                                Status
                                            </div>
                                            <div className="text-sm font-medium">
                                                {constant.active
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => {
                                            setSelected(constant.id);
                                            setConstantsDialogOpen(true);
                                        }}
                                    >
                                        <Pencil /> Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => {
                                            handleDelete(alert.id);
                                        }}
                                    >
                                        <Trash2 /> Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ConstantDialog
                    open={constantsDialogOpen}
                    close={handleClose}
                    selected={selected}
                    user={user}
                    formData={{ data, setData, errors, processing, reset }}
                    setDialogConfig={setDialogConfig}
                    dialogConfig={dialogConfig}
                    setSelected={setSelected}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ConfirmationDialog
                    open={isConfirmationDialogOpen}
                    onClose={() => setConfirmationDialogOpen(false)}
                    onConfirm={handleConfirm}
                    config={dialogConfig}
                />
            </CardContent>
        </Card>
    );
};

export default ConstantContent;
