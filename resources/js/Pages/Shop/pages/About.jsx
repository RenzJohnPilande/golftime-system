import ShopLayout from '@/Layouts/ShopLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    ClubIcon as GolfIcon,
    Lightbulb,
    Target,
} from 'lucide-react';

const About = () => {
    return (
        <ShopLayout>
            <Head title="GolfTime Corp - About Us" />
            <div className="flex w-full flex-wrap justify-center">
                <div className="container flex flex-wrap gap-5 px-5 py-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>About Us</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex w-full flex-wrap gap-10">
                        <div className="container mx-auto px-4 py-12">
                            <div className="mb-12 flex flex-col items-center text-center">
                                <div className="mb-4 flex items-center">
                                    <GolfIcon className="mr-2 h-8 w-8" />
                                    <h1 className="text-4xl font-bold">
                                        About Golf Time Corp.
                                    </h1>
                                </div>
                                <p className="text-muted-foreground max-w-3xl text-xl">
                                    Official Distributor of K&G Golf Fashion in
                                    the Philippines since 2015
                                </p>
                            </div>

                            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                                <Card className="transition-shadow hover:shadow-lg">
                                    <CardContent className="flex flex-col items-center p-6 text-center">
                                        <div className="bg-primary/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
                                            <Building2 className="text-primary h-12 w-12" />
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold">
                                            Company Profile
                                        </h2>
                                        <p className="text-muted-foreground mb-4">
                                            Learn about our history and
                                            achievements as one of the Top 3
                                            leading high-class fashion sports
                                            apparel for golf.
                                        </p>
                                        <Button asChild className="mt-auto">
                                            <Link href="/about/company-profile">
                                                Read More
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="transition-shadow hover:shadow-lg">
                                    <CardContent className="flex flex-col items-center p-6 text-center">
                                        <div className="bg-primary/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
                                            <Target className="text-primary h-12 w-12" />
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold">
                                            Our Mission
                                        </h2>
                                        <p className="text-muted-foreground mb-4">
                                            Discover how we aim to elevate the
                                            golfing experience through quality,
                                            innovation, and style.
                                        </p>
                                        <Button asChild className="mt-auto">
                                            <Link href="/about/mission">
                                                Read More
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="transition-shadow hover:shadow-lg">
                                    <CardContent className="flex flex-col items-center p-6 text-center">
                                        <div className="bg-primary/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
                                            <Lightbulb className="text-primary h-12 w-12" />
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold">
                                            Our Vision
                                        </h2>
                                        <p className="text-muted-foreground mb-4">
                                            Explore our aspirations to shape the
                                            future of golf apparel with
                                            innovation and sustainability.
                                        </p>
                                        <Button asChild className="mt-auto">
                                            <Link href="/about/vision">
                                                Read More
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="rounded-lg bg-zinc-100 p-8 text-center">
                                <h2 className="mb-4 text-2xl font-bold">
                                    Join Us On The Green
                                </h2>
                                <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
                                    Experience the finest golf apparel and
                                    accessories from K&G Golf Fashion,
                                    distributed by Golf Time Corp. across the
                                    Philippines.
                                </p>
                                <Button asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default About;
