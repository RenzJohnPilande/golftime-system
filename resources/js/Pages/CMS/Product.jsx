import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import Pagination from '@/components/Pagination';
import PrimaryButton from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductCard from './component/ProductCard';
import ImagesDialog from './dialogs/ImagesDialog';
import ProductDialog from './dialogs/ProductDialog';
import ThumbnailDialog from './dialogs/ThumbnailDialog';
import ViewProductDialog from './dialogs/ViewProductDialog';

const Product = ({ products, categories }) => {
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
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
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
        setViewDialogOpen(false);
        setImagesDialogOpen(false);
        setThumbnailDialogOpen(false);
        setConfirmationDialogOpen(false);
        reset();
        setSelected(null);
    };

    const handleView = (product) => {
        setSelected(product.id);
        setViewDialogOpen(true);
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

    const onDelete = (product) => {
        setSelected(product.id);
        setDialogConfig({
            title: 'Delete Product',
            message: `Are you sure you want to delete the product ${product.name}? This action cannot be undone.`,
            formAction: 'delete product',
        });
        setConfirmationDialogOpen(true);
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
                onSuccess: () => {
                    setSelected(null);
                    onClose();
                },
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
    const { url } = usePage();
    const handlePageChange = (page) => {
        router.get(url.split('?')[0], { page }, { preserveScroll: true });
    };

    // Search
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get(
                route('products.index'),
                { search: searchTerm },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Products Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap gap-2 bg-zinc-50 p-5">
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
                                    'flex flex-wrap w-full justify-center text-center transition-all duration-50 bg-gray-700 hover:bg-gray-600 text-white shadow-lg',
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
                <div className="flex w-full flex-wrap">
                    <div className="flex w-full flex-wrap items-end justify-between gap-2 md:flex-nowrap">
                        <h1 className="w-full text-lg font-bold capitalize">
                            Product List
                        </h1>
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex w-full items-center justify-end gap-2 pb-2"
                        >
                            <Input
                                type="search"
                                placeholder="Search"
                                className="w-full md:max-w-[200px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                            <Button
                                variant="outline"
                                type="submit"
                                className="bg-gray-700 text-white hover:bg-gray-600 hover:text-white"
                            >
                                <Search />
                            </Button>
                        </form>
                    </div>
                    <div className="grid w-full grow grid-cols-1 flex-wrap gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                        {products.data.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={onDelete}
                                onUploadThumbnail={handleUploadThumbnail}
                                onUploadImages={handleUploadImages}
                            />
                        ))}
                    </div>
                    <Pagination
                        currentPage={products.current_page}
                        totalPages={products.last_page}
                        onPageChange={handlePageChange}
                    />
                </div>

                <ProductDialog
                    open={productDialogOpen}
                    close={onClose}
                    selected={selected}
                    categories={categories}
                    user={user}
                    formData={{ data, setData, errors, processing, reset }}
                    setDialogConfig={setDialogConfig}
                    setSelected={setSelected}
                    setConfirmationDialogOpen={setConfirmationDialogOpen}
                />
                <ThumbnailDialog
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
                <ViewProductDialog
                    open={viewDialogOpen}
                    close={onClose}
                    selected={selected}
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
