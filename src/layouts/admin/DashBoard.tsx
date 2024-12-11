import { useEffect, useState } from "react";
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
        const fetchUsersNumber = async () => {
            await countUsers()
                .then((data) => {
                    console.log(data);
                    setTotalUsers(data);
                })
                .catch((e) => console.log("Fetch user failed: " + e));
            await countProducts()
                .then((data) => {
                    console.log(data);
                    setTotalProducts(data);
                })
                .catch((e) => console.log("Fetch product failed: " + e));
            await countOrders()
                .then((data) => {
                    console.log(data);
                    setTotalOrders(data);
                })
                .catch((e) => console.log("Fetch order failed: " + e));
            await calculateRevenue()
                .then((data) => {
                    console.log(data);
                    setRevenue(data);
                })
                .catch((e) => console.log("Fetch revenue failed: " + e));
        };
        fetchUsersNumber();
    }, []);
    console.log(totalUsers);

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
export default DashBoard;
