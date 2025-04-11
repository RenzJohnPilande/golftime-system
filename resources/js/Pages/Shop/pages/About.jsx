import ShopLayout from '@/Layouts/ShopLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const About = () => {
    return (
        <ShopLayout>
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
                        <div className="container w-full border p-4 shadow">
                            <div className="flex flex-col">
                                <h1 className="text-lg font-semibold capitalize leading-8">
                                    company profile
                                </h1>
                                <p className="my-2 text-pretty text-justify text-sm leading-8">
                                    Golf Time Corp. was established in the year
                                    2015 as the Official Distributor of K&G Golf
                                    Fashion in the Philippines. As one of the
                                    Top 3 leading high-class fashion sports
                                    apparel and accessories for golf, we have
                                    been participating in the big tournaments of
                                    the different major golf courses in the
                                    Philippines, for around 300+ events yearly.
                                    As we strive to be trusted golf wear, Golf
                                    Time Corp aims to distribute and deliver our
                                    products nationwide and become the No. 1
                                    golf wear distributor in the coming years.
                                </p>
                            </div>
                        </div>
                        <div className="container w-full border p-4 shadow">
                            <div className="flex flex-col">
                                <h1 className="text-lg font-semibold capitalize leading-8">
                                    Our Mission
                                </h1>
                                <p className="my-2 text-pretty text-justify text-sm leading-8">
                                    At Golf Time Corp., our mission is to
                                    elevate the golfing experience by providing
                                    high-quality, innovative, and stylish
                                    apparel that not only enhances performance
                                    on the course but also reflects the unique
                                    lifestyle and passion of golf enthusiasts.
                                    We strive to be a trusted companion to
                                    golfers worldwide, delivering products that
                                    blend functionality with fashion, enabling
                                    every player to express their individuality
                                    while enjoying the game they love.
                                </p>
                            </div>
                        </div>
                        <div className="container w-full border p-4 shadow">
                            <div className="flex flex-col">
                                <h1 className="text-lg font-semibold capitalize leading-8">
                                    Our Vision
                                </h1>
                                <p className="my-2 text-pretty text-justify text-sm leading-8">
                                    At Golf Time Corp., our vision is to inspire
                                    confidence and pride in golfers of all
                                    levels, fostering a community where our
                                    brand is celebrated for its commitment to
                                    quality, sustainability, and continuous
                                    innovation. By staying at the forefront of
                                    design and technology, we aim to create a
                                    lasting impact on the golfing world, shaping
                                    the future of the sport with our iconic and
                                    purposeful apparel.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
};

export default About;
