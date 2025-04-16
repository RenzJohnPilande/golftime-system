import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ProfileCard from './component/ProfileCard';
import AboutDialog from './dialogs/AboutDialog';
const AboutCMS = ({ sections }) => {
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
    console.log(sections);
    return (
        <AuthenticatedLayout>
            <Head title="Content Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-end justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Content Management
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Update your company's profile, mission, and vision
                            to ensure visitors understand who you are and what
                            you stand for.
                        </h2>
                    </div>
                </div>
                <div className="flex w-full flex-wrap gap-4 py-4">
                    {sections.map((item, index) => (
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
            </div>
        </AuthenticatedLayout>
    );
};

export default AboutCMS;
