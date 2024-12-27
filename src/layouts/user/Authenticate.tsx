import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface IAuthenticate {
    isLogin: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Authenticate: React.FC<IAuthenticate> = ({ isLogin, setLogin }) => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthToken = async () => {
            const authCodeRegex = /code=([^&]+)/;
            const match = window.location.href.match(authCodeRegex);

            if (match) {
                const authCode = match[1];
                const authServerRegex = /type=([^&]+)/;
                const matchType = window.location.href.match(authServerRegex);

                const authServer = matchType ? matchType[1] : "";

                console.log(authServer);
                try {
                    // Request BE to exchange Token
                    const response = await fetch(
                        `http://localhost:8080/account/outbound/authentication?code=${authCode}&type=${authServer}`,
                        { method: "POST" }
                    );

                    if (!response.ok) {
                        throw new Error(
                            `Error ${response.status}: ${response.statusText}`
                        );
                    }

                    const data = await response.json();
                    localStorage.setItem("token", data.result?.jwt);
                    setLogin(true);
                } catch (err: any) {
                    console.error("Authentication error:", err.message);
                    setError("Authentication failed. Please try again.");
                }
            } else {
                setError("Invalid or missing authentication code.");
            }
        };

        fetchAuthToken();
    }, []);

    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    return (
        <div className="loading-container">
            <AiOutlineLoading3Quarters className="icon-style" />
            {error ? (
                <p className="textStyle" style={{ color: "red" }}>
                    {error}
                </p>
            ) : (
                <p className="textStyle">Authenticating...</p>
            )}
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

export default Authenticate;
