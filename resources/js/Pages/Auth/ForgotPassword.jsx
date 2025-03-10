import InputError from '@/Components/InputError';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Button } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex w-full flex-wrap">
                <p>Forgot Password?</p>
                <div className="mb-4 text-sm text-gray-600">
                    Enter your email, and we'll send a link to reset your
                    password.
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="w-full">
                    <div className="flex w-full flex-wrap gap-4">
                        <div className="flex w-full flex-col gap-1">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full border p-1 shadow"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex w-full items-center justify-end gap-4">
                            <Link
                                className="rounded bg-zinc-500 px-4 py-2 text-sm text-white"
                                href={route('login')}
                                type="button"
                            >
                                Cancel
                            </Link>
                            <Button
                                className="rounded bg-zinc-900 px-4 py-2 text-sm text-white"
                                type="submit"
                                disabled={processing}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
