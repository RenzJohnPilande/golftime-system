import { Link } from '@inertiajs/react';
import { ShoppingBagIcon } from 'lucide-react';

const FeaturedProducts = ({ products }) => {
    return (
        <div className="mb-6">
            <h3 className="mb-3 border-b pb-2 text-lg font-semibold">
                Featured Products
            </h3>
            <div className="space-y-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                    >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                            <img
                                src={`/public/${product.thumbnail}`}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-1 text-sm font-medium">
                                {product.name}
                            </h4>
                            <p className="text-sm font-medium">
                                ₱
                                {Number.parseInt(
                                    product.price,
                                ).toLocaleString()}
                            </p>
                            <Link
                                href={`/shop/item/${product.id}`}
                                className="mt-1 inline-flex items-center text-xs text-zinc-600 hover:text-zinc-800"
                            >
                                <ShoppingBagIcon className="mr-1 h-3 w-3" />
                                View Product
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-3 text-center">
                <Link
                    href="/shop"
                    className="text-sm text-zinc-600 underline-offset-4 hover:text-zinc-800 hover:underline"
                >
                    View all products
                </Link>
            </div>
        </div>
    );
};

export default FeaturedProducts;
