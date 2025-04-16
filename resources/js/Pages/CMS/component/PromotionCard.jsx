import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MdOutlineFileUpload } from 'react-icons/md';

const PromotionCard = ({ promotion, onEdit, onDelete, onUploadThumbnail }) => {
    return (
        <Card className="h-full min-h-[160px] w-full overflow-hidden xl:h-[200px]">
            <div className="flex h-full w-full flex-col md:flex-row">
                <div className="relative h-full w-full md:w-2/5 xl:w-1/4">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <img
                        src={`/storage/${promotion.image}`}
                        alt={promotion.title}
                        className="object-fit aspect-video h-full w-full transition-transform duration-500 hover:scale-105"
                    />
                    {onUploadThumbnail && (
                        <button
                            onClick={() => onUploadThumbnail(promotion)}
                            className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-md bg-black/80 px-3 py-1.5 text-xs text-white transition-colors hover:bg-black"
                            aria-label="Upload thumbnail"
                        >
                            <MdOutlineFileUpload size={16} />
                            <span>Upload</span>
                        </button>
                    )}
                </div>
                <CardContent className="flex-1 p-4">
                    <div className="flex w-full flex-wrap content-center">
                        <div className="flex w-full justify-end space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(promotion)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onDelete(promotion.id)}
                            >
                                Delete
                            </Button>
                        </div>
                        <div className="flex w-full flex-wrap">
                            <h3 className="text-lg font-medium">
                                {promotion.title}
                            </h3>
                            <p className="mt-1 w-full text-sm capitalize text-gray-500">
                                {promotion.description}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default PromotionCard;
