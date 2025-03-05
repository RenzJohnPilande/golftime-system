import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import InputLabel from '@/components/InputLabel';
import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { toast } from 'sonner';

const Account = ({ user }) => {
    const { data: jobDetailsData } = useForm({
        position: user.position || '',
        department: user.department || '',
        salary: user.salary || '',
        hire_date: user.hire_date || '',
    });
    const {
        data: personalInfoData,
        setData: setPersonalInfoData,
        patch: patchPersonalInfo,
        errors: personalInfoErrors,
        reset: resetPersonalInfo,
    } = useForm({
        firstname: user.firstname || '',
        middlename: user.middlename || '',
        lastname: user.lastname || '',
        sex: user.sex || '',
        birthdate: user.birthdate || '',
        contact_number: user.contact_number || '',
        address: user.address || '',
    });

    const {
        data: emailData,
        setData: setEmailData,
        patch: patchEmail,
        errors: emailErrors,
        reset: resetEmail,
    } = useForm({
        email: user.email || '',
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        patch: patchPassword,
        errors: passwordErrors,
        reset: resetPassword,
    } = useForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
    });

    const [editPersonalInfo, setEditPersonalInfo] = useState(false);
    const [editEmailAddress, setEditEmailAddress] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        formAction: '',
    });

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.warning) {
            toast.warning('Personal Information Missing', {
                description: flash.warning,
                duration: 5000,
            });
        }
    }, [flash]);

    const updatePersonalInfo = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: 'Update personal Info?',
            message:
                'Are you sure you want to update your personal information? Please review the changes before proceeding.',
            formAction: 'update Info',
        });
        setConfirmationDialogOpen(true);
    };

    const updateEmailAddress = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: 'Update Email Address?',
            message:
                'Updating your email address will change how you receive notifications. Please ensure you enter a valid and accessible email.',
            formAction: 'update email',
        });
        setConfirmationDialogOpen(true);
    };

    const updatePassword = (e) => {
        e.preventDefault();
        setDialogConfig({
            title: 'Confirm Password Change?',
            message:
                'Changing your password will log you out of all devices. Make sure to use a strong and secure password.',
            formAction: 'update password',
        });
        setConfirmationDialogOpen(true);
    };

    const handleConfirm = () => {
        const { formAction } = dialogConfig;
    };

    console.log(user);

    return (
        <AuthenticatedLayout>
            <Head title="My Account" />
            <div className="flex min-h-screen w-full flex-col flex-wrap gap-4 bg-zinc-50 p-5">
                <div className="flex h-fit w-full flex-wrap items-center justify-between gap-2">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl font-bold md:text-2xl">
                            My Account
                        </h1>
                        <h2 className="text-base md:text-sm">
                            Manage your personal details, update your
                            credentials, and configure your account preferences.
                        </h2>
                    </div>
                </div>
                <div className="flex w-full flex-wrap gap-4">
                    <div className="flex w-full flex-col flex-wrap gap-4">
                        <div className="flex w-full flex-wrap gap-4">
                            <form onSubmit={updatePersonalInfo}>
                                <div className="flex w-full flex-wrap rounded border bg-white px-4 py-1 shadow">
                                    <div className="flex w-full items-center justify-between border-b py-1">
                                        <p className="text-sm font-bold">
                                            Personal Information
                                        </p>
                                        <button
                                            type="button"
                                            className="rounded text-sm text-zinc-800 hover:text-zinc-800/80"
                                            onClick={() => {
                                                setEditPersonalInfo(true);
                                            }}
                                        >
                                            <MdModeEditOutline />
                                        </button>
                                    </div>
                                    <div className="grid w-full grid-cols-1 gap-4 py-4 lg:grid-cols-2">
                                        <div className="flex text-sm font-medium">
                                            Ensure your personal information is
                                            accurate to receive important
                                            updates and notifications regarding
                                            your account. Keeping this
                                            information updated will help us
                                            provide better service and support.
                                        </div>
                                        <div className="flex w-full flex-wrap gap-4">
                                            <div className="grid w-full grid-cols-3 gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <InputLabel
                                                        htmlFor="firstname"
                                                        value="First Name"
                                                    />
                                                    <TextInput
                                                        id="firstname"
                                                        name="firstname"
                                                        disabled={
                                                            !editPersonalInfo
                                                        }
                                                        className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPersonalInfo && 'border-zinc-900'}`}
                                                        value={
                                                            personalInfoData.firstname
                                                        }
                                                        onChange={(e) =>
                                                            setPersonalInfoData(
                                                                'firstname',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {personalInfoErrors.firstname && (
                                                        <InputError className="mt-2">
                                                            {
                                                                personalInfoErrors.firstname
                                                            }
                                                        </InputError>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <InputLabel
                                                        htmlFor="middlename"
                                                        value="Middle Name"
                                                    />
                                                    <TextInput
                                                        id="middlename"
                                                        name="middlename"
                                                        disabled={
                                                            !editPersonalInfo
                                                        }
                                                        className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPersonalInfo && 'border-zinc-900'}`}
                                                        value={
                                                            personalInfoData.middlename
                                                        }
                                                        onChange={(e) =>
                                                            setPersonalInfoData(
                                                                'middlename',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    {personalInfoErrors.middlename && (
                                                        <InputError className="mt-2">
                                                            {
                                                                personalInfoErrors.middlename
                                                            }
                                                        </InputError>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <InputLabel
                                                        htmlFor="lastname"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="lastname"
                                                        name="lastname"
                                                        disabled={
                                                            !editPersonalInfo
                                                        }
                                                        className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPersonalInfo && 'border-zinc-900'}`}
                                                        value={
                                                            personalInfoData.lastname
                                                        }
                                                        onChange={(e) =>
                                                            setPersonalInfoData(
                                                                'lastname',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {personalInfoErrors.lastname && (
                                                        <InputError className="mt-2">
                                                            {
                                                                personalInfoErrors.lastname
                                                            }
                                                        </InputError>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="grid w-full grid-cols-1 gap-4">
                                                <div className="flex w-full flex-wrap">
                                                    <InputLabel
                                                        htmlFor="address"
                                                        value="Address"
                                                    />
                                                    <TextInput
                                                        id="address"
                                                        name="address"
                                                        type="textarea"
                                                        disabled={
                                                            !editPersonalInfo
                                                        }
                                                        className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPersonalInfo && 'border-zinc-900'}`}
                                                        value={
                                                            personalInfoData.address
                                                        }
                                                        onChange={(e) =>
                                                            setPersonalInfoData(
                                                                'address',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {!personalInfoData.address && (
                                                        <p className="text-xs text-yellow-600">
                                                            Your address is
                                                            missing. Please
                                                            update it to ensure
                                                            proper communication
                                                            and accurate
                                                            documentation.
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid w-full grid-cols-2 gap-4">
                                                    <div className="flex flex-col gap-1">
                                                        <InputLabel
                                                            htmlFor="birthdate"
                                                            value="Date of Birth"
                                                        />
                                                        <TextInput
                                                            id="birthdate"
                                                            name="birthdate"
                                                            type="date"
                                                            disabled={
                                                                !editPersonalInfo
                                                            }
                                                            className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPersonalInfo && 'border-zinc-900'}`}
                                                            value={
                                                                personalInfoData.birthdate
                                                            }
                                                            onChange={(e) =>
                                                                setPersonalInfoData(
                                                                    'birthdate',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                        />
                                                        {!personalInfoData.birthdate && (
                                                            <p className="text-xs text-yellow-600">
                                                                Your date of
                                                                birth is
                                                                missing. Please
                                                                update it to
                                                                ensure accurate
                                                                records and
                                                                better service.
                                                            </p>
                                                        )}
                                                        {personalInfoErrors.birthdate && (
                                                            <InputError className="mt-2">
                                                                {
                                                                    personalInfoErrors.birthdate
                                                                }
                                                            </InputError>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <InputLabel
                                                            htmlFor="sex"
                                                            value="Sex"
                                                        />
                                                        <SelectInput
                                                            id="sex"
                                                            name="sex"
                                                            disabled={
                                                                !editPersonalInfo
                                                            }
                                                            options={[
                                                                {
                                                                    value: 'male',
                                                                    label: 'Male',
                                                                },
                                                                {
                                                                    value: 'female',
                                                                    label: 'Female',
                                                                },
                                                            ]}
                                                            className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPersonalInfo && 'border-zinc-900'}`}
                                                            value={
                                                                personalInfoData.sex
                                                            }
                                                            onChange={(e) =>
                                                                setPersonalInfoData(
                                                                    'sex',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                        {!personalInfoData.sex && (
                                                            <p className="text-xs text-yellow-600">
                                                                Your gender
                                                                information is
                                                                missing. Please
                                                                update it to
                                                                complete your
                                                                profile.
                                                            </p>
                                                        )}
                                                        {personalInfoErrors.sex && (
                                                            <InputError className="mt-2">
                                                                {
                                                                    personalInfoErrors.sex
                                                                }
                                                            </InputError>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {editPersonalInfo && (
                                                <div className="flex w-full flex-wrap justify-end gap-4">
                                                    <button
                                                        type="button"
                                                        className="w-[100px] rounded bg-zinc-600 p-1 text-sm capitalize text-white"
                                                        onClick={() => {
                                                            setEditPersonalInfo(
                                                                false,
                                                            );
                                                            resetPersonalInfo();
                                                        }}
                                                    >
                                                        cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="w-[100px] rounded bg-zinc-900 p-1 text-sm capitalize text-white"
                                                    >
                                                        save
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={updateEmailAddress}>
                                <div className="flex w-full flex-wrap rounded border bg-white px-4 py-1 shadow">
                                    <div className="flex w-full items-center justify-between border-b py-1">
                                        <p className="text-sm font-bold">
                                            Email Address
                                        </p>
                                        <button
                                            type="button"
                                            className="rounded text-sm text-zinc-800 hover:text-zinc-800/80"
                                            onClick={() => {
                                                setEditEmailAddress(true);
                                            }}
                                        >
                                            <MdModeEditOutline />
                                        </button>
                                    </div>
                                    <div className="grid w-full grid-cols-1 gap-4 py-4 lg:grid-cols-2">
                                        <div className="flex text-sm font-medium">
                                            Your email address is used for
                                            account-related notifications and
                                            password recovery. Please ensure it
                                            is valid and accessible.
                                        </div>
                                        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <InputLabel
                                                        htmlFor="email"
                                                        value="Email"
                                                    />
                                                    <TextInput
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        disabled={
                                                            !editEmailAddress
                                                        }
                                                        className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editEmailAddress && 'border-zinc-900'}`}
                                                        value={emailData.email}
                                                        onChange={(e) =>
                                                            setEmailData(
                                                                'email',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {emailErrors.email && (
                                                        <InputError className="mt-2">
                                                            {emailErrors.email}
                                                        </InputError>
                                                    )}
                                                </div>

                                                {editEmailAddress && (
                                                    <div className="flex h-fit w-full flex-wrap justify-end gap-4">
                                                        <button
                                                            type="button"
                                                            className="w-[100px] rounded bg-zinc-600 p-1 text-sm capitalize text-white"
                                                            onClick={() => {
                                                                setEditEmailAddress(
                                                                    false,
                                                                );
                                                                resetEmail();
                                                            }}
                                                        >
                                                            cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="w-[100px] rounded bg-zinc-900 p-1 text-sm capitalize text-white"
                                                        >
                                                            save
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={updatePassword}>
                                <div className="flex w-full flex-wrap rounded border bg-white px-4 py-1 shadow">
                                    <div className="flex w-full items-center justify-between border-b py-1">
                                        <p className="text-sm font-bold">
                                            Change Password
                                        </p>
                                        <button
                                            type="button"
                                            className="rounded text-sm text-zinc-800 hover:text-zinc-800/80"
                                            onClick={() => {
                                                setEditPassword(true);
                                            }}
                                        >
                                            <MdModeEditOutline />
                                        </button>
                                    </div>
                                    <div className="grid w-full grid-cols-1 gap-4 py-4 lg:grid-cols-2">
                                        <div className="flex text-sm font-medium">
                                            Updating your password regularly
                                            helps keep your account secure. Make
                                            sure to use a strong password that
                                            includes a mix of letters, numbers,
                                            and special characters.
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    <InputLabel
                                                        htmlFor="current_password"
                                                        value="Current Password"
                                                    />
                                                    <TextInput
                                                        id="current_password"
                                                        name="current_password"
                                                        type="password"
                                                        disabled={!editPassword}
                                                        className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPassword && 'border-zinc-900'}`}
                                                        value={
                                                            passwordData.current_password
                                                        }
                                                        onChange={(e) =>
                                                            setPasswordData(
                                                                'current_password',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {passwordErrors.current_password && (
                                                        <InputError className="mt-2">
                                                            {
                                                                passwordErrors.current_password
                                                            }
                                                        </InputError>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel
                                                        htmlFor="new_password"
                                                        value="New Password"
                                                    />
                                                    <TextInput
                                                        id="new_password"
                                                        name="new_password"
                                                        type="password"
                                                        disabled={!editPassword}
                                                        className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPassword && 'border-zinc-900'}`}
                                                        value={
                                                            passwordData.new_password
                                                        }
                                                        onChange={(e) =>
                                                            setPasswordData(
                                                                'new_password',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {passwordErrors.new_password && (
                                                        <InputError className="mt-2">
                                                            {
                                                                passwordErrors.new_password
                                                            }
                                                        </InputError>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel
                                                        htmlFor="confirm_password"
                                                        value="Confirm New Password"
                                                    />
                                                    <TextInput
                                                        id="confirm_password"
                                                        name="confirm_password"
                                                        type="password"
                                                        disabled={!editPassword}
                                                        className={`mt-1 block w-full border px-2 py-2 text-sm shadow transition-all ${editPassword && 'border-zinc-900'}`}
                                                        value={
                                                            passwordData.confirm_password
                                                        }
                                                        onChange={(e) =>
                                                            setPasswordData(
                                                                'confirm_password',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    {passwordData.confirm_password &&
                                                        passwordData.new_password !==
                                                            passwordData.confirm_password && (
                                                            <p className="text-xs text-yellow-600">
                                                                Passwords do not
                                                                match. Please
                                                                re-enter.
                                                            </p>
                                                        )}
                                                    {passwordErrors.confirm_password && (
                                                        <InputError className="mt-2">
                                                            {
                                                                passwordErrors.confirm_password
                                                            }
                                                        </InputError>
                                                    )}
                                                </div>

                                                {editPassword && (
                                                    <div className="flex w-full flex-wrap justify-end gap-4">
                                                        <button
                                                            type="button"
                                                            className="w-[100px] rounded bg-zinc-600 p-1 text-sm capitalize text-white"
                                                            onClick={() => {
                                                                setEditPassword(
                                                                    false,
                                                                );
                                                                resetPassword();
                                                            }}
                                                        >
                                                            cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="w-[100px] rounded bg-zinc-900 p-1 text-sm capitalize text-white"
                                                        >
                                                            save
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="flex w-full flex-wrap rounded border bg-white px-4 py-1 shadow">
                                <div className="flex w-full border-b py-1">
                                    <p className="text-sm font-bold">
                                        Job Details
                                    </p>
                                </div>
                                <div className="grid w-full grid-cols-1 gap-4 py-4 lg:grid-cols-2">
                                    <div className="flex text-sm font-medium">
                                        This section displays your job-related
                                        details, including your position,
                                        department, salary, and hire date. If
                                        any information needs updating, please
                                        contact HR or your administrator.
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium text-gray-700">
                                                Job Title
                                            </p>
                                            <p className="rounded border border-zinc-300 bg-white p-2 text-xs font-light text-zinc-500 shadow-sm">
                                                {jobDetailsData.position}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium text-gray-700">
                                                Department
                                            </p>
                                            <p className="rounded border border-zinc-300 bg-white p-2 text-xs font-light text-zinc-500 shadow-sm">
                                                {jobDetailsData.department}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium text-gray-700">
                                                Salary
                                            </p>
                                            <p className="rounded border border-zinc-300 bg-white p-2 text-xs font-light text-zinc-500 shadow-sm">
                                                {jobDetailsData.salary}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium text-gray-700">
                                                Date Hired
                                            </p>
                                            <p className="rounded border border-zinc-300 bg-white p-2 text-xs font-light text-zinc-500 shadow-sm">
                                                {jobDetailsData.hire_date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmationDialog
                    open={isConfirmationDialogOpen}
                    onClose={() => setConfirmationDialogOpen(false)}
                    onConfirm={handleConfirm}
                    config={dialogConfig}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Account;
