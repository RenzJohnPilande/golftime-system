import ShopLayout from '@/Layouts/ShopLayout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { Head } from '@inertiajs/react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useRef } from 'react';

const Contact = () => {
    const { toast } = useToast();

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_o2szija', 'template_ec2yvo8', form.current, {
                publicKey: 'eHLOIMECA8wK1Mf00',
            })
            .then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    form.current.reset();
                    toast({
                        title: 'Success',
                        description: 'Your email was sent successfully.',
                    });
                },
                (error) => {
                    console.log('FAILED...', error);
                    toast({
                        title: 'Error',
                        description:
                            'Oops! There was an error sending your message. Please try again later.',
                    });
                },
            );
    };
    return (
        <ShopLayout>
            <Head title="GolfTime Corp - Contact Us" />
            <div className="flex w-full flex-wrap justify-center">
                <div className="container flex flex-wrap gap-5 px-5 py-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Contact Us</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex w-full flex-wrap justify-center gap-10 py-5">
                        <div className="container grid w-full grid-cols-1 flex-wrap justify-center gap-20 md:grid-cols-2">
                            <div className="flex w-full flex-wrap content-start">
                                <div className="flex w-full flex-wrap content-start gap-1">
                                    <h1 className="my-1 text-3xl font-semibold">
                                        Contact Us
                                    </h1>
                                    <p className="my-1 text-zinc-800">
                                        Count on us for attentive support every
                                        step of the way, from inquiries to
                                        post-purchase assistance.
                                    </p>
                                </div>
                                <div className="flex w-full flex-col">
                                    <div className="my-5 flex items-center">
                                        <div className="me-4 flex">
                                            <MapPin className="w-auto text-3xl text-slate-800" />
                                        </div>
                                        <p className="w-auto text-sm">
                                            Lot 1b Blk 3-E Marigold St. Jasmine
                                            St. Unit Ruby Park, Victoria Homes
                                            Tunasan Muntinlupa City
                                        </p>
                                    </div>
                                    <div className="my-5 flex items-center">
                                        <div className="me-4 flex">
                                            <Mail className="w-auto text-3xl text-slate-800" />
                                        </div>
                                        <p className="w-auto text-sm">
                                            Service@Golftime.Ph
                                        </p>
                                    </div>
                                    <div className="my-5 flex items-center">
                                        <div className="me-4 flex">
                                            <Phone className="w-auto text-3xl text-slate-800" />
                                        </div>
                                        <p className="w-auto text-sm">
                                            02-83506666
                                        </p>
                                    </div>
                                    <div className="my-5 flex items-center">
                                        <div className="me-4 flex">
                                            <Clock className="w-auto text-3xl text-slate-800" />
                                        </div>
                                        <p className="w-auto text-sm">
                                            Monday - Friday: 9:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-wrap">
                                <h3 className="mb-4 text-xl font-bold">
                                    Connect With Us
                                </h3>
                                <form
                                    ref={form}
                                    onSubmit={sendEmail}
                                    className="flex flex-wrap rounded border p-5 shadow-lg md:p-10"
                                >
                                    <input
                                        type="text"
                                        name="user_name"
                                        className="my-2 h-14 w-full border p-5 text-sm"
                                        placeholder="Name"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="user_email"
                                        className="my-2 h-14 w-full border p-5 text-sm"
                                        placeholder="Email"
                                        required
                                    />
                                    <textarea
                                        name="message"
                                        className="my-2 h-24 w-full border p-5 text-sm"
                                        placeholder="Message"
                                        required
                                    />
                                    <input
                                        type="submit"
                                        value="Send"
                                        className="my-2 w-full cursor-pointer bg-zinc-800 py-3 text-white"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </ShopLayout>
    );
};

export default Contact;
