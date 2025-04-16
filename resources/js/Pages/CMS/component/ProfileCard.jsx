import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ProfileCard = ({ content, onEdit }) => {
    return (
        <Card className="h-full min-h-[160px] w-full overflow-hidden xl:h-[200px]">
            <div className="flex h-full w-full flex-col md:flex-row">
                <CardContent className="flex-1 p-4">
                    <div className="flex w-full flex-wrap content-center">
                        <div className="flex w-full flex-wrap gap-4">
                            <div className="flex w-full flex-wrap justify-between">
                                <h3 className="text-lg font-bold capitalize">
                                    {content.section_type}
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(content)}
                                >
                                    Edit
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
