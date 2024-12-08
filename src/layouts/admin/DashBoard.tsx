import {
    FiUsers,
    FiPackage,
    FiShoppingCart,
    FiDollarSign,
} from "react-icons/fi";
const DashBoard: React.FC = () => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
            <div className="col">
                <div className="card shadow-sm">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted mb-1">Total Users</p>
                            <h3 className="fw-bold mb-0">1,234</h3>
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
                            <h3 className="fw-bold mb-0">456</h3>
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
                            <h3 className="fw-bold mb-0">789</h3>
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
                            <h3 className="fw-bold mb-0">$12,345</h3>
                        </div>
                        <FiDollarSign className="text-warning fs-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashBoard;
