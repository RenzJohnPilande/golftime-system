import ShopLayout from '@/Layouts/ShopLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@inertiajs/react';
import { ChevronRightCircle } from 'lucide-react';

const news = [{}, {}, {}, {}];
const products = [{}, {}, {}, {}, {}, {}, {}, {}];

const Shop = () => {
    return (
        <ShopLayout>
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
                                <div className="flex justify-between">
                                    <span className="text-sm font-semibold">
                                        Recent Events
                                    </span>
                                    <Link href="/news" className="text-xs">
                                        <ChevronRightCircle className="h-4 w-4" />
                                    </Link>
                                </div>
                                {news.map((article, index) => (
                                    <Link
                                        href={`/news/${article.id}`}
                                        key={index}
                                        className="items center my-2 flex w-full content-center justify-center border-b py-2 pe-2"
                                    >
                                        <img
                                            src={`/images/news/4th PSI Golf Cup.jpg`}
                                            alt="Event Image"
                                            className="w-24"
                                        />
                                        <div className="text-justified ms-2 flex w-full flex-col flex-wrap justify-center text-pretty text-xs">
                                            <span className="font-semibold">
                                                {article.name}
                                            </span>
                                            <span className="text-zinc-600">
                                                {article.date}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
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
                            <div className="flex grid w-full grid-cols-1 flex-wrap gap-4 md:grid-cols-3">
                                {products.map((product, index) => (
                                    <Link href="/" key={`${index}`}>
                                        <div className="flex w-full flex-col flex-wrap content-center justify-center rounded border hover:shadow-lg">
                                            <img
                                                src={`/images/products/FK3-White.png`}
                                                alt="Product Picture"
                                                className="my-5 w-3/4"
                                            />
                                            <span className="my-3 text-start">
                                                FK3
                                            </span>
                                        </div>
                                    </Link>
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
