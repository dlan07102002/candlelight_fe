import React, { useEffect, useState } from "react";
import CategoryModel from "../../models/CategoryModel";
import { getAllCategories } from "../../services/CategoryAPI";
import { Link } from "react-router-dom";
interface NavbarInterface {
    // keyword: string;
    setKeyWord: React.Dispatch<string>;
}
const Navbar: React.FC<NavbarInterface> = (props) => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        getAllCategories()
            .then((response) => setCategories(response.res))
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn không cho form submit
        if (inputValue !== "") {
            handleSearch();
        }
        // Xử lý logic submit ở đây
    };
    const handleSearch = () => {
        props.setKeyWord(inputValue);
        setInputValue("");
    };

    return (
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
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        <li className=" nav-item dropdown custom-nav-item custom-dropdown">
                            <a
                                className="nav-link dropdown-toggle custom-nav-link custom-dropdown-toggle"
                                href="#"
                                aria-expanded="false"
                            >
                                Products
                            </a>
                            <ul className=" dropdown-menu custom-dropdown-menu">
                                <li>
                                    <a
                                        className="custom-dropdown-item dropdown-item"
                                        href="#"
                                    >
                                        Category
                                    </a>
                                </li>
                                {categories.map((category) => (
                                    <li key={category.categoryId}>
                                        <Link
                                            className="custom-dropdown-item dropdown-item"
                                            to={"/" + category.categoryId}
                                        >
                                            {category.categoryName}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
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
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={handleSearch}
                    >
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
};

export default Navbar;
