import PrimaryButton from '@/components/PrimaryButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    MdMoreHoriz,
    MdOutlineDelete,
    MdOutlineEdit,
    MdOutlineRemoveRedEye,
} from 'react-icons/md';

const EmployeeColumns = (
    isMobile,
    setSelected,
    setViewOpen,
    setOpen,
    setDialogConfig,
    setConfirmationDialogOpen,
) => {
    const columns = isMobile
        ? [
              {
                  accessorKey: 'employee',
                  header: 'Employee',
                  cell: (row) => (
                      <div className="flex w-full flex-wrap gap-1 px-2">
                          <div className="flex w-full flex-col">
                              <h1 className="text-sm font-medium text-zinc-900">
                                  {row.lastname}, {row.firstname}{' '}
                                  {row.middlename}
                              </h1>
                              <p className="text-xs text-zinc-400">
                                  {row.position}
                              </p>
                          </div>
                      </div>
                  ),
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
                                          icon={<MdOutlineRemoveRedEye />}
                                          text="View"
                                          style={{
                                              wrapper:
                                                  'flex w-full gap-3 bg-green-500',
                                          }}
                                          onClick={() => {
                                              setSelected(row.id);
                                              setViewOpen(true);
                                          }}
                                      />
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                      <PrimaryButton
                                          icon={<MdOutlineEdit />}
                                          text="Edit"
                                          style={{
                                              wrapper:
                                                  'flex w-full gap-3 bg-blue-500',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Update Employee',
                                                  message:
                                                      'Are you sure you want to save? The details can be modified again later',
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
                                                  'flex w-full gap-3 bg-red-500',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Delete Employee',
                                                  message:
                                                      'Are you sure you want to delete this employee? This action cannot be undone.',
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
          ]
        : [
              {
                  accessorKey: 'employee',
                  header: 'Employee',
                  cell: (row) => (
                      <div className="flex w-full flex-wrap gap-1 px-2">
                          <div className="flex w-full">
                              <h1 className="text-base font-medium">
                                  {row.lastname}, {row.firstname}{' '}
                                  {row.middlename}
                              </h1>
                          </div>
                          <div className="flex w-full">
                              <p className="text-xs text-zinc-600">
                                  {row.position}
                              </p>
                          </div>
                      </div>
                  ),
              },
              {
                  accessorKey: 'department',
                  header: 'Department',
                  cell: (row) => (
                      <div className="flex w-full flex-wrap gap-1 px-2">
                          <p className="text-xs capitalize text-zinc-600">
                              {row.department}
                          </p>
                      </div>
                  ),
              },
              {
                  accessorKey: 'salary',
                  header: 'Salary',
                  cell: (row) => (
                      <div className="flex w-full flex-wrap gap-1 px-2">
                          <p className="text-xs text-zinc-600">
                              {row.salary
                                  ? `₱${row.salary.toLocaleString()}`
                                  : 'N/A'}
                          </p>
                      </div>
                  ),
              },
              {
                  accessorKey: 'hire_date',
                  header: 'Hire Date',
                  cell: (row) => {
                      const formattedDate = new Date(
                          row.hire_date,
                      ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                      });
                      return (
                          <div className="flex w-full flex-wrap gap-1 px-2">
                              <p className="text-xs text-zinc-600">
                                  {formattedDate}
                              </p>
                          </div>
                      );
                  },
              },
              {
                  accessorKey: 'status',
                  header: 'Status',
                  cell: (row) => (
                      <div className="flex w-full flex-wrap gap-1 px-2">
                          <p
                              className={`min-w-[80px] rounded border px-2 py-1 text-center text-xs font-semibold capitalize text-white ${
                                  {
                                      active: 'bg-green-500',
                                      inactive: 'bg-red-500',
                                      terminated: 'bg-gray-500',
                                  }[row.status] || 'bg-gray-500'
                              }`}
                          >
                              {row.status}
                          </p>
                      </div>
                  ),
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
                                          icon={<MdOutlineRemoveRedEye />}
                                          text="View"
                                          style={{
                                              wrapper:
                                                  'flex w-full gap-3 bg-green-500',
                                          }}
                                          onClick={() => {
                                              setSelected(row.id);
                                              setViewOpen(true);
                                          }}
                                      />
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                      <PrimaryButton
                                          icon={<MdOutlineEdit />}
                                          text="Edit"
                                          style={{
                                              wrapper:
                                                  'flex w-full gap-3 bg-blue-500',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Update Employee',
                                                  message:
                                                      'Are you sure you want to save? The details can be modified again later',
                                                  formAction: 'update employee',
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
                                                  'flex w-full gap-3 bg-red-500',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Delete Employee',
                                                  message:
                                                      'Are you sure you want to delete this employee? This action cannot be undone.',
                                                  formAction: 'delete employee',
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

export default EmployeeColumns;
