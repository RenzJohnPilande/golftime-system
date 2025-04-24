import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import ContactDialog from '../dialogs/ContactDialog';
const ContactContent = ({ contactInfos }) => {
    const [contactDialogOpen, setContactDialogOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
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

    const { data, setData, errors, processing, reset, patch } = useForm({
        address: '',
        email: '',
        phone: '',
        business_hours: '',
    });

    const handleClose = () => {
        setContactDialogOpen(false);
        reset();
    };

    const handleConfirm = () => {
        patch(route('contactcms.update', { id: selected }), {
            onSuccess: handleClose,
            onError: (errors) =>
                console.log('Submission failed with errors:', errors),
        });
    };
    return (
        <Card className="rounded-none border">
            <CardHeader>
                <CardTitle>Contact Info Management</CardTitle>
                <CardDescription>
                    Edit your website’s contact details including email, phone,
                    and address.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-wrap gap-4">
                    <div className="flex w-full flex-wrap rounded border p-4">
                        <div className="flex grow flex-col gap-2">
                            <div className="flex flex-wrap items-end justify-between">
                                <h1 className="flex text-sm font-medium">
                                    Address
                                </h1>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex"
                                    onClick={() => {
                                        setDialogConfig({
                                            title: 'Update Address',
                                            message:
                                                'Are you sure you want to update the address?',
                                            formAction: 'update address',
                                        });
                                        setContactDialogOpen(true);
                                        setSelected(contactInfos[0].id);
                                    }}
                                >
                                    <Pencil /> Edit
                                </Button>
                            </div>
                            <p className="text-sm font-light">
                                {contactInfos[0].address}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full flex-wrap rounded border p-4">
                        <div className="flex grow flex-col gap-2">
                            <div className="flex flex-wrap items-end justify-between">
                                <h1 className="text-sm font-medium">Email</h1>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex"
                                    onClick={() => {
                                        setDialogConfig({
                                            title: 'Update Email',
                                            formAction: 'update email',
                                            message:
                                                'Are you sure you want to update the email?',
                                        });
                                        setContactDialogOpen(true);
                                        setSelected(contactInfos[0].id);
                                    }}
                                >
                                    <Pencil /> Edit
                                </Button>
                            </div>

                            <p className="text-sm font-light">
                                {contactInfos[0].email}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full flex-wrap rounded border p-4">
                        <div className="flex grow flex-col">
                            <div className="flex flex-wrap items-end justify-between">
                                <h1 className="text-sm font-medium">Phone</h1>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex"
                                    onClick={() => {
                                        setDialogConfig({
                                            title: 'Update Phone',
                                            formAction: 'update phone',
                                            message:
                                                'Are you sure you want to update the phone number?',
                                        });
                                        setContactDialogOpen(true);
                                        setSelected(contactInfos[0].id);
                                    }}
                                >
                                    <Pencil /> Edit
                                </Button>
                            </div>

                            <p className="text-sm font-light">
                                {contactInfos[0].phone}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full flex-wrap rounded border p-4">
                        <div className="flex grow flex-col">
                            <div className="flex flex-wrap items-end justify-between">
                                <h1 className="text-sm font-medium">
                                    Business Hours
                                </h1>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex"
                                    onClick={() => {
                                        setDialogConfig({
                                            title: 'Update Business Hours',
                                            formAction: 'update business_hours',
                                            message:
                                                'Are you sure you want to update the business hours?',
                                        });
                                        setContactDialogOpen(true);
                                        setSelected(contactInfos[0].id);
                                    }}
                                >
                                    <Pencil /> Edit
                                </Button>
                            </div>

                            <p className="text-sm font-light">
                                {contactInfos[0].business_hours}
                            </p>
                        </div>
                    </div>
                </div>
                <ContactDialog
                    open={contactDialogOpen}
                    close={handleClose}
                    selected={selected}
                    user={user}
                    formData={{ data, setData, errors, processing, reset }}
                    dialogConfig={dialogConfig}
                    setDialogConfig={setDialogConfig}
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

export default ContactContent;
