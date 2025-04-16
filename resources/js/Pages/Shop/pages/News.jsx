import ShopLayout from '@/Layouts/ShopLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Head } from '@inertiajs/react';
import ArticleCard from '../components/ArticleCard';
import FeaturedProducts from '../components/FeaturedProducts';

const News = ({ articles, products }) => {
    return (
        <ShopLayout>
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
                            <div className="flex grid w-full grid-cols-1 flex-wrap gap-4 px-4 md:grid-cols-2 xl:grid-cols-3">
                                {articles.map((article, index) => (
                                    <ArticleCard article={article} />
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
