import {
    MdDeleteOutline,
    MdOutlineArrowForward,
    MdOutlineCalendarToday,
    MdOutlineEdit,
    MdOutlineFileUpload,
    MdOutlineLocationOn,
    MdOutlineRemoveRedEye,
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
            <div className="flex flex-col md:h-64 md:flex-row">
                <div className="relative h-56 w-full md:h-auto md:w-2/5 lg:w-1/3">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <img
                        src={`storage/${article.image}`}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {onUploadThumbnail && (
                        <button
                            onClick={() => onUploadThumbnail(article)}
                            className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-md bg-black/80 px-3 py-1.5 text-xs text-white transition-colors hover:bg-black"
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
                <div className="flex w-full flex-col justify-between p-5 md:w-3/5 lg:w-2/3">
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-xl font-bold leading-tight md:text-2xl">
                                {article?.title || 'Article Title'}
                            </h2>
                            {(onEdit || onDelete || onView) && (
                                <div className="flex shrink-0 gap-2">
                                    {onView && (
                                        <button
                                            onClick={() => onView(article)}
                                            className="bg-muted hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                                            aria-label="Delete article"
                                        >
                                            <MdOutlineRemoveRedEye
                                                size={18}
                                                className="text-primary"
                                            />
                                        </button>
                                    )}
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(article)}
                                            className="bg-muted hover:bg-muted/80 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                                            aria-label="Edit article"
                                        >
                                            <MdOutlineEdit size={18} />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(article)}
                                            className="bg-muted hover:bg-destructive/10 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                                            aria-label="Delete article"
                                        >
                                            <MdDeleteOutline
                                                size={18}
                                                className="text-destructive"
                                            />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="text-muted-foreground mb-4 mt-3 hidden items-center gap-4 text-sm md:flex">
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
                        <p className="text-muted-foreground line-clamp-3 md:line-clamp-4">
                            {article?.content ||
                                'No content available for this article.'}
                        </p>
                    </div>
                    <div className="pt-4">
                        <button
                            className="text-primary flex items-center gap-1 text-sm font-medium transition-all hover:gap-2"
                            onClick={() => onView(article)}
                        >
                            Read more
                            <MdOutlineArrowForward size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
