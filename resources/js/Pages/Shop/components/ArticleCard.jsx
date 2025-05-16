import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

const ArticleCard = ({ article }) => {
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <Card
            key={article.id}
            className="flex h-full flex-col overflow-hidden rounded-none"
        >
            <div className="relative aspect-video w-full">
                <img
                    src={`/public/${article.image}`}
                    alt={article.title}
                    className="h-full w-full object-cover"
                />
            </div>
            <CardHeader className="pb-2">
                <div className="flex flex-col space-y-1.5">
                    <h3 className="line-clamp-1 text-xl font-bold">
                        {article.title}
                    </h3>
                    <div className="text-muted-foreground flex items-center text-sm">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center text-sm">
                        <MapPinIcon className="mr-1 h-4 w-4" />
                        <span className="line-clamp-1">{article.location}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-2 text-sm">
                    {article.content}
                </p>
            </CardContent>
            <CardFooter className="pt-2">
                <Link href={`/news/${article.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        Read More
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ArticleCard;
