import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MdLayers, MdPalette } from 'react-icons/md';
import { RxRulerSquare } from 'react-icons/rx';

const ViewProductDialog = ({ open, close, selected }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (selected && open) {
            setLoading(true);
            axios
                .get(route('products.show', { id: selected }))
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                });
        }
    }, [selected, open]);
    if (!selected) {
        return;
    }
    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="h-fit max-w-sm overflow-auto rounded-lg p-4 md:max-w-md">
                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading product data...
                    </div>
                ) : (
                    <div className="flex h-full w-full flex-wrap content-start gap-2">
                        <div className="flex w-full">
                            <h2 className="w-full text-lg font-medium text-gray-800">
                                {data?.name}
                            </h2>
                        </div>

                        <div className="relative flex h-fit w-full items-center justify-center rounded bg-gray-200">
                            <img
                                src={`/public/${data?.thumbnail}`}
                                className="h-min text-gray-400"
                            />
                            <div className="absolute bottom-4 right-8">
                                <h2 className="content-center rounded bg-zinc-700 px-2 text-sm font-medium text-white">
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'PHP',
                                    }).format(data?.price)}
                                </h2>
                            </div>
                        </div>
                        <div className="flex w-full flex-wrap gap-2">
                            <div className="mb-4">
                                <p className="line-clamp-4 text-sm text-gray-600">
                                    {data?.description}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-md bg-gray-50 p-3">
                                <h3 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-gray-500">
                                    <Tag className="mr-1 h-3.5 w-3.5" />
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-1">
                                    {data?.categories &&
                                    data?.categories.length > 0 ? (
                                        data?.categories.map(
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
                                    {data?.materials &&
                                    data?.materials.length > 0 ? (
                                        data?.materials.map(
                                            (material, index) => (
                                                <span
                                                    key={`material-${index}`}
                                                    className="rounded-md border bg-white px-2 py-1 text-xs capitalize"
                                                >
                                                    {material}
                                                </span>
                                            ),
                                        )
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
                                    {data?.sizes && data?.sizes.length > 0 ? (
                                        data?.sizes.map((size, index) => (
                                            <span
                                                key={`size-${index}`}
                                                className="rounded-md border bg-white px-2 py-1 text-xs uppercase"
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
                                    {data?.colors && data?.colors.length > 0 ? (
                                        data?.colors.map((color, index) => (
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
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewProductDialog;
