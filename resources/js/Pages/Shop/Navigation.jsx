import { Link } from '@inertiajs/react';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <header className="border-b bg-white py-4">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-[300px] sm:w-[400px]"
                        >
                            <nav className="mt-8 flex flex-col gap-4">
                                <Link
                                    href="/"
                                    className="text-lg font-medium transition-colors hover:text-green-700"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-lg font-medium transition-colors hover:text-green-700"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/products"
                                    className="text-lg font-medium transition-colors hover:text-green-700"
                                >
                                    Product
                                </Link>
                                <Link
                                    href="/events"
                                    className="text-lg font-medium transition-colors hover:text-green-700"
                                >
                                    News
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-lg font-medium transition-colors hover:text-green-700"
                                >
                                    Contact Us
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex content-center items-center">
                        <img
                            src="/images/GolfTimeLogo.png"
                            alt="Golftime Logo"
                            className="mx-1 max-w-12"
                        />
                        <span className="mx-1 text-xl font-bold uppercase">
                            Golf time corp
                        </span>
                    </Link>

                    <nav className="hidden items-center space-x-6 md:flex">
                        <div className="w-[100px] text-center">
                            <Link
                                href="/"
                                className="text-base font-medium text-black underline-offset-4 transition-colors hover:text-green-700 hover:underline"
                            >
                                Home
                            </Link>
                        </div>
                        <div className="w-[100px] text-center">
                            <DropdownMenu className="">
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="link"
                                        className="text-base font-medium text-black transition-colors hover:text-green-700"
                                    >
                                        About
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href="/about">
                                            Company Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/about/mission">
                                            Our Mission
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/about/vision">
                                            Our Vision
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="w-[100px] text-center">
                            <DropdownMenu className="">
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="link"
                                        className="text-base font-medium text-black transition-colors hover:text-green-700"
                                    >
                                        Product
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href="/shop">All</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/shop/men">Men</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/shop/women">Women</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/shop/kids">Kids</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/shop/bags">Bags</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/shop/accessories">
                                            Accessories
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="w-[100px] text-center">
                            <Link
                                href="/news"
                                className="text-base font-medium text-black underline-offset-4 transition-colors hover:text-green-700 hover:underline"
                            >
                                News
                            </Link>
                        </div>
                        <div className="w-[100px] text-center">
                            <Link
                                href="/contact"
                                className="text-base font-medium text-black underline-offset-4 transition-colors hover:text-green-700 hover:underline"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </nav>

                    <div className="flex items-center space-x-4">
                        {isSearchOpen ? (
                            <div className="flex items-center">
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="mr-2 w-[200px]"
                                    autoFocus
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsSearchOpen(false)}
                                >
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">
                                        Close search
                                    </span>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <Search className="h-5 w-5" />
                                <span className="sr-only">Search</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
