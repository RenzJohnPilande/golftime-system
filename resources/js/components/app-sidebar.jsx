import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, router } from '@inertiajs/react';

import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import {
    MdBusiness,
    MdDashboard,
    MdEvent,
    MdKeyboardArrowUp,
    MdListAlt,
    MdLogout,
    MdManageAccounts,
    MdMoney,
    MdOutlineCases,
    MdPeople,
    MdPerson2,
} from 'react-icons/md';
import ConfirmationDialog from './dialogs/ConfirmationDialog';
import { SidebarFooter, SidebarHeader } from './ui/sidebar';

const items = [
    {
        title: 'Dashboard',
        url: '/',
        icon: MdDashboard,
    },
    {
        title: 'Events',
        url: '/events',
        icon: MdEvent,
    },
    {
        title: 'Sales',
        url: '/sales',
        icon: MdMoney,
    },
];

const management = [
    {
        title: 'Employees',
        url: '/employees',
        icon: MdPeople,
    },
    {
        title: 'Jobs',
        url: '/roles',
        icon: MdOutlineCases,
    },
    {
        title: 'Departments',
        url: '/departments',
        icon: MdBusiness,
    },
    {
        title: 'Logs',
        url: '/logs',
        icon: MdListAlt,
    },
];

const AppSidebar = ({ user }) => {
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        formAction: '',
    });

    const handleConfirm = () => {
        router.post('logout');
    };
    return (
        <Sidebar className="bg-zinc-800 text-white">
            <SidebarHeader className="text-white">
                <div className="flex items-center gap-2 px-2 py-4">
                    <Avatar>
                        <AvatarImage
                            src="/images/GolfTimeLogo.png"
                            alt="Golf Time Logo"
                        />

                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="capitalize">
                        <p className="text-sm font-medium">Golftime PH</p>
                        <p className="text-xs">Corporation</p>
                    </div>
                </div>
            </SidebarHeader>
            <Separator />
            <SidebarContent className="py-4 text-white">
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent className="pb-5">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {management.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="text-xs uppercase">
                                    <MdPerson2 />
                                    {user.lastname +
                                        ', ' +
                                        user.firstname +
                                        ' ' +
                                        user.middlename}
                                    <MdKeyboardArrowUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <Link href="/account">
                                    <DropdownMenuItem className="flex cursor-pointer items-center font-medium hover:bg-zinc-300">
                                        <MdManageAccounts />
                                        Account
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    type="submit"
                                    className="flex cursor-pointer items-center font-medium hover:bg-zinc-300"
                                    onClick={() => {
                                        setDialogConfig({
                                            title: 'Logout Confirmation',
                                            message:
                                                'Are you sure you want to logout?',
                                            formAction: 'logout',
                                        });
                                        setConfirmationDialogOpen(true);
                                    }}
                                >
                                    <MdLogout />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <ConfirmationDialog
                open={isConfirmationDialogOpen}
                onClose={() => setConfirmationDialogOpen(false)}
                onConfirm={handleConfirm}
                config={dialogConfig}
            />
        </Sidebar>
    );
};

export default AppSidebar;
