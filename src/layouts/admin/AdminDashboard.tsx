import React, { useState } from "react";

import DashBoard from "./DashBoard";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import CategoryManagement from "./CategoryManagement";
import Analytics from "./Analytics";
import Setting from "./Setting";
import { AdminNavbar } from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");

    return (
        <div className="min-vh-100 bg-light">
            <AdminNavbar />

            <div className="d-flex">
                <AdminSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <main className="flex-fill p-4">
                    {activeTab === "dashboard" && <DashBoard />}
                    {activeTab === "users" && (
                        <UserManagement
                            setModalType={setModalType}
                            setShowModal={setShowModal}
                        />
                    )}
                    {activeTab === "products" && (
                        <ProductManagement
                            setModalType={setModalType}
                            setShowModal={setShowModal}
                        />
                    )}
                    {activeTab === "orders" && <OrderManagement />}
                    {activeTab === "categories" && (
                        <CategoryManagement
                            setModalType={setModalType}
                            setShowModal={setShowModal}
                        />
                    )}
                    {activeTab === "analytics" && <Analytics />}
                    {activeTab === "settings" && <Setting />}
                </main>
            </div>

            {showModal && (
                <div className="position-fixed top-0 left-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
                    <div className="bg-white rounded p-4 w-100 w-md-50">
                        <h2 className="h5 fw-bold mb-4">
                            {modalType === "add-user"
                                ? "Add User"
                                : modalType === "add-product"
                                ? "Add Product"
                                : "Add Category"}
                        </h2>
                        <form className="space-y-3">
                            <div>
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="d-flex justify-content-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-outline-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
