import PrimaryButton from '@/components/PrimaryButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MdMoreHoriz, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

const DepartmentColumns = (
    setSelected,
    setOpen,
    setDialogConfig,
    setConfirmationDialogOpen,
) => {
    const columns = [
        {
            accessorKey: 'department_name',
            header: 'Department Name',
            cell: (row) => <p className="px-2 py-3">{row.department_name}</p>,
        },
        {
            accessorKey: 'manager',
            header: 'Manager',
            cell: (row) => <p className="px-2 py-3">{row.manager || 'N/A'}</p>,
        },
        {
            accessorKey: 'employee_count',
            header: 'Employees',
            cell: (row) => <p className="px-2 py-3">{row.employee_count}</p>,
        },
        {
            id: 'actions',
            header: () => <p className="text-center">Actions</p>,
            cell: (row) => (
                <div className="flex justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MdMoreHoriz />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <PrimaryButton
                                    icon={<MdOutlineEdit />}
                                    text="Edit"
                                    style={{
                                        wrapper:
                                            'flex w-full gap-3 bg-blue-500 text-white',
                                    }}
                                    onClick={() => {
                                        setDialogConfig({
                                            title: 'Update Department',
                                            message:
                                                'Are you sure you want to update this department?',
                                            formAction: 'update',
                                        });
                                        setSelected(row.id);
                                        setOpen(true);
                                    }}
                                />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <PrimaryButton
                                    icon={<MdOutlineDelete />}
                                    text="Delete"
                                    style={{
                                        wrapper:
                                            'flex w-full gap-3 bg-red-500 text-white',
                                    }}
                                    onClick={() => {
                                        setDialogConfig({
                                            title: 'Delete Department',
                                            message:
                                                'Are you sure you want to delete this department?',
                                            formAction: 'delete',
                                        });
                                        setSelected(row.id);
                                        setConfirmationDialogOpen(true);
                                    }}
                                />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

    return columns;
};

export default DepartmentColumns;
