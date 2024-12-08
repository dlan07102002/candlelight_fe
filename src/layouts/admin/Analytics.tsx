import { Line, Pie } from "recharts";
const data = {
    users: [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            status: "Active",
        },
    ],
    products: [
        {
            id: 1,
            name: "Product 1",
            category: "Electronics",
            price: 299.99,
            stock: 50,
            status: "In Stock",
        },
        {
            id: 2,
            name: "Product 2",
            category: "Clothing",
            price: 49.99,
            stock: 100,
            status: "In Stock",
        },
    ],
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
    categories: [
        { id: 1, name: "Electronics", products: 150 },
        { id: 2, name: "Clothing", products: 200 },
    ],
};
const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
];

const Analytics: React.FC = () => {
    return (
        <div className="admin-content-container shadow-sm">
            <div className="p-4">
                <h2 className="h5 fw-bold mb-4">Analytics</h2>
                <div className="row g-4">
                    <div className="col-12 col-lg-6">
                        <div className="card border rounded-lg p-4">
                            <h3 className="card-title fw-bold mb-4">
                                Sales Overview
                            </h3>
                            <Line data={salesData} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="card border rounded-lg p-4">
                            <h3 className="card-title fw-bold mb-4">
                                Category Distribution
                            </h3>
                            <Pie data={data.categories} dataKey={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Analytics;
