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
import {
    Bell,
    Briefcase,
    BriefcaseBusiness,
    Calendar,
    ImageIcon,
    Info,
    LayoutDashboard,
    List,
    ListCheck,
    Mail,
    Newspaper,
    ShoppingBag,
    Tag,
    User2,
} from 'lucide-react';
import { useState } from 'react';
import {
    MdKeyboardArrowUp,
    MdLogout,
    MdManageAccounts,
    MdPerson2,
} from 'react-icons/md';
import ConfirmationDialog from './dialogs/ConfirmationDialog';
import { SidebarFooter, SidebarHeader } from './ui/sidebar';

const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'My Events',
        url: '/events',
        icon: Calendar,
        requiredPermission: 'event_management',
    },
    {
        title: 'My Tasks',
        url: '/tasks',
        icon: List,
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
    },
    {
        title: 'News',
        url: '/articles',
        icon: Newspaper,
    },
    {
        title: 'Promotions',
        url: '/cms/promotioncms',
        icon: Tag,
    },
    {
        title: 'About Us Info',
        url: '/cms/aboutcms',
        icon: Info,
    },
    {
        title: 'Contact Info',
        url: '/cms/contactcms',
        icon: Mail,
    },
    {
        title: 'Banners',
        url: '/cms/bannercms',
        icon: ImageIcon,
    },
    {
        title: 'Alerts',
        url: '/cms/alertcms',
        icon: Bell,
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
        router.post('logout');
    };

    const hasPermission = (permission) => {
        if (!permission) return true;
        return (
            permissions.includes(permission) || permissions.includes('admin')
        );
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
                            {items
                                .filter((item) =>
                                    hasPermission(item.requiredPermission),
                                )
                                .map((item) => (
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
                    <SidebarGroupLabel>Content Management</SidebarGroupLabel>
                    <SidebarGroupContent className="pb-5">
                        <SidebarMenu>
                            {cms
                                .filter((item) =>
                                    hasPermission(item.requiredPermission),
                                )
                                .map((item) => (
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
                    {management.some((item) =>
                        hasPermission(item.requiredPermission),
                    ) && (
                        <>
                            <SidebarGroupLabel>
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
                                                <SidebarMenuButton asChild>
                                                    <Link href={item.url}>
                                                        <item.icon />
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
