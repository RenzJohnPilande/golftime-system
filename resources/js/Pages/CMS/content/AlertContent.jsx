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
import AlertDialog from '../dialogs/AlertDialog';
const AlertContent = ({ alerts }) => {
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        formAction: '',
    });
    console.log(alerts);

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
        message: '',
        active: false,
    });

    const handleClose = () => {
        setAlertDialogOpen(false);
        reset();
    };

    const handleDelete = (id) => {
        setSelected(id);
        setDialogConfig({
            title: 'Delete Alert',
            formAction: 'delete alert',
            message:
                'Are you sure you want to delete this alert? This action cannot be undone.',
        });
        setConfirmationDialogOpen(true);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'create alert') {
            post(route('alertcms.store'), {
                onSuccess: handleClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update alert') {
            patch(route('alertcms.update', { id: selected }), {
                onSuccess: handleClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'delete alert') {
            destroy(route('alertcms.delete', { id: selected }), {
                onSuccess: () => {
                    setSelected(null);
                    onClose();
                },
                onError: (errors) =>
                    console.error('Error deleting article:', errors),
            });
        }
    };
    return (
        <Card className="rounded-none border">
            <CardHeader>
                <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex flex-col flex-wrap">
                        <CardTitle>Alert Management</CardTitle>
                        <CardDescription>
                            Control site-wide topbar alerts from one place.
                        </CardDescription>
                    </div>
                    <div className="w-fit">
                        <PrimaryButton
                            text={'New Alert'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Alert',
                                    message: '',
                                    formAction: 'create alert',
                                });
                                setAlertDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="flex items-center justify-between rounded-md border p-4"
                            >
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-medium">
                                            {alert.message}
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                            Status:{' '}
                                            {alert.active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => {
                                            setSelected(alert.id);
                                            setAlertDialogOpen(true);
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
                <AlertDialog
                    open={alertDialogOpen}
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

export default AlertContent;
