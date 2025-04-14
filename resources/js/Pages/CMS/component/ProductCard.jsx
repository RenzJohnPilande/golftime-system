import { Button } from '@/components/ui/button';
import {
    Calendar,
    Edit,
    Image,
    ImageIcon,
    Images,
    Tag,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { MdLayers, MdPalette } from 'react-icons/md';
import { RxRulerSquare } from 'react-icons/rx';

const ProductCard = ({
    product,
    onEdit,
    onDelete,
    onUploadThumbnail,
    onUploadImages,
}) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
            {/* Header with ID and timestamps */}
            <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-1">
                <div className="flex items-center">
                    <span className="font-semibold text-gray-700">
                        {product.code}
                    </span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {formatDate(product.created_at)}
                    </span>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(product)}
                        className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-green-50 hover:text-green-600"
                        title="Edit product"
                    >
                        <Edit className="h-4 w-4" />
                    </button>

                    <button
                        onClick={() => onDelete(product.id)}
                        className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete product"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="h-fit w-full flex-shrink-0 p-4 md:w-[260px] md:max-w-[260px]">
                    <div
                        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <img
                                src={`storage/${product.thumbnail}`}
                                className={`text-gray-400 ${isHovered ? 'opacity-60' : ''}`}
                            />
                            {isHovered && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm transition-all duration-300">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="flex w-48 items-center justify-center gap-2"
                                        onClick={() =>
                                            onUploadThumbnail(product)
                                        }
                                    >
                                        <Image size={16} />
                                        <span>Change Thumbnail</span>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="flex w-48 items-center justify-center gap-2"
                                        onClick={() => onUploadImages(product)}
                                    >
                                        <Images size={16} />
                                        <span>Change Images</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                        {product.images && product.images.length > 0 && (
                            <div className="absolute bottom-2 right-2 flex items-center rounded-md bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                                <ImageIcon className="mr-1 h-3 w-3" />
                                {product.images.length}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-grow border-t p-4 md:border-l md:border-t-0">
                    <div className="flex w-full justify-between">
                        <h2 className="mb-2 text-lg font-medium text-gray-800">
                            {product.name}
                        </h2>
                        <h2 className="mb-2 content-center rounded bg-zinc-700 px-2 text-sm font-medium text-white">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'PHP',
                            }).format(product.price)}
                        </h2>
                    </div>

                    <div className="mb-4">
                        <p className="line-clamp-2 text-sm text-gray-600">
                            {product.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        {/* Categories */}
                        <div className="rounded-md bg-gray-50 p-3">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-gray-500">
                                <Tag className="mr-1 h-3.5 w-3.5" />
                                Categories
                            </h3>
                            <div className="flex flex-wrap gap-1">
                                {product.categories &&
                                product.categories.length > 0 ? (
                                    product.categories.map(
                                        (gategory, index) => (
                                            <span
                                                key={`gategory-${index}`}
                                                className="rounded-md border bg-white px-2 py-1 text-xs capitalize"
                                            >
                                                {gategory}
                                            </span>
                                        ),
                                    )
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        No categories specified
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Materials */}
                        <div className="rounded-md bg-gray-50 p-3">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-gray-500">
                                <MdLayers />
                                Materials
                            </h3>
                            <div className="flex flex-wrap gap-1">
                                {product.materials &&
                                product.materials.length > 0 ? (
                                    product.materials.map((material, index) => (
                                        <span
                                            key={`material-${index}`}
                                            className="rounded-md border bg-white px-2 py-1 text-xs capitalize"
                                        >
                                            {material}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        No materials specified
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="rounded-md bg-gray-50 p-3">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-gray-500">
                                <RxRulerSquare />
                                Sizes
                            </h3>
                            <div className="flex flex-wrap gap-1">
                                {product.sizes && product.sizes.length > 0 ? (
                                    product.sizes.map((size, index) => (
                                        <span
                                            key={`size-${index}`}
                                            className="rounded-md border bg-white px-2 py-1 text-xs"
                                        >
                                            {size}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        No sizes specified
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="rounded-md bg-gray-50 p-3">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-gray-500">
                                <MdPalette /> Colors
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.colors && product.colors.length > 0 ? (
                                    product.colors.map((color, index) => (
                                        <span
                                            key={`color-${index}`}
                                            className="flex items-center rounded-md border bg-white text-xs"
                                        >
                                            <span className="px-2">
                                                {color}
                                            </span>
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        No colors specified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-500">
                        Last updated: {formatDate(product.updated_at)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
