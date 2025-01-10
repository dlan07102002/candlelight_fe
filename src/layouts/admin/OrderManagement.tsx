import { useEffect, useState } from "react";
import { getOrdersWithPaging } from "../../services/OrderAPI";
import Pagination from "../utils/Pagination";
import OrderItem from "./OrderItem";
import OrderModel from "../../models/OrderModel";

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrdersWithPaging(currentPage - 1);
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
                                <OrderItem
                                    key={order.orderId}
                                    order={order}
                                    deliveryStatus={order.deliveryStatus}
                                    paymentStatus={order.paymentStatus}
                                />
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
