import React from "react";
function Navbar() {
    return (
        // // <nav
        // //     className="navbar navbar-expand-lg navbar-dark bg-dark"
        // //     aria-label="Ninth navbar example"
        // // >
        // //     <div className="container-xl">
        // //         <a className="navbar-brand" href="#">
        // //             <img
        // //                 src="./src/assets/images/logo.svg"
        // //                 alt="Candle light"
        // //             />
        // //         </a>
        // //         <button
        // //             className="navbar-toggler"
        // //             type="button"
        // //             data-bs-toggle="collapse"
        // //             data-bs-target="#navbarsExample07XL"
        // //             aria-controls="navbarsExample07XL"
        // //             aria-expanded="false"
        // //             aria-label="Toggle navigation"
        // //         >
        // //             <span className="navbar-toggler-icon"></span>
        // //         </button>

        // //         <div
        // //             className="collapse navbar-collapse"
        // //             id="navbarsExample07XL"
        // //         >
        // //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        // //                 <li className="nav-item">
        // //                     <a
        // //                         className="nav-link active"
        // //                         aria-current="page"
        // //                         href="#"
        // //                     >
        // //                         Home
        // //                     </a>
        // //                 </li>
        // //                 <li className="nav-item">
        // //                     <a className="nav-link" href="#">
        // //                         Link
        // //                     </a>
        // //                 </li>
        // //                 <li className="nav-item">
        // //                     <a
        // //                         className="nav-link disabled"
        // //                         aria-disabled="true"
        // //                     >
        // //                         Disabled
        // //                     </a>
        // //                 </li>
        // //                 <li className="nav-item dropdown">
        // //                     <a
        // //                         className="nav-link dropdown-toggle"
        // //                         href="#"
        // //                         data-bs-toggle="dropdown"
        // //                         aria-expanded="false"
        // //                     >
        // //                         Dropdown
        // //                     </a>
        // //                     <ul className="dropdown-menu">
        // //                         <li>
        // //                             <a className="dropdown-item" href="#">
        // //                                 Action
        // //                             </a>
        // //                         </li>
        // //                         <li>
        // //                             <a className="dropdown-item" href="#">
        // //                                 Another action
        // //                             </a>
        // //                         </li>
        // //                         <li>
        // //                             <a className="dropdown-item" href="#">
        // //                                 Something else here
        // //                             </a>
        // //                         </li>
        // //                     </ul>
        // //                 </li>
        // //             </ul>
        // //             <form role="search">
        // //                 <input
        // //                     className="form-control"
        // //                     type="search"
        // //                     placeholder="Search"
        // //                     aria-label="Search"
        // //                 />
        // //             </form>
        // //         </div>
        // //     </div>
        // // </nav>
        // <nav
        //     className="navbar navbar-expand-lg navbar-dark bg-dark"
        //     aria-label="Main navigation"
        // >
        //     <div className="container-xl">
        //         <a className="navbar-brand" href="#">
        //             <img
        //                 src="./src/assets/images/logo.svg"
        //                 alt="Candle light"
        //             />
        //         </a>
        //         <button
        //             className="navbar-toggler"
        //             type="button"
        //             data-bs-toggle="collapse"
        //             data-bs-target="#navbarNav"
        //             aria-controls="navbarNav"
        //             aria-expanded="false"
        //             aria-label="Toggle navigation"
        //         >
        //             <span className="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                 <li className="nav-item">
        //                     <a
        //                         className="nav-link active"
        //                         aria-current="page"
        //                         href="#"
        //                     >
        //                         Home
        //                     </a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#">
        //                         Products
        //                     </a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#">
        //                         About Us
        //                     </a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#">
        //                         Contact
        //                     </a>
        //                 </li>
        //                 <li className="nav-item dropdown">
        //                     <a
        //                         className="nav-link dropdown-toggle"
        //                         href="#"
        //                         data-bs-toggle="dropdown"
        //                         aria-expanded="false"
        //                     >
        //                         Promotions
        //                     </a>
        //                     <ul className="dropdown-menu">
        //                         <li>
        //                             <a className="dropdown-item" href="#">
        //                                 Discounts
        //                             </a>
        //                         </li>
        //                         <li>
        //                             <a className="dropdown-item" href="#">
        //                                 New Arrivals
        //                             </a>
        //                         </li>
        //                         <li>
        //                             <a className="dropdown-item" href="#">
        //                                 Best Sellers
        //                             </a>
        //                         </li>
        //                     </ul>
        //                 </li>
        //             </ul>
        //             <form role="search" className="d-flex">
        //                 <input
        //                     className="form-control me-2"
        //                     type="search"
        //                     placeholder="Search for scented candles"
        //                     aria-label="Search"
        //                 />
        //                 <button
        //                     className="btn btn-outline-success"
        //                     type="submit"
        //                 >
        //                     Search
        //                 </button>
        //             </form>
        //         </div>
        //     </div>
        // </nav>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src="./src/assets/images/logo.svg"
                        alt="Candle light"
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                About Us
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Contact
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Promotions
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Discounts
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        New Arrivals
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Best Sellers
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Search Form */}
                <form className="d-flex">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>

                {/* Shopping Cart Icon */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-shopping-cart"></i>
                        </a>
                    </li>
                </ul>

                {/* Login Icon */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-user"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
