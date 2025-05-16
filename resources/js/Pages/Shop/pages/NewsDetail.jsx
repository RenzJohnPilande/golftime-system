import ShopLayout from '@/Layouts/ShopLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Head, Link } from '@inertiajs/react';
import { Calendar, MapPin } from 'lucide-react';
import FeaturedProducts from '../components/FeaturedProducts';

const NewsDetail = ({
    article,
    relatedArticles,
    products,
    alerts,
    columns,
}) => {
    const breadcrumbs = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'News',
            href: '/news',
        },
        {
            name: article.title,
        },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Format content with line breaks
    const formattedContent = article.content
        .split('\n\n')
        .map((paragraph, index) => (
            <p key={index} className="mb-4">
                {paragraph}
            </p>
        ));
    return (
        <ShopLayout alerts={alerts} columns={columns}>
            <Head title="News" />
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
                    <div className="flex w-full flex-wrap py-5">
                        <div className="hidden w-1/4 flex-col flex-wrap xl:flex">
                            <FeaturedProducts products={products} />
                        </div>
                        <div className="flex w-full flex-col xl:w-3/4">
                            <div className="mx-auto max-w-4xl">
                                {/* Article Header */}
                                <div className="mb-8">
                                    <h1 className="mb-4 text-4xl font-bold leading-tight">
                                        {article.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {formatDate(article.date)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{article.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div className="mb-8 overflow-hidden rounded-lg">
                                    <div className="relative aspect-video w-full">
                                        <img
                                            src={`/public/${article.image}`}
                                            alt={article.title}
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-lg max-w-none">
                                    {formattedContent}
                                </div>

                                <Separator className="my-8" />

                                {/* Related Articles */}
                                <div className="mt-12">
                                    <h2 className="mb-6 text-2xl font-bold">
                                        More News
                                    </h2>
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {relatedArticles.map((news) => (
                                            <Link href={`/news/${news.id}`}>
                                                <Card
                                                    key={news}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="relative aspect-video w-full">
                                                        <img
                                                            src={`/public/${news.image}`}
                                                            alt={`Related article ${news}`}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="mb-2 font-semibold">
                                                            {news.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {formatDate(
                                                                news.date,
                                                            )}
                                                        </p>
                                                    </div>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default NewsDetail;
