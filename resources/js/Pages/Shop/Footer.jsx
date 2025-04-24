import { Link } from '@inertiajs/react';
import {
    BiLogoFacebookSquare,
    BiLogoInstagram,
    BiLogoTwitter,
} from 'react-icons/bi';

function Footer({ columns }) {
    return (
        <>
            <div className="flex w-full flex-wrap justify-center bg-green-950 py-10 capitalize">
                <div className="container flex w-full flex-wrap justify-around px-10">
                    <div className="my-4 flex w-1/2 flex-col flex-wrap content-start lg:my-1 lg:w-1/4 lg:content-center">
                        <span className="text-xl font-bold text-white">
                            Navigation
                        </span>
                        <Link
                            href="/"
                            className="my-1 text-sm text-white focus:outline-none"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="my-1 text-sm text-white focus:outline-none"
                        >
                            About us
                        </Link>
                        <Link
                            href="/shop"
                            className="my-1 text-sm text-white focus:outline-none"
                        >
                            Products
                        </Link>
                        <Link
                            href="/news"
                            className="my-1 text-sm text-white focus:outline-none"
                        >
                            News & Events
                        </Link>
                        <Link
                            href="/contact"
                            className="my-1 text-sm text-white focus:outline-none"
                        >
                            Contact us
                        </Link>
                    </div>

                    <div className="my-4 flex w-1/2 flex-col flex-wrap content-start lg:my-1 lg:w-1/4 lg:content-center">
                        <span className="text-xl font-bold text-white">
                            Products
                        </span>
                        {columns
                            .filter(
                                (col) =>
                                    col.type === 'Product Column' && col.active,
                            )
                            .map((col) => (
                                <Link
                                    key={col.id}
                                    href={`${col.value}`}
                                    className="my-1 text-sm text-white focus:outline-none"
                                >
                                    {col.description}
                                </Link>
                            ))}
                    </div>

                    <div className="my-4 flex w-1/2 flex-col flex-wrap content-start lg:my-1 lg:w-1/4 lg:content-center">
                        <span className="text-xl font-bold text-white">
                            Company Info
                        </span>
                        {columns
                            .filter(
                                (col) =>
                                    col.type === 'About Column' && col.active,
                            )
                            .map((col) => (
                                <Link
                                    key={col.id}
                                    href={`${col.value}`}
                                    className="my-1 text-sm text-white focus:outline-none"
                                >
                                    {col.description}
                                </Link>
                            ))}
                    </div>

                    <div className="my-4 flex w-1/2 flex-col flex-wrap content-start lg:my-1 lg:w-1/4 lg:content-center">
                        <span className="text-xl font-bold text-white">
                            Social Media
                        </span>
                        <div className="text-sm-center my-3 flex flex-col">
                            <div className="my-1 flex items-center">
                                <div className="flex-1 text-3xl text-white">
                                    <Link
                                        className="focus:outline-none"
                                        href="https://www.facebook.com/p/Golf-Time-PH-100072516006235/"
                                    >
                                        <BiLogoFacebookSquare />
                                    </Link>
                                </div>
                                <div className="flex-1 text-3xl text-white">
                                    <Link
                                        className="focus:outline-none"
                                        href="https://www.instagram.com/golftimeph/"
                                    >
                                        <BiLogoInstagram />
                                    </Link>
                                </div>
                                <div className="flex-1 text-3xl text-white">
                                    <Link
                                        className="focus:outline-none"
                                        href="/"
                                    >
                                        <BiLogoTwitter />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full border-t bg-green-950 py-2 text-center text-xs text-white">
                <p>Copyright © Golf Time PH</p>
            </div>
        </>
    );
}

export default Footer;
