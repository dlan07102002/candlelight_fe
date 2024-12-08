const Setting: React.FC = () => {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="h5 fw-bold mb-4">Settings</h2>
                <div className="mb-4">
                    <div className="border-bottom pb-4">
                        <h3 className="h6 fw-bold mb-4">Payment Settings</h3>
                        <div className="mb-4">
                            <label className="form-label">
                                Payment Gateway
                            </label>
                            <select className="form-select">
                                <option>Stripe</option>
                                <option>PayPal</option>
                                <option>Square</option>
                            </select>
                        </div>
                    </div>
                    <div className="border-bottom pb-4">
                        <h3 className="h6 fw-bold mb-4">Shipping Settings</h3>
                        <div className="mb-4">
                            <label className="form-label">
                                Default Shipping Method
                            </label>
                            <select className="form-select">
                                <option>Standard Shipping</option>
                                <option>Express Shipping</option>
                                <option>Free Shipping</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h3 className="h6 fw-bold mb-4">Role Management</h3>
                        <div className="mb-4">
                            <label className="form-label">
                                Default User Role
                            </label>
                            <select className="form-select">
                                <option>Customer</option>
                                <option>Admin</option>
                                <option>Manager</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Setting;
