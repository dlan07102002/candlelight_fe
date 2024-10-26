import React from "react";

interface PaginationInterface {
    currentPage: number;
    total: number;
    paging: any;
}
const Pagination: React.FC<PaginationInterface> = (props) => {
    const pageList = [];

    if (props.currentPage === 1) {
        pageList.push(props.currentPage);
        if (props.total >= props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
        }
        if (props.total >= props.currentPage + 2) {
            pageList.push(props.currentPage + 2);
        }
    } else if (props.currentPage > 1) {
        // previous 2 page
        if (props.currentPage >= 3) {
            pageList.push(props.currentPage - 2);
        }
        // previous page
        if (props.currentPage >= 2) {
            pageList.push(props.currentPage - 1);
        }
        // current page
        pageList.push(props.currentPage);
        // next page
        if (props.total >= props.currentPage + 1) {
            pageList.push(props.currentPage + 1);
        }
        // next 2 page
        if (props.total >= props.currentPage + 2) {
            pageList.push(props.currentPage + 2);
        }
    }
    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" onClick={() => props.paging(1)}>
                    <button className="page-link">First Page</button>
                </li>
                {pageList.map((page) => (
                    <li
                        className="page-item"
                        key={page}
                        onClick={() => props.paging(page)}
                    >
                        <button
                            className={
                                "page-link " +
                                (props.currentPage === page ? "active" : "")
                            }
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li
                    className="page-item"
                    onClick={() => props.paging(props.total)}
                >
                    <button className="page-link">Last page</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
