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
    isMobile,
    setSelected,
    setViewOpen,
    setOpen,
    setDialogConfig,
    setConfirmationDialogOpen,
    employees,
) => {
    const getSupervisorName = (supervisorId) => {
        const supervisor = employees.find(
            (employee) => employee.id === supervisorId,
        );
        return supervisor
            ? `${supervisor.firstname} ${supervisor.lastname}`
            : 'N/A';
    };

    const getEmployeeCount = (department) => {
        return employees.filter(
            (employee) => employee.department === department,
        ).length;
    };

    const columns = isMobile
        ? [
              {
                  accessorKey: 'name',
                  header: () => (
                      <span className="font-semibold capitalize">
                          Department Name
                      </span>
                  ),
                  cell: (row) => <p className="px-2 py-3">{row.name}</p>,
              },
              {
                  id: 'actions',
                  header: () => (
                      <span className="flex w-full justify-center text-center font-semibold capitalize">
                          Actions
                      </span>
                  ),
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
                                                  'flex w-full gap-3 bg-blue-500',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Update Department',
                                                  message:
                                                      'Are you sure you want to update this department?',
                                                  formAction:
                                                      'update department',
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
                                                  title: 'Delete department',
                                                  message:
                                                      'Are you sure you want to delete this department?',
                                                  formAction:
                                                      'delete department',
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
                  accessorKey: 'name',
                  header: 'Department Name',
                  cell: (row) => <p className="px-2 py-3">{row.name}</p>,
              },
              {
                  accessorKey: 'manager',
                  header: 'Manager',
                  cell: (row) => (
                      <p className="px-2 py-3">
                          {getSupervisorName(row.supervisor)}
                      </p>
                  ),
              },
              {
                  accessorKey: 'employee_count',
                  header: 'Employees',
                  cell: (row) => (
                      <p className="px-2 py-3">{getEmployeeCount(row.name)}</p>
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
                                          icon={<MdOutlineEdit />}
                                          text="Edit"
                                          type="button"
                                          style={{
                                              wrapper:
                                                  'flex w-full gap-3 bg-blue-500',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Update Department',
                                                  message:
                                                      'Are you sure you want to update this department?',
                                                  formAction:
                                                      'update department',
                                              });
                                              setSelected(row.id);
                                              console.log('update');
                                              setOpen(true);
                                          }}
                                      />
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                      <PrimaryButton
                                          icon={<MdOutlineDelete />}
                                          text="Delete"
                                          type="button"
                                          style={{
                                              wrapper:
                                                  'flex w-full gap-3 bg-red-500',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Delete Department',
                                                  message:
                                                      'Are you sure you want to delete this department?',
                                                  formAction:
                                                      'delete department',
                                              });
                                              setSelected(row.id);
                                              setConfirmationDialogOpen(true);
                                              console.log('delete');
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
