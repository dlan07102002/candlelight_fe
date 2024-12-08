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
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.orders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.date}</td>
                                    <td>${order.total}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button className="btn btn-link text-primary">
                                            Update Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default OrderManagement;
