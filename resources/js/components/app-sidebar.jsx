'use client';

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
import {
    Briefcase,
    BriefcaseBusiness,
    Calendar,
    LayoutDashboard,
    LayoutTemplate,
    ListChecksIcon as ListCheck,
    ListChecks,
    Newspaper,
    ShoppingBag,
    User2,
} from 'lucide-react';
import { useState } from 'react';
import { MdKeyboardArrowUp, MdLogout, MdManageAccounts } from 'react-icons/md';
import ConfirmationDialog from './dialogs/ConfirmationDialog';
import { SidebarFooter, SidebarHeader } from './ui/sidebar';

const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Events',
        url: '/events',
        icon: Calendar,
        requiredPermission: 'event_management',
    },
    {
        title: 'Tasks',
        url: '/tasks',
        icon: ListChecks,
        requiredPermission: 'task_management',
    },
];

const management = [
    {
        title: 'Employees',
        url: '/employees',
        icon: User2,
        requiredPermission: 'employee_management',
    },
    {
        title: 'Jobs',
        url: '/jobs',
        icon: Briefcase,
        requiredPermission: 'job_management',
    },
    {
        title: 'Departments',
        url: '/departments',
        icon: BriefcaseBusiness,
        requiredPermission: 'department_management',
    },
    {
        title: 'Logs',
        url: '/logs',
        icon: ListCheck,
        requiredPermission: 'admin',
    },
];

const cms = [
    {
        title: 'Products',
        url: '/products',
        icon: ShoppingBag,
        requiredPermission: 'content_management',
    },
    {
        title: 'News',
        url: '/articles',
        icon: Newspaper,
        requiredPermission: 'content_management',
    },
    {
        title: 'Content',
        url: '/cms/management',
        icon: LayoutTemplate,
        requiredPermission: 'content_management',
    },
];

const AppSidebar = ({ user, permissions }) => {
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
        useState(false);

    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        formAction: '',
    });

    const handleConfirm = () => {
        router.post('/logout');
    };

    const hasPermission = (permission) => {
        if (!permission) return true;
        return (
            permissions.includes(permission) || permissions.includes('admin')
        );
    };

    return (
        <Sidebar className="border-r border-zinc-200 bg-white text-zinc-900">
            <SidebarHeader className="border-b border-zinc-200 bg-white">
                <div className="flex items-center gap-3 px-4 py-4">
                    <Avatar className="h-10 w-10 border border-zinc-200">
                        <AvatarImage
                            src="/public/images/GolfTimeLogo.png"
                            alt="Golf Time Logo"
                        />
                        <AvatarFallback className="bg-zinc-100 text-zinc-800">
                            GT
                        </AvatarFallback>
                    </Avatar>
                    <div className="capitalize">
                        <p className="text-sm font-semibold uppercase text-zinc-900">
                            Golftime Corp
                        </p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-xs font-medium text-zinc-500">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="pb-5">
                        <SidebarMenu>
                            {items
                                .filter((item) =>
                                    hasPermission(item.requiredPermission),
                                )
                                .map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                                        >
                                            <Link href={item.url}>
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    {cms.some((item) =>
                        hasPermission(item.requiredPermission),
                    ) && (
                        <>
                            <SidebarGroupLabel className="px-4 text-xs font-medium text-zinc-500">
                                Content Management
                            </SidebarGroupLabel>
                            <SidebarGroupContent className="pb-5">
                                <SidebarMenu>
                                    {cms
                                        .filter((item) =>
                                            hasPermission(
                                                item.requiredPermission,
                                            ),
                                        )
                                        .map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                                                >
                                                    <Link href={item.url}>
                                                        <item.icon className="h-5 w-5" />
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </>
                    )}
                    {management.some((item) =>
                        hasPermission(item.requiredPermission),
                    ) && (
                        <>
                            <SidebarGroupLabel className="px-4 text-xs font-medium text-zinc-500">
                                System Management
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {management
                                        .filter((item) =>
                                            hasPermission(
                                                item.requiredPermission,
                                            ),
                                        )
                                        .map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    className="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                                                >
                                                    <Link href={item.url}>
                                                        <item.icon className="h-5 w-5" />
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </>
                    )}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-zinc-200 bg-white p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex w-full items-center justify-between gap-2 rounded-md bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6 border border-zinc-200">
                                            <AvatarFallback className="bg-blue-100 text-xs text-blue-600">
                                                {user.firstname.charAt(0)}
                                                {user.lastname.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="truncate">
                                            {user.lastname +
                                                ', ' +
                                                user.firstname}
                                        </span>
                                    </div>
                                    <MdKeyboardArrowUp className="h-4 w-4 text-zinc-500" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <Link href="/account">
                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2 font-medium">
                                        <MdManageAccounts className="h-4 w-4" />
                                        Account
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    type="submit"
                                    className="flex cursor-pointer items-center gap-2 font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
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
                                    <MdLogout className="h-4 w-4" />
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
