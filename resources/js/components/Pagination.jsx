import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        for (
            let i = Math.max(1, currentPage - 1);
            i <= Math.min(totalPages, currentPage + 1);
            i++
        ) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex w-full justify-center">
            <div className="mt-4 flex items-center space-x-2">
                <button
                    className="rounded border bg-gray-200 px-4 py-2 text-xs disabled:opacity-50"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <MdChevronLeft className="h-4 w-4" />
                </button>

                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`rounded border px-4 py-2 text-xs ${
                            page === currentPage
                                ? 'bg-zinc-700 text-white'
                                : 'bg-gray-200'
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="rounded border bg-gray-200 px-4 py-2 text-xs disabled:opacity-50"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <MdChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
