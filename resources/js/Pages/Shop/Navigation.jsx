import { Link, router } from '@inertiajs/react';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = ({ columns }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [productColumns, setProductColumns] = useState([]);
    const [aboutColumns, setAboutColumns] = useState([]);

    useEffect(() => {
        const products = columns.filter((col) => col.type === 'Product Column');
        const about = columns.filter((col) => col.type === 'About Column');

        setProductColumns(products);
        setAboutColumns(about);
    }, [columns]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get(
                route('shop.index'),
                { search: searchTerm },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        }
        setIsSearchOpen(false);
    };

    return (
        <header className="border-b bg-white py-2 sm:py-4">
            <div className="container mx-auto px-3 py-2 sm:px-4">
                <div className="flex items-center justify-between">
                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                            >
                                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-[80vw] max-w-[400px]"
                        >
                            <nav className="mt-8 flex flex-col gap-3">
                                <Link
                                    href="/"
                                    className="text-base font-medium transition-colors hover:text-green-700 sm:text-lg"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-base font-medium transition-colors hover:text-green-700 sm:text-lg"
                                >
                                    About Us
                                </Link>
                                {aboutColumns.length > 0 && (
                                    <div className="flex w-full flex-col gap-2 px-3">
                                        {aboutColumns.map((item, index) => (
                                            <Link
                                                href={item.value}
                                                key={index}
                                                className="text-sm font-medium transition-colors hover:text-green-700"
                                            >
                                                {item.description}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                <Link
                                    href="/products"
                                    className="text-base font-medium transition-colors hover:text-green-700 sm:text-lg"
                                >
                                    Product
                                </Link>
                                {productColumns.length > 0 && (
                                    <div className="flex w-full flex-col gap-2 px-3">
                                        {productColumns.map((item, index) => (
                                            <Link
                                                href={item.value}
                                                key={index}
                                                className="text-sm font-medium transition-colors hover:text-green-700"
                                            >
                                                {item.description}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                <Link
                                    href="/events"
                                    className="text-base font-medium transition-colors hover:text-green-700 sm:text-lg"
                                >
                                    News
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-base font-medium transition-colors hover:text-green-700 sm:text-lg"
                                >
                                    Contact Us
                                </Link>

                                {/* Mobile Search */}
                                <div className="mt-4 border-t pt-4">
                                    <form
                                        onSubmit={handleSearchSubmit}
                                        className="flex items-center"
                                    >
                                        <Input
                                            type="search"
                                            placeholder="Search products..."
                                            className="mr-2"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                        <Button
                                            type="submit"
                                            size="sm"
                                            variant="outline"
                                        >
                                            <Search className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            src="/images/GolfTimeLogo.png"
                            alt="Golftime Logo"
                            className="h-8 w-auto sm:h-10 md:h-12"
                        />
                        <span className="ml-2 truncate text-sm font-bold uppercase sm:text-base md:text-xl">
                            Golf time corp
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-1 lg:flex xl:space-x-6">
                        <div className="px-2 text-center xl:w-[100px] xl:px-0">
                            <Link
                                href="/"
                                className="text-sm font-medium text-black underline-offset-4 transition-colors hover:text-green-700 hover:underline xl:text-base"
                            >
                                Home
                            </Link>
                        </div>
                        <div className="px-2 text-center xl:w-[100px] xl:px-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-sm font-medium text-black transition-colors hover:text-green-700 xl:text-base"
                                    >
                                        About Us
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center">
                                    {aboutColumns.map((item, index) => (
                                        <DropdownMenuItem key={index} asChild>
                                            <Link href={item.value}>
                                                {item.description}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="px-2 text-center xl:w-[100px] xl:px-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-sm font-medium text-black transition-colors hover:text-green-700 xl:text-base"
                                    >
                                        Product
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center">
                                    <DropdownMenuItem asChild>
                                        <Link href="/shop">All</Link>
                                    </DropdownMenuItem>
                                    {productColumns.map((item, index) => (
                                        <DropdownMenuItem key={index} asChild>
                                            <Link href={item.value}>
                                                {item.description}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="px-2 text-center xl:w-[100px] xl:px-0">
                            <Link
                                href="/news"
                                className="text-sm font-medium text-black underline-offset-4 transition-colors hover:text-green-700 hover:underline xl:text-base"
                            >
                                News
                            </Link>
                        </div>
                        <div className="px-2 text-center xl:w-[100px] xl:px-0">
                            <Link
                                href="/contact"
                                className="text-sm font-medium text-black underline-offset-4 transition-colors hover:text-green-700 hover:underline xl:text-base"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </nav>

                    {/* Search and Cart */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {isSearchOpen ? (
                            <form
                                onSubmit={handleSearchSubmit}
                                className="flex items-center"
                            >
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="mr-2 w-[120px] sm:w-[200px]"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    autoFocus
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="h-8 w-8 sm:h-10 sm:w-10"
                                >
                                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="sr-only">
                                        Close search
                                    </span>
                                </Button>
                            </form>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsSearchOpen(true)}
                                    className="h-8 w-8 sm:h-10 sm:w-10"
                                >
                                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="sr-only">Search</span>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
