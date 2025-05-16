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

const Index = ({
    banners,
    shirts,
    accessories,
    news,
    alerts,
    promotions,
    columns,
}) => {
    return (
        <ShopLayout alerts={alerts} columns={columns}>
            <Head title="Home" />
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
                                    backgroundImage: `url(/public/${banner.background})`,
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
                                                    href={banner.link}
                                                    className="bg-black px-4 py-2 text-sm shadow"
                                                >
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="container order-1 flex w-full flex-wrap content-center justify-center md:w-1/3 md:p-0 xl:order-2 xl:justify-end">
                                            <div className="flex h-[400px] max-w-[400px] items-center">
                                                <img
                                                    src={`/public/${banner.image}`}
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
                                <Link
                                    href={`/shop/item/${shirt.id}`}
                                    className="border bg-slate-50 p-5 text-center"
                                    key={index}
                                >
                                    <img
                                        src={`/public/${shirt.thumbnail}`}
                                        alt={shirt.name}
                                    />
                                    <span className="m-2 text-lg uppercase text-zinc-800">
                                        {shirt.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="my-10 flex w-full flex-wrap justify-center bg-slate-200 p-10">
                <div className="container flex w-full flex-wrap">
                    <div className="flex w-full flex-col flex-wrap justify-center py-10 uppercase lg:w-1/2 lg:px-20">
                        <h1 className="my-1 text-lg font-semibold">
                            {promotions[0].title}
                        </h1>
                        <p className="my-1 text-sm uppercase leading-8">
                            {promotions[0].description}
                        </p>
                    </div>
                    <img
                        src={`/public/${promotions[0].image}`}
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
                                            href={`/products/${accessory.id}`}
                                            className="border bg-slate-200 hover:shadow md:m-1 md:p-3"
                                        >
                                            <img
                                                src={`/public/${accessory.thumbnail}`}
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
                        src={`/public/${promotions[1].image}`}
                        alt="Usage photo"
                    />
                    <div className="flex w-full flex-col flex-wrap justify-center py-10 uppercase lg:w-1/2 lg:px-20">
                        <h1 className="my-1 text-lg font-semibold">
                            {promotions[1].title}
                        </h1>
                        <p className="my-1 text-sm leading-8">
                            {promotions[1].description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-wrap justify-center p-5 md:p-10">
                <div className="container flex w-full flex-wrap">
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
                                    <Link href={`/news/${article.id}`}>
                                        <img
                                            src={`/public/${article.image}`}
                                            alt={article.title}
                                            className="w-full transition-all duration-500 hover:scale-110"
                                        />
                                    </Link>
                                </CardHeader>
                                <CardContent className="m-0 p-0">
                                    <Link
                                        href={`/news/${article.id}`}
                                        className="my-3 flex w-full flex-col flex-wrap justify-start px-0"
                                    >
                                        <span className="my-1 text-sm text-zinc-500">
                                            {article.date}
                                        </span>
                                        <span className="my-1 text-lg text-zinc-900">
                                            {article.title}
                                        </span>
                                    </Link>
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
