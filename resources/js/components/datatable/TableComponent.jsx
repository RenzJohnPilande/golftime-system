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
        <>
            <Table className="border">
                <TableCaption>{caption}</TableCaption>
                <TableHeader>
                    <TableRow className="bg-zinc-800 hover:bg-zinc-800">
                        {columns.map((column, index) => (
                            <TableHead
                                key={index}
                                className="w-fit px-4 font-semibold text-white"
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
                                className="py-5 text-center"
                            >
                                The table has no record.
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedData.map((row, index) => (
                            <TableRow
                                key={row.id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.accessorKey || column.id}
                                        className="max-w-[150px]"
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
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </>
    );
};

export default TableComponent;
