import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import PrimaryButton from '@/components/PrimaryButton';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import BannerCard from '../component/BannerCard';
import BannerDialog from '../dialogs/BannerDialog';
import BannerImageUpload from '../dialogs/BannerImageUpload';
const BannerContent = ({ banners }) => {
    const [bannerDialogOpen, setBannerDialogOpen] = useState(false);
    const [bannerImageDialogOpen, setBannerImageDialogOpen] = useState(false);
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

    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset,
        patch,
        delete: destroy,
    } = useForm({
        title: '',
        description: '',
        image: '',
        background: '',
        link: '',
    });

    const {
        data: imageData,
        setData: setImageData,
        post: postImage,
        errors: errorsImage,
        processing: processingImage,
        reset: resetImage,
        patch: patchImage,
        delete: destroyImage,
    } = useForm({
        image: '',
        background: '',
    });

    const onClose = () => {
        setBannerDialogOpen(false);
        setConfirmationDialogOpen(false);
        setBannerImageDialogOpen(false);
        reset();
        setSelected(null);
    };

    const handleEdit = (banner) => {
        setSelected(banner.id);
        setData({
            title: banner.title,
            description: banner.description,
            link: banner.link,
        });
        setDialogConfig({
            title: 'Update Banner',
            formAction: 'update banner',
        });
        setBannerDialogOpen(true);
    };

    const handleDelete = (id) => {
        setSelected(id);
        setDialogConfig({
            title: 'Delete Banner',
            formAction: 'delete banner',
            message:
                'Are you sure you want to delete this banner? This action cannot be undone.',
        });
        setConfirmationDialogOpen(true);
    };

    const handleUploadImage = (banner) => {
        setSelected(banner.id);
        setData({
            image: banner.image ?? '',
            background: banner.background ?? '',
        });
        setBannerImageDialogOpen(true);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'create banner') {
            post(route('bannercms.store'), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update banner') {
            patch(route('bannercms.update', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update banner image') {
            patchImage(route('bannercms.updateImages', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) => {
                    console.error('Cover Image update failed:', errors);
                },
            });
        } else if (formAction === 'delete banner') {
            destroy(route('bannercms.delete', { id: selected }), {
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
                        <CardTitle>Banner Management</CardTitle>
                        <CardDescription>
                            Upload and manage banner visuals displayed
                            throughout the site.
                        </CardDescription>
                    </div>
                    <div className="w-fit">
                        <PrimaryButton
                            text={'Add Banner'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Banner',
                                    message: '',
                                    formAction: 'create banner',
                                });
                                setBannerDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {banners.map((banner) => (
                        <BannerCard
                            key={banner.id}
                            banner={banner}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onUploadImage={handleUploadImage}
                        />
                    ))}
                </div>
                <BannerDialog
                    open={bannerDialogOpen}
                    close={onClose}
                    selected={selected}
                    user={user}
                    formData={{ data, setData, errors, processing, reset }}
                    setDialogConfig={setDialogConfig}
                    setSelected={setSelected}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <BannerImageUpload
                    open={bannerImageDialogOpen}
                    close={() => setBannerImageDialogOpen(false)}
                    selected={selected}
                    formData={{
                        data: imageData,
                        setData: setImageData,
                        errors: errorsImage,
                        processing: processingImage,
                        reset: resetImage,
                    }}
                    setDialogConfig={setDialogConfig}
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

export default BannerContent;
