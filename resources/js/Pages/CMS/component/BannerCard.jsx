import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ExternalLink, Pencil, Trash2, Upload } from 'lucide-react';

const BannerCard = ({ banner, onEdit, onDelete, onUploadImage }) => {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            {/* Banner Background Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={`/storage/${banner.background}`}
                    alt={`${banner.title} background`}
                    className="h-full w-full object-cover"
                />

                {/* Overlay Banner Image (if exists) */}
                {banner.image && (
                    <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 transform">
                        <img
                            src={`/storage/${banner.image}`}
                            alt={`${banner.title} overlay`}
                            className="aspect-square w-auto max-w-full object-contain"
                        />
                    </div>
                )}
            </div>

            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{banner.title}</CardTitle>
                    {banner.link && (
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                        >
                            <ExternalLink className="h-3 w-3" />
                            <span className="text-xs">{banner.link}</span>
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                    {banner.description}
                </p>
            </CardContent>

            <CardFooter className="bg-muted/20 flex justify-between gap-2 border-t p-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onEdit(banner)}
                >
                    <Pencil className="mr-1 h-3 w-3" /> Edit
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onUploadImage(banner)}
                >
                    <Upload className="mr-1 h-3 w-3" /> Images
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 text-white"
                    onClick={() => onDelete(banner.id)}
                >
                    <Trash2 className="mr-1 h-3 w-3" /> Delete
                </Button>
            </CardFooter>
        </Card>
    );
};

export default BannerCard;
