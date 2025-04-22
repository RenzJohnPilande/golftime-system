import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import {
    MdOutlineCalendarToday,
    MdOutlineFileUpload,
    MdOutlineLocationOn,
} from 'react-icons/md';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const ArticleCard = ({
    article,
    onEdit,
    onDelete,
    onView,
    onUploadThumbnail,
}) => {
    return (
        <div className="bg-card text-card-foreground w-full overflow-hidden rounded-lg border shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-wrap">
                <div className="relative w-full">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <img
                        src={`storage/${article.image}`}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {onUploadThumbnail && (
                        <button
                            onClick={() => onUploadThumbnail(article)}
                            className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-md bg-black/80 px-3 py-1.5 text-xs text-white hover:bg-black"
                            aria-label="Upload thumbnail"
                        >
                            <MdOutlineFileUpload size={16} />
                            <span>Upload</span>
                        </button>
                    )}
                    <div className="absolute bottom-4 left-4 z-20 md:hidden">
                        <span className="text-sm font-medium text-white">
                            {formatDate(article?.date)}
                        </span>
                    </div>
                </div>
                <div className="flex w-full flex-col justify-between p-5">
                    <div className="flex w-full flex-wrap">
                        <h2 className="text-sm font-bold leading-tight">
                            {article?.title || 'Article Title'}
                        </h2>
                        <div className="text-muted-foreground mb-4 mt-3 flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <MdOutlineLocationOn size={16} />
                                <span className="max-w-[200px] truncate">
                                    {article?.location ||
                                        'Location not specified'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MdOutlineCalendarToday size={16} />
                                <span>
                                    {formatDate(article?.date) ||
                                        'Date not specified'}
                                </span>
                            </div>
                        </div>
                        <div className="text-muted-foreground mb-4 mt-3 flex items-center gap-1 text-sm md:hidden">
                            <MdOutlineLocationOn size={16} />
                            <span className="truncate">
                                {article?.location || 'Location not specified'}
                            </span>
                        </div>
                    </div>
                    <div className="pt-4">
                        {(onEdit || onDelete || onView) && (
                            <div className="flex grid w-full shrink-0 grid-cols-3 flex-wrap gap-2">
                                {onView && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => onView(article)}
                                    >
                                        <Eye className="h-3 w-3" /> View
                                    </Button>
                                )}
                                {onEdit && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => onEdit(article)}
                                    >
                                        <Pencil className="h-3 w-3" /> Edit
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => onDelete(article)}
                                    >
                                        <Trash2 className="h-3 w-3" /> Delete
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
