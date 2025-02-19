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

const RoleColumns = (
    isMobile,
    setSelected,
    setOpen,
    setDialogConfig,
    setConfirmationDialogOpen,
) => {
    const columns = isMobile
        ? [
              {
                  accessorKey: 'job_title',
                  header: () => (
                      <span className="font-semibold capitalize text-white">
                          Job Title
                      </span>
                  ),
                  cell: (row) => <p className="px-2 py-3">{row.job_title}</p>,
              },
              {
                  id: 'actions',
                  header: () => (
                      <span className="flex w-full justify-center text-center font-semibold capitalize text-white">
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
                                                  'flex w-full gap-3 bg-blue-500 text-white',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Update Role',
                                                  message:
                                                      'Are you sure you want to update this role?',
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
                                                  title: 'Delete Role',
                                                  message:
                                                      'Are you sure you want to delete this role?',
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
                  accessorKey: 'job_title',
                  header: () => (
                      <span className="font-semibold capitalize text-white">
                          Job Title
                      </span>
                  ),
                  cell: (row) => <p className="px-2 py-3">{row.job_title}</p>,
              },
              {
                  accessorKey: 'job_description',
                  header: () => (
                      <span className="font-semibold capitalize text-white">
                          Job Description
                      </span>
                  ),
                  cell: (row) => (
                      <p className="line-clamp-2 px-2 py-3 text-xs capitalize">
                          {row.job_description ?? 'None'}
                      </p>
                  ),
              },
              {
                  id: 'actions',
                  header: () => (
                      <span className="flex w-full justify-center text-center font-semibold capitalize text-white">
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
                                                  'flex w-full gap-3 bg-blue-500 text-white',
                                          }}
                                          onClick={() => {
                                              setDialogConfig({
                                                  title: 'Update Role',
                                                  message:
                                                      'Are you sure you want to update this role?',
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
                                                  title: 'Delete Role',
                                                  message:
                                                      'Are you sure you want to delete this role?',
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

export default RoleColumns;
