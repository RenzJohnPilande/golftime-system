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
import { Sparkles, Target, Users } from 'lucide-react';

const Mission = ({ content, alerts, columns }) => {
    console.log(content);
    return (
        <ShopLayout alerts={alerts} columns={columns}>
            <Head title="GolfTime Corp - Our Mission" />
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
                                <BreadcrumbPage>Our Mission</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex w-full flex-wrap gap-10">
                        <div className="container mx-auto px-4 py-12">
                            <div className="mb-12 flex flex-col items-center text-center">
                                <h1 className="mb-6 text-4xl font-bold">
                                    {content.section_type}
                                </h1>
                                <div className="max-w-3xl">
                                    <p className="text-muted-foreground text-lg">
                                        {content.content}
                                    </p>
                                </div>
                            </div>

                            <div className="relative mb-16 h-[400px] overflow-hidden rounded-lg">
                                <img
                                    src="/storage/resources/golfcourse.jpg"
                                    alt="Golf Course Panorama"
                                    className="object-cover"
                                />
                            </div>

                            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                                <div className="flex flex-col items-center rounded-lg border p-6 text-center">
                                    <Target className="text-primary mb-4 h-12 w-12" />
                                    <h3 className="mb-2 text-xl font-bold">
                                        Quality & Performance
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Providing high-quality apparel that
                                        enhances performance on the golf course
                                        through innovative design and premium
                                        materials.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center rounded-lg border p-6 text-center">
                                    <Sparkles className="text-primary mb-4 h-12 w-12" />
                                    <h3 className="mb-2 text-xl font-bold">
                                        Style & Expression
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Creating stylish golf wear that allows
                                        players to express their individuality
                                        while maintaining professional elegance.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center rounded-lg border p-6 text-center">
                                    <Users className="text-primary mb-4 h-12 w-12" />
                                    <h3 className="mb-2 text-xl font-bold">
                                        Trust & Relationship
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Building lasting relationships with golf
                                        enthusiasts by being a trusted companion
                                        that understands their needs and
                                        passions.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <Button asChild variant="outline">
                                    <Link href="/about/company-profile">
                                        Company Profile
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

export default Mission;
