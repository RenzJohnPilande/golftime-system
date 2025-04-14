import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import PrimaryButton from '@/components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ProductCard from './component/ProductCard';
import ArticleCoverDialog from './dialogs/ArticleCoverDialog';
import ImagesDialog from './dialogs/ImagesDialog';
import ProductDialog from './dialogs/ProductDialog';

const Product = ({ products }) => {
    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        formAction: '',
    });
    const [thumbnailDialogOpen, setThumbnailDialogOpen] = useState(false);
    const [imagesDialogOpen, setImagesDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imagesToUpload, setImagesToUpload] = useState([]);
    const [imageUploadError, setImageUploadError] = useState(null);

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
        name: '',
        code: '',
        description: '',
        thumbnail: '',
        price: '',
        images: [],
        categories: [],
        materials: [],
        sizes: [],
        colors: [],
    });

    const {
        data: imageData,
        setData: setImageData,
        patch: patchImages,
        errors: imageErrors,
        processing: imageProcessing,
        reset: resetImageForm,
    } = useForm({
        images: [],
    });

    const {
        data: thumbnailData,
        setData: setThumbnailData,
        patch: patchThumbnail,
        errors: thumbnailErrors,
        processing: thumbnailProcessing,
        reset: resetThumbnailForm,
    } = useForm({
        thumbnail: '',
    });

    const onClose = () => {
        setProductDialogOpen(false);
        setImagesDialogOpen(false);
        setThumbnailDialogOpen(false);
        setConfirmationDialogOpen(false);
        reset();
        setSelected(null);
    };

    const handleEdit = (product) => {
        setSelected(product.id);
        setData({
            name: product.name,
            code: product.code,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            images: product.images,
            materials: product.materials,
            sizes: product.sizes,
            colors: product.colors,
        });
        setDialogConfig({
            title: 'Edit Product',
            formAction: 'update product',
        });
        setProductDialogOpen(true);
    };

    const onDelete = (id) => {
        destroy(route('products.delete', { id }), {
            onSuccess: () => {
                setSelected(null);
                onClose();
            },
            onError: (errors) =>
                console.error('Error deleting product:', errors),
        });
    };

    const handleUploadImages = (product) => {
        setSelectedProduct(product);
        setSelected(product.id);
        setImageUploadError(null);
        setImageData({ images: product.images || [] });
        setImagesDialogOpen(true);
    };

    const handleUploadThumbnail = (product) => {
        setSelectedProduct(product);
        setSelected(product.id);
        setThumbnailData({ thumbnail: product.thumbnail || '' });
        setThumbnailDialogOpen(true);
    };

    const handleConfirm = () => {
        const { formAction, data } = dialogConfig;
        if (formAction === 'create product') {
            post(route('products.store'), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'update product') {
            patch(route('products.updateDetails', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.log('Submission failed with errors:', errors),
            });
        } else if (formAction === 'delete product') {
            destroy(route('products.delete', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) =>
                    console.error('Error deleting product:', errors),
            });
        } else if (formAction === 'update images') {
            console.log(data);
            patchImages(route('products.updateImages', { id: selected }), {
                onSuccess: onClose,
                onError: (errors) => {
                    console.error('Image update failed:', errors);
                },
            });
        } else if (formAction === 'update thumbnail') {
            patchThumbnail(
                route('products.updateThumbnail', { id: selected }),
                {
                    onSuccess: onClose,
                    onError: (errors) => {
                        console.error('Thumbnail update failed:', errors);
                    },
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Products Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-end justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Products Management
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage your Products and stay organized with all the
                            details in one place.
                        </h2>
                    </div>
                    <div className="w-full md:w-auto">
                        <PrimaryButton
                            text={'new product'}
                            style={{
                                wrapper:
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-zinc-700 hover:bg-zinc-600 text-white shadow-lg',
                                text: 'capitalize text-sm md:text-xs',
                            }}
                            onClick={() => {
                                setDialogConfig({
                                    title: 'Create New Product',
                                    formAction: 'create product',
                                });
                                setProductDialogOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-wrap gap-6 pt-5">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={onDelete}
                            onUploadThumbnail={handleUploadThumbnail}
                            onUploadImages={handleUploadImages}
                        />
                    ))}
                </div>

                <ProductDialog
                    open={productDialogOpen}
                    close={onClose}
                    selected={selected}
                    user={user}
                    formData={{ data, setData, errors, processing, reset }}
                    setDialogConfig={setDialogConfig}
                    setSelected={setSelected}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ArticleCoverDialog
                    open={thumbnailDialogOpen}
                    close={() => setThumbnailDialogOpen(false)}
                    selected={selectedProduct}
                    formData={{
                        data: thumbnailData,
                        setData: setThumbnailData,
                        errors: thumbnailErrors,
                        processing: thumbnailProcessing,
                        reset: resetThumbnailForm,
                    }}
                    setDialogConfig={setDialogConfig}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ImagesDialog
                    open={imagesDialogOpen}
                    close={onClose}
                    selected={selectedProduct}
                    formData={{
                        data: imageData,
                        setData: setImageData,
                        errors: imageErrors,
                        processing: imageProcessing,
                        reset: resetImageForm,
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
            </div>
        </AuthenticatedLayout>
    );
};

export default Product;
