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
import { Award, Lightbulb, Recycle } from 'lucide-react';

const Vision = ({ content }) => {
    return (
        <ShopLayout>
            <Head title="GolfTime Corp - Our Vision" />
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
                                <BreadcrumbPage>Our Vision</BreadcrumbPage>
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

                            <div className="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                                <div className="relative h-[400px] overflow-hidden rounded-lg">
                                    <img
                                        src="/storage/resources/booth.jpg"
                                        alt="Future of Golf Fashion"
                                        fill
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <Lightbulb className="text-primary mr-4 mt-1 h-8 w-8 flex-shrink-0" />
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold">
                                                Innovation Leadership
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Staying at the forefront of
                                                design and technology to create
                                                apparel that enhances the
                                                golfing experience through
                                                innovative features and
                                                materials.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Recycle className="text-primary mr-4 mt-1 h-8 w-8 flex-shrink-0" />
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold">
                                                Sustainability Commitment
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Developing eco-friendly
                                                practices and sustainable
                                                materials to reduce our
                                                environmental footprint while
                                                maintaining premium quality.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Award className="text-primary mr-4 mt-1 h-8 w-8 flex-shrink-0" />
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold">
                                                Industry Leadership
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Becoming the No. 1 golf wear
                                                distributor in the Philippines
                                                by consistently delivering
                                                exceptional products and
                                                building strong relationships
                                                with customers.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted mb-12 rounded-lg p-8 text-center">
                                <h2 className="mb-4 text-2xl font-bold">
                                    Shaping the Future of Golf Fashion
                                </h2>
                                <p className="text-muted-foreground mx-auto max-w-2xl">
                                    Our vision extends beyond selling apparel –
                                    we aim to create a lasting impact on the
                                    golfing world by fostering a community of
                                    confident, proud golfers who recognize our
                                    brand for its quality, innovation, and
                                    purposeful design.
                                </p>
                            </div>

                            <div className="flex justify-center gap-4">
                                <Button asChild variant="outline">
                                    <Link href="/about/company-profile">
                                        Company Profile
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/about/mission">
                                        Our Mission
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default Vision;
