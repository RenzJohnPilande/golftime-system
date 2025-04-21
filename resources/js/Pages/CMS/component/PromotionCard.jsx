import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import { MdOutlineFileUpload } from 'react-icons/md';

const PromotionCard = ({ promotion, onEdit, onUploadThumbnail }) => {
    return (
        <Card className="w-full overflow-hidden">
            <div className="flex w-full flex-col md:flex-row">
                <CardContent className="flex-1 p-4">
                    <div className="flex w-full flex-wrap content-center gap-4">
                        <div className="relative w-full">
                            <img
                                src={`/storage/${promotion.image}`}
                                alt={promotion.title}
                                className="aspect-video transition-transform duration-500 hover:scale-105"
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
                        <div className="flex w-full flex-wrap">
                            <div className="flex w-full flex-wrap items-end justify-between">
                                <h3 className="text-lg font-medium">
                                    {promotion.title}
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(promotion)}
                                >
                                    <Pencil /> Edit
                                </Button>
                            </div>
                            <p className="mt-2 line-clamp-3 w-full text-sm capitalize text-gray-500">
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
