import { useEffect, useState } from "react";
import { getOrdersWithPaging } from "../../services/OrderAPI";
import Pagination from "../utils/Pagination";

const data = {
    orders: [
        {
            id: 1,
            customer: "John Doe",
            date: "2024-01-15",
            total: 299.99,
            status: "Delivered",
        },
        {
            id: 2,
            customer: "Jane Smith",
            date: "2024-01-14",
            total: 149.99,
            status: "Processing",
        },
    ],
};

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrdersWithPaging(currentPage - 1);
                console.log(response.res);
                setOrders(response.res);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.log("Error fetching orders: " + error);
            }
        };
        fetchOrders();
    }, [currentPage]);

    const paging = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="admin-content-container shadow-sm">
            <div className="p-4">
                <h2 className="h5 fw-bold mb-4">Order Management</h2>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Order ID</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Date</th>
                                <th scope="col">Total</th>
                                <th scope="col">Delivery Status</th>
                                <th scope="col">Payment Status</th>

                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>#{order.orderId}</td>
                                    <td>{order.username}</td>
                                    <td>{order.createdAt}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.deliveryStatus}</td>
                                    <td>{order.paymentStatus}</td>

                                    <td>
                                        <button className="btn btn-link text-primary">
                                            Update Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        total={totalPages}
                        paging={paging}
                    />
                </div>
            </div>
        </div>
    );
};
export default OrderManagement;
