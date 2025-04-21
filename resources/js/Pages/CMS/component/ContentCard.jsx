import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
const ContentCard = ({ title, description, icon, count }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                <div className="bg-primary/10 rounded-full p-2">{icon}</div>
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
                <div className="mt-2">
                    <span className="text-2xl font-bold">{count}</span>
                    <span className="text-muted-foreground ml-1 text-xs">
                        items
                    </span>
                </div>
                <div className="mt-4">
                    <a
                        href="#"
                        className="text-primary text-sm hover:underline"
                    >
                        Manage {title}
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};

export default ContentCard;
