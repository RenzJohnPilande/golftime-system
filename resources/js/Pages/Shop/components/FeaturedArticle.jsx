import { Link } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

const FeaturedArticle = ({ articles }) => {
    return (
        <div className="mb-6">
            <h3 className="mb-3 border-b pb-2 text-lg font-semibold">
                Latest News
            </h3>
            <div className="space-y-3">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="flex items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                    >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                            <img
                                src={`/storage/${article.image}`}
                                alt={article.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-1 text-sm font-medium">
                                {article.title}
                            </h4>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                                <CalendarIcon className="mr-1 h-3 w-3" />
                                {formatDate(article.date)}
                            </div>
                            <Link
                                href={`/news/${article.id}`}
                                className="mt-1 inline-flex items-center text-xs text-zinc-600 hover:text-zinc-800"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-3 text-center">
                <Link
                    href="/news"
                    className="text-sm text-zinc-600 hover:text-zinc-800 hover:underline"
                >
                    View all news
                </Link>
            </div>
        </div>
    );
};

export default FeaturedArticle;
