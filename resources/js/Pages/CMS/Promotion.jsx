import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import PrimaryButton from '@/components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PromotionCard from './component/PromotionCard';
import PromotionCoverDialog from './dialogs/PromotionCoverDialog';
import PromotionDialog from './dialogs/PromotionDialog';
const Promotion = ({ promotions }) => {
    const [promotionDialogOpen, setPromotionDialogOpen] = useState(false);
    const [promotionCoverDialogOpen, setPromotionCoverDialogOpen] =
        useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
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
    });

    const {
        data: promotionCoverData,
        setData: setPromotionCoverData,
        patch: patchPromotionCover,
        errors: promotionCoverError,
        processing: promotionCoverProcessing,
        reset: resetPromotionCoverForm,
    } = useForm({
        image: '',
    });

    const onClose = () => {
        setPromotionDialogOpen(false);
        setConfirmationDialogOpen(false);
        setPromotionCoverDialogOpen(false);
        reset();
        setSelected(null);
    };

    const handleEdit = (promotion) => {
        setSelected(promotion.id);
        setData({
            title: promotion.title,
            description: promotion.description,
        });
        setDialogConfig({
            title: 'Update Promotion',
            formAction: 'update promotion',
        });
        setPromotionDialogOpen(true);
    };

    const handleDelete = (id) => {
        setSelected(id);
        setDialogConfig({
            title: 'Delete Promotion',
            formAction: 'delete promotion',
            message:
                'Are you sure you want to delete this promotion? This action cannot be undone.',
        });
        setConfirmationDialogOpen(true);
    };

    const handleUploadThumbnail = (promotion) => {
        setSelectedPromotion(promotion);
        setSelected(promotion.id);
        setPromotionCoverData({ image: promotion.image || '' });
        setPromotionCoverDialogOpen(true);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
        if (formAction === 'create promotion') {
            post(route('promotioncms.store'), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update promotion') {
            console.log(data);
            patch(route('promotioncms.update', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update image') {
            patchImage(route('promotioncms.updateImage', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) => {
                    console.error('Cover Image update failed:', errors);
                },
            });
        } else if (formAction === 'delete promotion') {
            destroy(route('promotioncms.delete', { id: selected }), {
                onSuccess: () => {
                    setSelected(null);
                    onClose();
                },
                onError: (errors) =>
                    console.error('Error deleting article:', errors),
            });
        } else if (formAction === 'update cover') {
            patchPromotionCover(
                route('promotioncms.updateCover', { id: selected }),
                {
                    onSuccess: onClose,
                    onError: (errors) => {
                        console.error('Cover Image update failed:', errors);
                    },
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Promotions Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-end justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Promotions Management
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage your Promotions and stay organized with all
                            the details in one place.
                        </h2>
                    </div>
                    <div className="w-full md:w-auto">
                        <PrimaryButton
                            text={'new promotion'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Promotion',
                                    formAction: 'create promotion',
                                });
                                setPromotionDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-wrap gap-4 py-4">
                    {promotions.map((promotion) => (
                        <PromotionCard
                            key={promotion.id}
                            promotion={promotion}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onUploadThumbnail={handleUploadThumbnail}
                        />
                    ))}
                </div>
                <PromotionDialog
                    open={promotionDialogOpen}
                    close={onClose}
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

                <PromotionCoverDialog
                    open={promotionCoverDialogOpen}
                    close={() => setPromotionCoverDialogOpen(false)}
                    selected={selectedPromotion}
                    formData={{
                        data: promotionCoverData,
                        setData: setPromotionCoverData,
                        errors: promotionCoverError,
                        processing: promotionCoverProcessing,
                        reset: resetPromotionCoverForm,
                    }}
                    setDialogConfig={setDialogConfig}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Promotion;
