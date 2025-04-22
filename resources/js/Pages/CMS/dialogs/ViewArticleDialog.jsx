import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CalendarIcon, FileTextIcon, MapPinIcon } from 'lucide-react';

import { useEffect, useState } from 'react';

const ViewArticleDialog = ({ open, close, selected }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const [imageError, setImageError] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const imageSrc =
        imageError || !data?.image
            ? '/placeholder.svg?height=600&width=800'
            : `storage/${data?.image}`;

    useEffect(() => {
        if (selected && open) {
            setLoading(true);
            axios
                .get(route('articles.show', { id: selected }))
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching article:', error);
                    setLoading(false);
                });
        }
    }, [selected, open]);

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="max-h-[800px] max-w-sm overflow-auto rounded-lg md:max-w-md">
                {loading ? (
                    <div className="py-8 text-center text-sm text-gray-500">
                        Loading article data...
                    </div>
                ) : (
                    <div className="flex w-full flex-wrap gap-2 overflow-hidden">
                        <div className="bg-muted/30">
                            <h1 className="text-foreground mb-3 text-2xl font-bold leading-tight">
                                {data?.title}
                            </h1>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <h3 className="font-semibold">Event Details</h3>

                            <div className="flex w-full gap-4 text-sm">
                                <div className="flex items-start gap-2">
                                    <MapPinIcon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-muted-foreground text-xs">
                                            {data?.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CalendarIcon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                                    <div>
                                        <p className="font-medium">
                                            Event Date
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {formatDate(data?.date)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full flex-wrap gap-4 overflow-hidden">
                                <div className="flex items-center gap-2">
                                    <FileTextIcon className="text-primary h-4 w-4" />
                                    <h3 className="font-semibold">
                                        Article Content
                                    </h3>
                                </div>
                                <div className="bg-muted w-full">
                                    <img
                                        src={imageSrc || '/placeholder.svg'}
                                        alt={data?.title}
                                        className="h-full w-full object-contain"
                                        onError={handleImageError}
                                    />
                                </div>
                            </div>
                            <div className="prose prose-gray dark:prose-invert max-w-none">
                                {data?.content
                                    .split('\n')
                                    .map((paragraph, index) =>
                                        paragraph.trim() ? (
                                            <p
                                                key={index}
                                                className="text-foreground mb-4 text-justify text-sm"
                                            >
                                                {paragraph}
                                            </p>
                                        ) : null,
                                    )}
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewArticleDialog;
