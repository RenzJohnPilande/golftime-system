import ShopLayout from '@/Layouts/ShopLayout';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
const ProductDetail = ({ product, alerts, columns }) => {
    const breadcrumbs = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Shop',
            href: '/shop',
        },
    ];

    const matchingColumn = columns.find((column) =>
        product.categories.includes(column.value.split('/').pop()),
    );

    if (matchingColumn) {
        breadcrumbs.push({
            name: matchingColumn.description,
            href: matchingColumn.value,
        });
    }

    breadcrumbs.push({
        name: product.name,
    });

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);

    const formatPrice = (price) => {
        const numPrice = Number.parseInt(price);
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(numPrice);
    };
    return (
        <ShopLayout alerts={alerts} columns={columns}>
            <Head title="Shop" />
            <div className="flex w-full flex-wrap justify-center">
                <div className="container flex flex-wrap gap-5 px-5 py-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => (
                                <BreadcrumbItem key={index}>
                                    {index !== breadcrumbs.length - 1 ? (
                                        <>
                                            <BreadcrumbLink href={item.href}>
                                                {item.name}
                                            </BreadcrumbLink>
                                            <BreadcrumbSeparator />
                                        </>
                                    ) : (
                                        <BreadcrumbPage>
                                            {item.name}
                                        </BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex w-full flex-wrap py-4">
                        <div className="flex w-full flex-wrap py-5">
                            <div className="flex w-full flex-wrap">
                                <div className="flex w-full flex-wrap border-b py-1">
                                    <h1 className="text-2xl font-semibold">
                                        K&G Products
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Product Images */}
                            <div className="lg:col-span-2">
                                <div className="flex w-full flex-wrap gap-4 lg:flex-nowrap">
                                    {/* Thumbnails */}
                                    <div className="order-2 flex flex-row items-end gap-2 lg:order-1 lg:flex-col">
                                        {product.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`flex h-16 w-16 cursor-pointer content-center items-center justify-center overflow-hidden rounded-md border-2 bg-zinc-100 ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                                                onClick={() =>
                                                    setSelectedImage(index)
                                                }
                                            >
                                                <img
                                                    src={`/public/${image}`}
                                                    alt={`${product.name} thumbnail ${index + 1}`}
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Main Image */}
                                    <div className="order-1 md:col-span-4 lg:order-2">
                                        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-100">
                                            <img
                                                src={`/public/${product.images[selectedImage]}`}
                                                alt={product.name}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        {product.name}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        Product Code: {product.code}
                                    </p>
                                </div>

                                <div className="flex items-baseline">
                                    <span className="text-2xl font-bold">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>

                                <Separator />

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {product.categories.map(
                                        (category, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                                className="capitalize"
                                            >
                                                {category}
                                            </Badge>
                                        ),
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-medium">
                                        Description
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Materials */}
                                <div>
                                    <h3 className="text-lg font-medium">
                                        Materials
                                    </h3>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {product.materials.map(
                                            (material, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="capitalize"
                                                >
                                                    {material}
                                                </Badge>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* Size Selection */}
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium">
                                            Size
                                        </h3>
                                    </div>
                                    <RadioGroup
                                        className="mt-2 flex flex-wrap gap-2"
                                        value={selectedSize}
                                        onValueChange={setSelectedSize}
                                    >
                                        {product.sizes.map((size) => (
                                            <div
                                                key={size}
                                                className="flex items-center space-x-2"
                                            >
                                                <RadioGroupItem
                                                    value={size}
                                                    id={`size-${size}`}
                                                    className="peer sr-only"
                                                />
                                                <Label
                                                    htmlFor={`size-${size}`}
                                                    className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium uppercase hover:bg-gray-50"
                                                >
                                                    {size}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                {/* Color Selection */}
                                <div>
                                    <h3 className="text-lg font-medium">
                                        Color
                                    </h3>
                                    <RadioGroup
                                        className="mt-2 flex flex-wrap gap-2"
                                        value={selectedColor}
                                        onValueChange={setSelectedColor}
                                    >
                                        {product.colors.map((color) => {
                                            const normalizedColor = color
                                                .toLowerCase()
                                                .replace(/\s+/g, '');
                                            return (
                                                <div
                                                    key={color}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <RadioGroupItem
                                                        value={color}
                                                        id={`color-${normalizedColor}`}
                                                        className="peer sr-only"
                                                    />
                                                    <Label
                                                        htmlFor={`color-${normalizedColor}`}
                                                        className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium capitalize hover:bg-gray-50"
                                                    >
                                                        <span
                                                            className="h-4 w-4 rounded-full border border-gray-300"
                                                            style={{
                                                                backgroundColor:
                                                                    normalizedColor,
                                                                boxShadow:
                                                                    'inset 0 0 0 1px rgba(0,0,0,0.1)',
                                                            }}
                                                        />
                                                        {color}
                                                    </Label>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default ProductDetail;
