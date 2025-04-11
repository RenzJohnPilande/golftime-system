import { Head } from '@inertiajs/react';

export default function ErrorPage({ status, message }) {
    const errorMessages = {
        404: 'Sorry, the page you are looking for was not found.',
        500: 'Whoops, something went wrong on our servers.',
        403: "You don't have permission to access this page.",
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Head title={`Error ${status}`} />
            <div className="w-full max-w-[500px] rounded-lg bg-white p-10 text-center shadow-lg">
                <h1 className="text-6xl font-bold text-red-500">{status}</h1>
                <p className="mt-4 text-lg">
                    {message ||
                        errorMessages[status] ||
                        'An unexpected error occurred.'}
                </p>
                <a
                    href="/"
                    className="mt-6 inline-block rounded bg-blue-500 px-6 py-3 text-white"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
