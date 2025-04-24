import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import Pagination from '../Pagination';

const TableComponent = ({
    data = [],
    caption,
    columns = [],
    rowsPerPage = 10,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
    );

    return (
        <div className="flex w-full flex-wrap space-y-4">
            <div className="w-full rounded-md border bg-white shadow-sm">
                <Table>
                    {caption && (
                        <TableCaption className="text-muted-foreground pb-2 text-sm">
                            {caption}
                        </TableCaption>
                    )}
                    <TableHeader>
                        <TableRow className="bg-gray-50 transition-colors hover:bg-gray-100">
                            {columns.map((column, index) => (
                                <TableHead
                                    key={index}
                                    className="px-4 py-3 font-medium text-gray-700"
                                >
                                    {column.header instanceof Function
                                        ? column.header()
                                        : column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="py-16 text-center"
                                >
                                    <div className="text-muted-foreground flex flex-col items-center justify-center">
                                        <p className="mb-1 text-lg">
                                            No records found
                                        </p>
                                        {searchQuery && (
                                            <p className="text-sm">
                                                Try adjusting your search query
                                            </p>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, index) => (
                                <TableRow
                                    key={row.id || index}
                                    className="border-t transition-colors hover:bg-gray-50"
                                >
                                    {columns.map((column, cellIndex) => (
                                        <TableCell
                                            key={`${row.id || index}-${column.accessorKey || column.id || cellIndex}`}
                                            className="px-4 py-3"
                                        >
                                            {column.cell
                                                ? column.cell(row)
                                                : row[column.accessorKey]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <div className="text-muted-foreground flex w-full justify-center text-sm">
                Showing {paginatedData.length} of {data.length} entries
            </div>
        </div>
    );
};

export default TableComponent;
