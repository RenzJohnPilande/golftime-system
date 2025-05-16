import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col text-xl">
                        <p className="font-semibold">Login</p>
                        <p className="text-sm text-gray-600">
                            Enter your email and password to sign in.
                        </p>
                    </div>
                    <div className="flex w-full flex-wrap gap-1">
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-xs"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full border p-2 shadow"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="flex w-full flex-wrap gap-1">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-xs"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full border p-2 shadow"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex w-full items-center justify-end gap-2">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Forgot your password?
                            </Link>
                        )}
                        <Button
                            type="submit"
                            className="w-[80px] border bg-zinc-800 p-1 text-center text-sm text-white hover:bg-zinc-900"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
