import React, { useContext, useEffect, useState, memo } from "react";
import CategoryModel from "../../../models/CategoryModel";
import { getAllCategories } from "../../../services/CategoryAPI";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../../App";
interface INavbar {
    setKeyWord: React.Dispatch<string>;
    isLogin: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const Navbar: React.FC<INavbar> = ({
    setKeyWord,
    isLogin,
    setLogin,
    setCurrentPage,
}) => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [inputValue, setInputValue] = useState("");
    const { setUserId } = useContext(MyContext);
    const navigate = useNavigate();

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
        setCurrentPage(1);
        setKeyWord(inputValue);
        navigate("/");
        setInputValue("");
    };

    const handleLogout = () => {
        setUserId && setUserId(0);
        localStorage.removeItem("token");
        setLogin(false);
    };

    const handleCartClick = () => {
        if (isLogin) {
            navigate("/cart");
        } else {
            navigate("/login", { state: { from: "/cart" } });
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="/assets/images/logo.svg" alt="Candle light" />
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
                            <NavLink
                                className="nav-link active"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className=" nav-item dropdown custom-nav-item custom-dropdown">
                            <NavLink
                                className="nav-link dropdown-toggle custom-nav-link custom-dropdown-toggle"
                                to="#"
                                aria-expanded="false"
                            >
                                Products
                            </NavLink>
                            <ul className=" dropdown-menu custom-dropdown-menu">
                                <li className="dropdown-header">CATEGORIES</li>
                                <li>
                                    <hr className="dropdown-divider" />
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
                            <NavLink className="nav-link" to="/about">
                                About Us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="#">
                                Contact
                            </NavLink>
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
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleSearch}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {/* Shopping Cart Icon */}
                <ul className="navbar-nav me-1">
                    <li className="nav-item">
                        <button className="nav-link" onClick={handleCartClick}>
                            <i className="fas fa-shopping-cart"></i>
                        </button>
                    </li>
                </ul>

                {/* Login Icon */}
                {isLogin ? (
                    <ul className="navbar-nav me-1">
                        <li className="nav-item">
                            <button
                                className="btn"
                                onClick={handleLogout}
                                style={{ color: "white" }}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav me-1">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                <i className="fas fa-user"></i>
                            </NavLink>
                        </li>
                    </ul>
                )}

                {/* <i class="fa-solid fa-right-from-bracket"></i> */}
            </div>
        </nav>
    );
};

export default memo(Navbar);
