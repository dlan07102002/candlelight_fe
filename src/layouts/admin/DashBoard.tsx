import { useEffect, useState, memo } from "react";
import {
    FiUsers,
    FiPackage,
    FiShoppingCart,
    FiDollarSign,
} from "react-icons/fi";
import { countUsers } from "../../services/UserAPI";
import { calculateRevenue, countOrders } from "../../services/OrderAPI";
import { countProducts } from "../../services/ProductAPI";
const DashBoard: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [totalUsers, totalProducts, totalOrders, revenue] =
                    await Promise.all([
                        countUsers(),
                        countProducts(),
                        countOrders(),
                        calculateRevenue(),
                    ]);

                setTotalUsers(totalUsers);
                setTotalProducts(totalProducts);
                setTotalOrders(totalOrders);
                setRevenue(revenue);
            } catch (error) {
                console.error("Error fetching dashboard data: ", error);
                setTotalUsers(0);
                setTotalProducts(0);
                setTotalOrders(0);
                setRevenue(0);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
            <div className="col">
                <div className="card shadow-sm">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted mb-1">Total Users</p>
                            <h3 className="fw-bold mb-0">{totalUsers}</h3>
                        </div>
                        <FiUsers className="text-primary fs-2" />
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-sm">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted mb-1">Total Products</p>
                            <h3 className="fw-bold mb-0">{totalProducts}</h3>
                        </div>
                        <FiPackage className="text-success fs-2" />
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-sm">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted mb-1">Total Orders</p>
                            <h3 className="fw-bold mb-0">{totalOrders}</h3>
                        </div>
                        <FiShoppingCart className="text-purple fs-2" />
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-sm">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted mb-1">Revenue</p>
                            <h3 className="fw-bold mb-0">${revenue}</h3>
                        </div>
                        <FiDollarSign className="text-warning fs-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default memo(DashBoard);
