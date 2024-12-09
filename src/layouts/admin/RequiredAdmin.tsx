import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
    exp: number; // Add expiration timestamp if present in your JWT
}
// Higher-Order Component (HOC) aims to restrict access to a component based on the isAdmin flag from a JWT
const RequiredAdmin = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const Component: React.FC<P> = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem("token");

            if (!token) {
                // Redirect to login if no token
                navigate("/login");
                return;
            }

            try {
                const decodedToken = jwtDecode<JwtPayload>(token);

                // Check if the token has expired
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp && decodedToken.exp < currentTime) {
                    localStorage.removeItem("token"); // Clear expired token
                    navigate("/login");
                    return;
                }

                // Redirect if the user is not an admin
                if (!decodedToken.isAdmin) {
                    navigate("/403-error");
                    return;
                }
            } catch (error) {
                console.error("Invalid token", error);
                navigate("/login"); // Handle invalid token case
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };

    return Component;
};

export default RequiredAdmin;
