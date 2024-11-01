import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}

const RequiredAdmin = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    const Component: React.FC<P> = (props) => {
        const navigate = useNavigate();

        const token = localStorage.getItem("token");

        useEffect(() => {
            if (!token) {
                navigate("/login");
                return;
            } else {
                const decodedToken = jwtDecode(token) as JwtPayload;

                // isAdmin to accept user admin navigate to Admin's page (each action in this page required attached jwt to sent to Server)
                const isAdmin = decodedToken.isAdmin;

                if (!isAdmin) {
                    navigate("/403-error");
                    return;
                }
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
    return Component;
};
export default RequiredAdmin;
