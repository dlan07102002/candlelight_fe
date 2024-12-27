import React, { memo } from "react";
import {
    FiUsers,
    FiPackage,
    FiShoppingCart,
    FiSettings,
    FiPieChart,
    FiGrid,
} from "react-icons/fi";

interface IAdminSidebar {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
const AdminSidebar: React.FC<IAdminSidebar> = ({ activeTab, setActiveTab }) => {
    return (
        <aside
            className="bg-white shadow-sm"
            style={{ width: "250px", minHeight: "100vh" }}
        >
            <nav className="mt-3 px-2">
                <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`btn  text-decoration-none btn-link w-100 text-start ${
                        activeTab === "dashboard" ? "bg-light" : "text-dark"
                    }`}
                >
                    <FiGrid
                        className="me-2"
                        style={{ width: "20px", height: "20px" }}
                    />
                    Dashboard
                </button>
                <button
                    onClick={() => setActiveTab("users")}
                    className={`btn text-decoration-none btn-link w-100 text-start ${
                        activeTab === "users" ? "bg-light" : "text-dark"
                    }`}
                >
                    <FiUsers
                        className="me-2"
                        style={{ width: "20px", height: "20px" }}
                    />
                    Users
                </button>
                <button
                    onClick={() => setActiveTab("products")}
                    className={`btn text-decoration-none btn-link w-100 text-start ${
                        activeTab === "products" ? "bg-light" : "text-dark"
                    }`}
                >
                    <FiPackage
                        className="me-2"
                        style={{ width: "20px", height: "20px" }}
                    />
                    Products
                </button>
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`btn text-decoration-none btn-link w-100 text-start ${
                        activeTab === "orders" ? "bg-light" : "text-dark"
                    }`}
                >
                    <FiShoppingCart
                        className="me-2"
                        style={{ width: "20px", height: "20px" }}
                    />
                    Orders
                </button>
                <button
                    onClick={() => setActiveTab("categories")}
                    className={`btn text-decoration-none btn-link w-100 text-start ${
                        activeTab === "categories" ? "bg-light" : "text-dark"
                    }`}
                >
                    <FiGrid
                        className="me-2"
                        style={{ width: "20px", height: "20px" }}
                    />
                    Categories
                </button>
                <button
                    onClick={() => setActiveTab("analytics")}
                    className={`btn text-decoration-none btn-link w-100 text-start ${
                        activeTab === "analytics" ? "bg-light" : "text-dark"
                    }`}
                >
                    <FiPieChart
                        className="me-2"
                        style={{ width: "20px", height: "20px" }}
                    />
                    Analytics
                </button>
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`btn text-decoration-none btn-link w-100 text-start ${
                        activeTab === "settings" ? "bg-light" : "text-dark"
                    }`}
                >
                    <FiSettings
                        className="me-2"
                        style={{ width: "20px", height: "20px" }}
                    />
                    Settings
                </button>
            </nav>
        </aside>
    );
};

export default memo(AdminSidebar);
