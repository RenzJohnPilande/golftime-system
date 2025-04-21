import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ProfileCard from '../component/ProfileCard';
import AboutDialog from '../dialogs/AboutDialog';
const AboutContent = ({ aboutInfos }) => {
    const [aboutDialogOpen, setAboutDialogOpen] = useState(false);
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

    const { data, setData, errors, processing, reset, patch } = useForm({
        section_type: '',
        content: '',
    });

    const handleEdit = (content) => {
        setSelected(content.id);
        setData({
            section_type: content.section_type,
            content: content.content,
        });
        setDialogConfig({
            title: 'Update Content',
            formAction: 'update content',
        });
        setAboutDialogOpen(true);
    };

    const handleClose = () => {
        setAboutDialogOpen(false);
        reset();
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'update content') {
            patch(route('aboutcms.update', { id: selected }), {
                onSuccess: handleClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        }
    };

    return (
        <Card className="rounded-none border">
            <CardHeader>
                <CardTitle>About Page Management</CardTitle>
                <CardDescription>
                    Update and manage your About Us page content with ease.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-wrap gap-4">
                    {aboutInfos.map((item, index) => (
                        <ProfileCard
                            content={item}
                            onEdit={handleEdit}
                            key={index}
                        />
                    ))}
                </div>
                <AboutDialog
                    open={aboutDialogOpen}
                    close={handleClose}
                    selected={selected}
                    user={user}
                    formData={{ data, setData, errors, processing, reset }}
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

export default AboutContent;
