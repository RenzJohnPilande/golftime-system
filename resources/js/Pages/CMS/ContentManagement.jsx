import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AboutContent from './content/AboutContent';
import AlertContent from './content/AlertContent';
import BannerContent from './content/BannerContent';
import ConstantContent from './content/ConstantContent';
import ContactContent from './content/ContactContent';
import PromotionContent from './content/PromotionContent';
const ContentManagement = ({
    promotions,
    aboutInfos,
    contactInfos,
    banners,
    alerts,
    constants,
}) => {
    return (
        <AuthenticatedLayout>
            <Head title="Content Management" />
            <div className="flex min-h-screen w-full flex-col flex-wrap bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-end justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            Content Management
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Effortlessly manage and organize your
                            content—everything you need, all in one streamlined
                            space.
                        </h2>
                    </div>
                </div>
                <div className="flex w-full flex-wrap py-4">
                    <Tabs
                        defaultValue="promotions"
                        className="flex w-full flex-wrap"
                    >
                        <div className="flex h-16 w-full flex-wrap xl:h-auto">
                            <TabsList className="grid w-full grid-cols-3 bg-transparent xl:grid-cols-6">
                                <TabsTrigger
                                    className="w-full rounded-t-none border border-zinc-50 bg-gray-200 capitalize text-zinc-900"
                                    value="promotions"
                                >
                                    Promotions
                                </TabsTrigger>
                                <TabsTrigger
                                    className="w-full rounded-t-none border border-zinc-50 bg-gray-200 capitalize text-zinc-900"
                                    value="about us"
                                >
                                    About
                                </TabsTrigger>
                                <TabsTrigger
                                    className="w-full rounded-t-none border border-zinc-50 bg-gray-200 capitalize text-zinc-900"
                                    value="contact us"
                                >
                                    Contact
                                </TabsTrigger>
                                <TabsTrigger
                                    className="w-full rounded-t-none border border-zinc-50 bg-gray-200 capitalize text-zinc-900"
                                    value="banners"
                                >
                                    Banners
                                </TabsTrigger>
                                <TabsTrigger
                                    className="w-full rounded-t-none border border-zinc-50 bg-gray-200 capitalize text-zinc-900"
                                    value="alerts"
                                >
                                    Alerts
                                </TabsTrigger>
                                <TabsTrigger
                                    className="w-full rounded-t-none border border-zinc-50 bg-gray-200 capitalize text-zinc-900"
                                    value="constants"
                                >
                                    constants
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="promotions" className="w-full">
                            <PromotionContent promotions={promotions} />
                        </TabsContent>

                        <TabsContent value="about us" className="w-full">
                            <AboutContent aboutInfos={aboutInfos} />
                        </TabsContent>
                        <TabsContent value="contact us" className="w-full">
                            <ContactContent contactInfos={contactInfos} />
                        </TabsContent>

                        <TabsContent value="banners" className="w-full">
                            <BannerContent banners={banners} />
                        </TabsContent>

                        <TabsContent value="alerts" className="w-full">
                            <AlertContent alerts={alerts} />
                        </TabsContent>
                        <TabsContent value="constants" className="w-full">
                            <ConstantContent constants={constants} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ContentManagement;
