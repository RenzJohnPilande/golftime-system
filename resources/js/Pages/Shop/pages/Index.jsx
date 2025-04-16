import ShopLayout from '@/Layouts/ShopLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Head, Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

const Index = () => {
    const banners = [
        {
            bgimage: '/images/frontpage/Banner-bg-2.jpg',
            title: 'Gear Collection',
            description:
                'Discover our curated selection of premium golf gear and accessories. From clubs to apparel, we have everything you need to elevate your game.',
            image: '/images/frontpage/FK3-White.png',
            link: '/',
        },
        {
            bgimage: '/images/frontpage/Banner-bg-1.jpg',
            title: 'Our Story',
            description:
                'At Golf Time, we blend tradition with passion, crafting each swing into a masterpiece. Learn more about our journey, our commitment, and our love for the game.',
            image: '/images/GolfTimeLogo.png',
            link: '/',
        },
        {
            bgimage: '/images/frontpage/Banner-bg-3.jpg',
            title: 'Event Updates',
            description:
                "Stay updated on the latest in the world of golf with Golf Time. From exciting tournaments to exclusive events, there's always something happening. Join us and be part of the action.",
            image: '/images/frontpage/MMCL.jpg',
            link: '/',
        },
    ];

    const shirts = [
        { image: '/images/products/FK3-White.png', name: 'FK3' },
        { image: '/images/products/FK3-White.png', name: 'FK3' },
        { image: '/images/products/FK3-White.png', name: 'FK3' },
        { image: '/images/products/FK3-White.png', name: 'FK3' },
        { image: '/images/products/FK3-White.png', name: 'FK3' },
        { image: '/images/products/FK3-White.png', name: 'FK3' },
    ];
    const news = [
        {
            id: 1,
            name: 'Golf Time Invitational 2024',
            date: 'March 10, 2024',
            image: '/images/news/4th PSI Golf Cup.jpg',
        },
        {
            id: 2,
            name: 'Summer Swing Fest',
            date: 'April 20, 2024',
            image: '/images/news/4th PSI Golf Cup.jpg',
        },
        {
            id: 3,
            name: 'Father’s Day Tournament',
            date: 'June 16, 2024',
            image: '/images/news/4th PSI Golf Cup.jpg',
        },
        {
            id: 4,
            name: 'Golf Time Anniversary Cup',
            date: 'August 5, 2024',
            image: '/images/news/4th PSI Golf Cup.jpg',
        },
        {
            id: 5,
            name: 'Holiday Tee-Off',
            date: 'December 14, 2024',
            image: '/images/news/4th PSI Golf Cup.jpg',
        },
        {
            id: 6,
            name: 'New Year Drive 2025',
            date: 'January 5, 2025',
            image: '/images/news/4th PSI Golf Cup.jpg',
        },
    ];

    const accessories = [
        {
            id: 1,
            name: 'Golf Glove',
            images: '/images/products/FK3-White.png',
            category: 'accessories',
        },
        {
            id: 2,
            name: 'Cap',
            images: '/images/products/FK3-White.png',
            category: 'accessories',
        },
        {
            id: 3,
            name: 'Towel',
            images: '/images/products/FK3-White.png',
            category: 'accessories',
        },
        {
            id: 4,
            name: 'Headcover',
            images: '/images/products/FK3-White.png',
            category: 'accessories',
        },
        {
            id: 5,
            name: 'Golf Umbrella',
            images: '/images/products/FK3-White.png',
            category: 'accessories',
        },
        {
            id: 6,
            name: 'Ball Marker',
            images: '/images/products/FK3-White.png',
            category: 'accessories',
        },
    ];

    return (
        <ShopLayout>
            <Head title="GolfTime Corp" />
            <div className="flex w-full flex-wrap justify-center">
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                        Fade({}),
                    ]}
                >
                    <CarouselContent>
                        {banners.map((banner, index) => (
                            <CarouselItem
                                key={index}
                                style={{
                                    backgroundImage: `url(${banner.bgimage})`,
                                }}
                                className="bg-cover bg-center"
                            >
                                <div className="flex min-h-screen w-full flex-wrap justify-center text-pretty bg-transparent">
                                    <div className="container flex w-full flex-wrap content-center items-center justify-center">
                                        <div className="text-shadow container order-2 my-5 flex w-full flex-wrap content-center text-white md:order-1 md:w-1/2 lg:justify-start">
                                            <span className="my-1 w-full text-center text-2xl font-bold md:my-1 md:text-start md:text-xl lg:text-5xl">
                                                {banner.title}
                                            </span>
                                            <p className="my-1 text-center text-base md:text-start md:text-sm md:leading-7">
                                                {banner.description}
                                            </p>
                                            <div className="flex w-full justify-center py-5 md:justify-start">
                                                <Link
                                                    href="/"
                                                    className="bg-black px-4 py-2 text-sm shadow"
                                                >
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="container order-1 flex w-full flex-wrap content-center justify-center md:w-1/3 md:p-0 xl:order-2 xl:justify-end">
                                            <div className="flex h-[400px] max-w-[400px] items-center">
                                                <img
                                                    src={banner.image}
                                                    alt="Brand Logo"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="flex w-full flex-wrap justify-center py-10">
                <div className="container flex w-full flex-wrap justify-center gap-10 px-10">
                    <div className="w-full text-pretty text-center uppercase text-black">
                        <h1 className="my-1 text-[30px] font-medium text-zinc-800">
                            Golf Shirts
                        </h1>
                        <span className="text-sm text-zinc-600">
                            Elevate Your Style on the Course with our premium
                            golf shirts
                        </span>
                    </div>
                    <div className="grid w-full grid-cols-1 justify-center gap-4 md:grid-cols-3">
                        {shirts.map((shirt, index) => {
                            return (
                                <div
                                    className="border bg-slate-50 p-5"
                                    key={index}
                                >
                                    <img
                                        src={`${shirt.image}`}
                                        alt={shirt.name}
                                    />
                                    <span className="m-2 text-lg uppercase text-zinc-800">
                                        FK3
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="my-10 flex w-full flex-wrap justify-center bg-slate-200 p-10">
                <div className="container flex w-full flex-wrap">
                    <div className="flex w-full flex-col flex-wrap justify-center py-10 uppercase lg:w-1/2 lg:px-20">
                        <h1 className="my-1 text-lg font-semibold">
                            Customize your look
                        </h1>
                        <p className="my-1 text-sm leading-8">
                            CUSTOMIZE YOUR TEAM’S STYLE WITH OUR GOLF SHIRTS.
                            BLENDING COMFORT AND PERFORMANCE, HELPING YOU STAND
                            OUT AT EVERY TOURNAMENT!
                        </p>
                    </div>
                    <img
                        src="/images/frontpage/Custom-shirts.png"
                        alt="Customized Golf Shirts"
                        className="w-full lg:w-1/2"
                    />
                </div>
            </div>
            <div className="flex w-full flex-wrap justify-center py-10">
                <div className="container flex w-full flex-wrap justify-center gap-10">
                    <div className="w-full text-pretty text-center uppercase text-black">
                        <h1 className="my-1 text-[30px] font-medium text-zinc-800">
                            Accessories
                        </h1>
                        <span className="text-sm text-zinc-600">
                            Upgrade your game with Golf Time accessories
                        </span>
                    </div>
                    <div className="flex w-full justify-center">
                        <Carousel
                            opts={{
                                align: 'start',
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 2000,
                                }),
                            ]}
                            className="w-full p-10"
                        >
                            <CarouselContent className="p-0">
                                {accessories.map((accessory, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="flex w-full flex-wrap content-center justify-center md:basis-1/3"
                                    >
                                        <Link
                                            href={`/products/${accessory.category}/${accessory.id}`}
                                            className="border bg-slate-200 hover:shadow md:m-1 md:p-3"
                                        >
                                            <img
                                                src={`${accessory.images}`}
                                                alt={accessory.name}
                                                className="w-full"
                                            />
                                            <span className="m-2 block text-center text-lg uppercase text-zinc-800">
                                                {accessory.name}
                                            </span>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className="my-10 flex w-full flex-wrap justify-center bg-slate-200 p-10">
                <div className="container flex w-full flex-wrap">
                    <img
                        className="w-full lg:w-1/2"
                        src="/images/frontpage/Usage-1.jpg"
                        alt="Usage photo"
                    />
                    <div className="flex w-full flex-col flex-wrap justify-center py-10 uppercase lg:w-1/2 lg:px-20">
                        <h1 className="my-1 text-lg font-semibold">
                            Travel in style
                        </h1>
                        <p className="my-1 text-sm leading-8">
                            OUR BOSTON BAGS COMBINE FUNCTIONALITY WITH FASHION
                            FOR THE MODERN GOLFER.
                        </p>
                        <Link
                            to="/products/bags"
                            className="my-1 text-xs font-bold underline underline-offset-2"
                        >
                            see more
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-wrap justify-center p-5 md:p-10">
                <div className="container flex w-full flex-wrap">
                    {' '}
                    <div className="w-full text-pretty text-center uppercase text-black">
                        <h1 className="my-1 text-[30px] font-medium text-zinc-800">
                            News and Events
                        </h1>
                        <span className="text-sm text-zinc-600">
                            Stay Updated with the Latest Happenings in Golf Time
                            PH
                        </span>
                    </div>
                    <div className="flex w-full flex-wrap">
                        {news.map((article, index) => (
                            <Card
                                key={index}
                                className="border-none p-5 shadow-none md:basis-1/3"
                            >
                                <CardHeader className="overflow-hidden border p-0 hover:shadow-lg">
                                    <a to={`/events/${article.id}`}>
                                        <img
                                            src={`${article.image}`}
                                            alt={article.name}
                                            className="w-full transition-all duration-500 hover:scale-110"
                                        />
                                    </a>
                                </CardHeader>
                                <CardContent className="m-0 p-0">
                                    <a className="my-3 flex w-full flex-col flex-wrap justify-start px-0">
                                        <span className="my-1 text-sm text-zinc-500">
                                            {article.date}
                                        </span>
                                        <span className="my-1 text-lg text-zinc-900">
                                            {article.name}
                                        </span>
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default Index;
