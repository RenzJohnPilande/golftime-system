import FileInput from '@/components/FileInput';
import MultipleInput from '@/components/MultipleInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import InputError from '../../../components/InputError';
import InputLabel from '../../../components/InputLabel';
import PrimaryButton from '../../../components/PrimaryButton';
import TextInput from '../../../components/TextInput';

const ProductDialog = ({
    open,
    close,
    selected,
    formData,
    setDialogConfig,
    setConfirmationDialogOpen,
}) => {
    const { data, setData, errors, reset } = formData;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selected && open) {
            setLoading(true);
            axios
                .get(route('products.show', { id: selected }))
                .then((response) => {
                    setData({
                        name: response.data.name ?? '',
                        code: response.data.code ?? '',
                        description: response.data.description ?? '',
                        price: response.data.price ?? '',
                        thumbnail: response.data.thumbnail ?? '',
                        images: response.data.images ?? [],
                        categories: response.data.categories ?? [],
                        materials: response.data.materials ?? [],
                        sizes: response.data.sizes ?? [],
                        colors: response.data.colors ?? [],
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                });
        } else if (!selected) {
            reset();
        }
    }, [selected, open]);

    const submit = (e) => {
        e.preventDefault();

        setDialogConfig({
            title: selected ? 'Update Product' : 'Create New Product',
            message: selected
                ? 'Are you done modifying this product? The details can be modified again later.'
                : 'Are you done creating this product? The details can be modified later.',
            formAction: selected ? 'update product' : 'create product',
        });
        setConfirmationDialogOpen(true);
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-h-[800px] max-w-sm overflow-auto rounded-lg md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-base capitalize">
                        {selected ? 'Update Product' : 'Create New Product'}
                    </DialogTitle>
                </DialogHeader>
                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading product data...
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="flex w-full flex-wrap gap-4">
                            {/* Name */}
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="name"
                                    value="Product Name"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />
                                {errors.name && (
                                    <InputError className="mt-2">
                                        {errors.name}
                                    </InputError>
                                )}
                            </div>

                            {/* Description */}
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                                <TextInput
                                    type="textarea"
                                    id="description"
                                    name="description"
                                    className="mt-1 block max-h-32 min-h-28 w-full border px-2 py-2 text-sm shadow"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows="3"
                                />
                                {errors.description && (
                                    <InputError className="mt-2">
                                        {errors.description}
                                    </InputError>
                                )}
                            </div>

                            <div className="grid w-full grid-cols-2 gap-4">
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="code"
                                        value="Product Code"
                                    />
                                    <TextInput
                                        id="code"
                                        name="code"
                                        className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData('code', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.code && (
                                        <InputError className="mt-2">
                                            {errors.code}
                                        </InputError>
                                    )}
                                </div>
                                <div className="w-full">
                                    <InputLabel htmlFor="price" value="Price" />
                                    <TextInput
                                        id="price"
                                        name="price"
                                        className="mt-1 block w-full border px-2 py-2 text-sm shadow"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.price && (
                                        <InputError className="mt-2">
                                            {errors.price}
                                        </InputError>
                                    )}
                                </div>
                            </div>

                            {!selected && (
                                <>
                                    {/* Thumbnail */}
                                    <div className="w-full">
                                        <FileInput
                                            id="thumbnail"
                                            name="thumbnail"
                                            label="Thumbnail (Upload Image)"
                                            onChange={(e) =>
                                                setData(
                                                    'thumbnail',
                                                    e.target.files[0],
                                                )
                                            }
                                            error={errors.thumbnail}
                                        />
                                    </div>

                                    {/* Images */}
                                    <div className="w-full">
                                        <FileInput
                                            id="images"
                                            name="images"
                                            label="Product Images"
                                            multiple
                                            onChange={(e) =>
                                                setData(
                                                    'images',
                                                    Array.from(e.target.files),
                                                )
                                            }
                                            error={errors.images}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Categories */}
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="categories"
                                    value="Categories"
                                />
                                <MultipleInput
                                    id="categories"
                                    name="categories"
                                    className="mt-1 block w-full capitalize"
                                    icon={<RxCrossCircled />}
                                    value={data.categories}
                                    onChange={(newCategories) =>
                                        setData('categories', newCategories)
                                    }
                                />
                                {errors.categories && (
                                    <InputError className="mt-2">
                                        {errors.categories}
                                    </InputError>
                                )}
                            </div>

                            {/* Materials */}
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="materials"
                                    value="Material(s)"
                                />
                                <MultipleInput
                                    id="materials"
                                    name="materials"
                                    className="mt-1 block w-full capitalize"
                                    icon={<RxCrossCircled />}
                                    value={data.materials}
                                    onChange={(newMaterials) =>
                                        setData('materials', newMaterials)
                                    }
                                />
                                {errors.materials && (
                                    <InputError className="mt-2">
                                        {errors.materials}
                                    </InputError>
                                )}
                            </div>

                            {/* Sizes */}
                            <div className="w-full">
                                <InputLabel htmlFor="sizes" value="Size(s)" />
                                <MultipleInput
                                    id="sizes"
                                    name="sizes"
                                    className="mt-1 block w-full uppercase"
                                    icon={<RxCrossCircled />}
                                    value={data.sizes}
                                    onChange={(newSizes) =>
                                        setData('sizes', newSizes)
                                    }
                                />
                                {errors.sizes && (
                                    <InputError className="mt-2">
                                        {errors.sizes}
                                    </InputError>
                                )}
                            </div>

                            {/* Colors */}
                            <div className="w-full">
                                <InputLabel htmlFor="colors" value="Color(s)" />
                                <MultipleInput
                                    id="colors"
                                    name="colors"
                                    className="mt-1 block w-full capitalize"
                                    icon={<RxCrossCircled />}
                                    value={data.colors}
                                    onChange={(newColors) =>
                                        setData('colors', newColors)
                                    }
                                />
                                {errors.colors && (
                                    <InputError className="mt-2">
                                        {errors.colors}
                                    </InputError>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex w-full flex-wrap justify-end gap-2">
                                <PrimaryButton
                                    text="Cancel"
                                    type="button"
                                    style={{
                                        wrapper:
                                            'border text-zinc-800 hover:bg-zinc-500 hover:text-white',
                                        text: 'capitalize text-sm',
                                    }}
                                    onClick={() => {
                                        reset();
                                        close();
                                    }}
                                />
                                <PrimaryButton
                                    type="submit"
                                    text={selected ? 'Save' : 'Submit'}
                                    style={{
                                        wrapper:
                                            'border bg-zinc-800 hover:bg-zinc-600 text-white',
                                        text: 'capitalize text-sm',
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ProductDialog;
