import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AccountActivate: React.FC = () => {
    const { email } = useParams();
    const { activateCode } = useParams();
    const [isActivate, setActivate] = useState(false);
    const [notification, setNotification] = useState("");
    const beHost = import.meta.env.VITE_BE_HOST;

    useEffect(() => {
        // window.location.search => get URL query, include "?"

        if (email && activateCode) {
            activate();
        }
    }, []);

    const activate = async () => {
        try {
            const endpoint: string = `${beHost}/account/activate?email=${email}&activateCode=${activateCode}`;
            const response = await fetch(endpoint, { method: "GET" });
            if (response.ok) {
                setActivate(true);
            } else {
                setNotification(response.text + "");
            }
        } catch (error) {
            console.log("Activation Error: ", error);
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div
                        className={`alert ${
                            isActivate ? "alert-success" : "alert-danger"
                        } text-center`}
                    >
                        <h1 className="display-4 mb-3">Account Activation</h1>
                        {isActivate ? (
                            <>
                                <p className="lead">
                                    Your account has been successfully
                                    activated. Please proceed to log in to
                                    access our services.
                                </p>
                                <a
                                    href="/login"
                                    className="btn btn-primary mt-3"
                                >
                                    Log In
                                </a>
                            </>
                        ) : (
                            <>
                                <p className="lead">
                                    Activation failed. Please try again or
                                    contact support for assistance.
                                    {notification}
                                </p>
                                <a
                                    href="/contact"
                                    className="btn btn-secondary mt-3"
                                >
                                    Contact Support
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AccountActivate;
