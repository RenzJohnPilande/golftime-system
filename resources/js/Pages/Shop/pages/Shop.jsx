import ShopLayout from '@/Layouts/ShopLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Head, Link } from '@inertiajs/react';
import FeaturedArticle from '../components/FeaturedArticle';
import ProductCard from '../components/ProductCard';

const Shop = ({ products, articles }) => {
    console.log(products, articles);
    return (
        <ShopLayout>
            <Head title="GolfTime Corp - Shop" />
            <div className="flex w-full flex-wrap justify-center">
                <div className="container flex flex-wrap gap-5 px-5 py-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/shop">
                                    Shop
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>All</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex w-full flex-wrap py-5">
                        <div className="hidden w-1/4 flex-wrap content-start justify-center lg:flex">
                            <div className="my-2 flex w-full flex-col flex-wrap">
                                <Link
                                    href="/shop/men"
                                    className="my-2 text-xs font-semibold uppercase"
                                >
                                    Men
                                </Link>
                                <Link
                                    href="/shop/women"
                                    className="my-2 text-xs font-semibold uppercase"
                                >
                                    Women
                                </Link>
                                <Link
                                    href="/shop/kids"
                                    className="my-2 text-xs font-semibold uppercase"
                                >
                                    Kids
                                </Link>
                                <Link
                                    href="/shop/bags"
                                    className="my-2 text-xs font-semibold uppercase"
                                >
                                    Bags
                                </Link>
                                <Link
                                    href="/shop/accessories"
                                    className="my-2 text-xs font-semibold uppercase"
                                >
                                    Accessories
                                </Link>
                            </div>
                            <div className="my-4 flex w-full flex-col flex-wrap">
                                <FeaturedArticle articles={articles} />
                            </div>
                        </div>
                        <div className="flex w-full flex-col px-4 md:w-3/4">
                            <div className="flex w-full flex-wrap border-b py-1">
                                <h1 className="text-2xl font-semibold">
                                    K&G Products
                                </h1>
                            </div>
                            <div className="my-2 flex w-full flex-wrap">
                                <span className="text-sm font-semibold">
                                    {products.length + ' '}Products
                                </span>
                            </div>
                            <div className="flex grid w-full grid-cols-1 flex-wrap gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {products.map((product) => (
                                    <ProductCard product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default Shop;
