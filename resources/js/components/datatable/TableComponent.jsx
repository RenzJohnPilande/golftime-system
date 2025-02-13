import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const TableComponent = ({ data = [], caption, columns = [] }) => {
    return (
        <Table className="border">
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
                <TableRow
                    key={'header'}
                    className="bg-zinc-700 hover:bg-zinc-700"
                >
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
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="py-5 text-center"
                        >
                            The table has no record.
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((row, index) => (
                        <TableRow
                            key={row.id}
                            className={`${
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
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
    );
};

export default TableComponent;
