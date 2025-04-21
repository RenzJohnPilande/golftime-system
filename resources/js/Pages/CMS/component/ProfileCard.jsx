import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil } from 'lucide-react';

const ProfileCard = ({ content, onEdit }) => {
    return (
        <Card className="w-full overflow-hidden">
            <div className="flex w-full flex-col md:flex-row">
                <CardContent className="flex-1 p-4">
                    <div className="flex w-full flex-wrap content-center">
                        <div className="flex w-full flex-wrap gap-2">
                            <div className="flex w-full flex-wrap content-center items-center justify-between">
                                <h3 className="text-base font-bold capitalize">
                                    {content.section_type}
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(content)}
                                >
                                    <Pencil /> Edit
                                </Button>
                            </div>
                            <p className="w-full text-sm capitalize text-gray-500">
                                {content.content}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default ProfileCard;
