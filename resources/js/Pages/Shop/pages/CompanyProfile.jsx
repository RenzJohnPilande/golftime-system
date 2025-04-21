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
import { Head, Link } from '@inertiajs/react';
import { Calendar, MapPin, Trophy } from 'lucide-react';

const CompanyProfile = ({ content, alerts }) => {
    return (
        <ShopLayout alerts={alerts}>
            <Head title="GolfTime Corp - Company Profile" />
            <div className="flex w-full flex-wrap justify-center">
                <div className="container flex flex-wrap gap-5 px-5 py-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/about">
                                    About Us
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Company Profile</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex w-full flex-wrap gap-10">
                        <div className="container mx-auto px-4 py-12">
                            <div className="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                                <div>
                                    <h1 className="mb-6 text-4xl font-bold">
                                        {content.section_type}
                                    </h1>
                                    <p className="text-muted-foreground mb-6 whitespace-pre-line text-pretty text-lg">
                                        {content.content}
                                    </p>
                                </div>
                                <div className="rounded-lg p-6">
                                    <h2 className="mb-6 text-center text-2xl font-bold">
                                        Big Brands
                                    </h2>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="flex flex-col items-center justify-center rounded-lg bg-white">
                                            <img
                                                src="/storage/resources/stalucia.jpg"
                                                alt="Partner Logo"
                                                className="rounded object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center justify-center rounded-lg bg-white">
                                            <img
                                                src="/storage/resources/suntrust.jpg"
                                                alt="Partner Logo"
                                                className="rounded object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center justify-center rounded-lg bg-white">
                                            <img
                                                src="/storage/resources/newport.jpg"
                                                alt="Partner Logo"
                                                className="rounded object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="bg-muted flex flex-col items-center rounded-lg p-6 text-center">
                                    <Trophy className="text-primary mb-4 h-12 w-12" />
                                    <h3 className="mb-2 text-xl font-bold">
                                        Top 3 Leading Brand
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Recognized as one of the top 3 leading
                                        high-class fashion sports apparel and
                                        accessories for golf in the Philippines.
                                    </p>
                                </div>

                                <div className="bg-muted flex flex-col items-center rounded-lg p-6 text-center">
                                    <Calendar className="text-primary mb-4 h-12 w-12" />
                                    <h3 className="mb-2 text-xl font-bold">
                                        300+ Events Yearly
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Participating in over 300 tournaments
                                        annually at different major golf courses
                                        throughout the Philippines.
                                    </p>
                                </div>

                                <div className="bg-muted flex flex-col items-center rounded-lg p-6 text-center">
                                    <MapPin className="text-primary mb-4 h-12 w-12" />
                                    <h3 className="mb-2 text-xl font-bold">
                                        Nationwide Distribution
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Committed to distributing and delivering
                                        our products nationwide to serve golf
                                        enthusiasts across the country.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <Button asChild variant="outline">
                                    <Link href="/about/mission">
                                        Our Mission
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/about/vision">Our Vision</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default CompanyProfile;
