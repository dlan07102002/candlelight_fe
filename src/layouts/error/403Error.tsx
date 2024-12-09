import { ReactNode } from "react";
import { FiLock } from "react-icons/fi";

interface IPermissionDenied {
    hasPermission: boolean;
    content: ReactNode;
}
const PermissionDenied: React.FC = () => {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div
                className="card shadow-lg"
                style={{ maxWidth: "24rem", width: "100%" }}
            >
                <div className="card-body text-center p-4">
                    <div className="d-flex justify-content-center mb-4">
                        <div className="bg-danger bg-opacity-10 rounded-circle p-3">
                            <FiLock className="text-danger" size={48} />
                        </div>
                    </div>
                    <h2 className="card-title h4 fw-bold text-dark">
                        Access Denied
                    </h2>
                    <div className="alert alert-danger mt-3">
                        You do not have permission to access this resource.
                    </div>
                    <p className="text-muted mt-2">
                        Please contact your administrator if you believe this is
                        an error.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-danger mt-4 px-4"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermissionDenied;
