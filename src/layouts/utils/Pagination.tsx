import React from "react";

interface PaginationInterface {
    currentPage: number;
    total: number;
    paging: any;
}
const Pagination: React.FC<PaginationInterface> = ({
    currentPage,
    total,
    paging,
}) => {
    const pageList = [];

    if (currentPage === 1) {
        pageList.push(currentPage);
        if (total >= currentPage + 1) {
            pageList.push(currentPage + 1);
        }
        if (total >= currentPage + 2) {
            pageList.push(currentPage + 2);
        }
    } else if (currentPage > 1) {
        // previous 2 page
        if (currentPage >= 3) {
            pageList.push(currentPage - 2);
        }
        // previous page
        if (currentPage >= 2) {
            pageList.push(currentPage - 1);
        }
        // current page
        pageList.push(currentPage);
        // next page
        if (total >= currentPage + 1) {
            pageList.push(currentPage + 1);
        }
        // next 2 page
        if (total >= currentPage + 2) {
            pageList.push(currentPage + 2);
        }
    }
    return (
        <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
                <li
                    className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                    }`}
                    onClick={() => paging(1)}
                >
                    <button className="page-link">First Page</button>
                </li>

                {pageList.map((page) => (
                    <li
                        className={`page-item ${
                            currentPage === page ? "active" : ""
                        }`}
                        key={page}
                        onClick={() => paging(page)}
                    >
                        <button className="page-link">{page}</button>
                    </li>
                ))}

                <li
                    className={`page-item ${
                        currentPage === total ? "disabled" : ""
                    }`}
                    onClick={() => paging(total)}
                >
                    <button className="page-link">Last Page</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
