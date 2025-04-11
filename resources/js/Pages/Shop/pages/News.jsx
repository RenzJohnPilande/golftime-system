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

const news = [{}, {}, {}, {}, {}, {}, {}, {}];
const products = [{}, {}, {}, {}];

const News = () => {
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
                                <BreadcrumbPage>News</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex w-full flex-wrap py-5">
                        <div className="hidden w-1/4 flex-col flex-wrap xl:flex">
                            <div className="flex justify-between">
                                <span className="text-sm font-semibold">
                                    Latest Products
                                </span>
                                <Link href="/shop" className="text-xs">
                                    <ChevronRightCircle className="h-4 w-4" />
                                </Link>
                            </div>
                            {products.map((product, index) => (
                                <div
                                    className="items center my-2 flex w-full content-center justify-start border-b py-2 pe-2"
                                    key={index}
                                >
                                    <img
                                        src={`/images/products/FK3-White.png`}
                                        alt="FK3"
                                        className="w-32"
                                    />
                                    <div className="text-justified ms-2 flex flex-wrap content-center text-pretty text-sm">
                                        <span className="font-semibold">
                                            FK3
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex w-full flex-col xl:w-3/4">
                            <div className="flex grid w-full grid-cols-1 flex-wrap gap-4 px-4 md:grid-cols-2 xl:grid-cols-3">
                                {news.map((event, index) => (
                                    <Link
                                        href={`/news/${event.id}`}
                                        key={index}
                                        className="border"
                                    >
                                        <div className="my-0 flex w-full flex-col flex-wrap content-center justify-start rounded p-3 hover:shadow-lg">
                                            <img
                                                src={`/images/news/4th PSI Golf Cup.jpg`}
                                                alt="Product Picture"
                                                className="mx-auto my-2 h-48 w-full object-cover"
                                            />
                                            <div className="my-2 flex h-32 w-full flex-col flex-wrap justify-start">
                                                <span className="my-1 text-[18px]">
                                                    {event.name}
                                                </span>
                                                <span className="text-xs text-zinc-500">
                                                    {event.date}
                                                </span>
                                                <p className="my-2 line-clamp-2 text-justify text-xs text-zinc-900">
                                                    {event.description}
                                                </p>
                                            </div>
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

export default News;
