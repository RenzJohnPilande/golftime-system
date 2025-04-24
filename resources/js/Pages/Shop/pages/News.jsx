import ShopLayout from '@/Layouts/ShopLayout';
import Pagination from '@/components/Pagination';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Head, router, usePage } from '@inertiajs/react';
import ArticleCard from '../components/ArticleCard';
import FeaturedProducts from '../components/FeaturedProducts';

const News = ({ articles, products, alerts, columns }) => {
    const { url } = usePage();
    const handlePageChange = (page) => {
        router.get(url.split('?')[0], { page }, { preserveScroll: true });
    };
    return (
        <ShopLayout alerts={alerts} columns={columns}>
            <Head title="GolfTime Corp - News" />
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
                            <FeaturedProducts products={products} />
                        </div>
                        <div className="flex w-full flex-col xl:w-3/4">
                            <div className="grid w-full grid-cols-1 flex-wrap gap-4 px-4 md:grid-cols-2 xl:grid-cols-3">
                                {articles.data.map((article, index) => (
                                    <ArticleCard article={article} />
                                ))}
                            </div>
                            <Pagination
                                currentPage={articles.current_page}
                                totalPages={articles.last_page}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default News;
