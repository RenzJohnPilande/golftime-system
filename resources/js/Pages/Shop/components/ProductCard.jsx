import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const formatPrice = (price) => {
        const numPrice = Number(price) || 0;
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numPrice);
    };

    const truncateDescription = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <Link href={`/shop/item/${product.id}`} key={product.id}>
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative overflow-hidden bg-gray-100 py-2">
                    <div className="absolute bottom-2 left-2 z-10 flex gap-2">
                        {product.categories.slice(0, 2).map((category) => (
                            <Badge
                                key={category}
                                variant="outline"
                                className="bg-white/80 text-xs backdrop-blur-sm"
                            >
                                {category}
                            </Badge>
                        ))}
                    </div>
                    <img
                        src={`/public/${product.thumbnail}`}
                        alt={product.name}
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <CardContent className="p-4">
                    <h3 className="mb-1 line-clamp-1 text-lg font-semibold">
                        {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                            {formatPrice(product.price)}
                        </span>

                        <div className="flex -space-x-1">
                            {product.colors.slice(0, 3).map((color) => {
                                const normalizedColor = color
                                    .toLowerCase()
                                    .replace(/\s+/g, '');
                                return (
                                    <div
                                        key={color}
                                        className="h-5 w-5 rounded-full border border-gray-200"
                                        style={{
                                            backgroundColor: normalizedColor,
                                            boxShadow: '0 0 0 2px white',
                                        }}
                                        title={color}
                                    />
                                );
                            })}
                            {product.colors.length > 3 && (
                                <div
                                    className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-xs"
                                    style={{ boxShadow: '0 0 0 2px white' }}
                                >
                                    +{product.colors.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
