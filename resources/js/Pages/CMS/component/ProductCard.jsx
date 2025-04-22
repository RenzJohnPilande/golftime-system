import { Button } from '@/components/ui/button';
import { Edit, Eye, Image, ImageIcon, Images, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({
    product,
    onEdit,
    onView,
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
        <div className="h-fit overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-1">
                <div className="flex items-center">
                    <span className="font-semibold uppercase text-gray-700">
                        {product.code}
                    </span>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onView(product)}
                        className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        title="View product"
                    >
                        <Eye className="h-4 w-4" />
                    </button>
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

            <div className="flex w-full flex-wrap">
                <div className="h-fit w-full p-4">
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
                            <div className="absolute bottom-2 left-2 flex items-center rounded-md bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                                <ImageIcon className="mr-1 h-3 w-3" />
                                {product.images.length}
                            </div>
                        )}
                        <h2 className="absolute bottom-2 right-2 content-center rounded bg-zinc-700 px-2 text-sm font-medium text-white">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'PHP',
                            }).format(product.price)}
                        </h2>
                    </div>
                </div>
                <div className="flex w-full flex-wrap border-t px-4 py-2">
                    <div className="flex w-full flex-wrap">
                        <h2 className="line-clamp-1 w-full font-medium text-gray-800">
                            {product.name}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
