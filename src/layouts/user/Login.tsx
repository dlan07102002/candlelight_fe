import { useState } from "react";
import { login } from "../../services/UserAPI";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {
    OAuthGGConfig,
    OAuthGHConfig,
} from "../../configuration/configuration";
import { v4 as uuidv4 } from "uuid";
interface LoginInterface {
    isLogin: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginInterface> = ({ isLogin, setLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    if (isLogin) {
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
        return;
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (username.trim() !== "" && password.trim() !== "") {
            await login(username, password)
                .then(() => {
                    setNotification("");
                    setLogin(true);
                    const redirectPath = location.state?.from || "/";
                    navigate(redirectPath);
                })
                .catch((err) => {
                    console.log(err);
                    setNotification("Invalid username or password");
                });
        }
    };
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleContinueGG = () => {
        const callbackUri = OAuthGGConfig.redirectUri;
        const authUrl = OAuthGGConfig.authUri;
        const googleClientId = OAuthGGConfig.clientId;
        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUri
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
        console.log(targetUrl);

        // response_type=code -> authorization grant type, response_type=token -> implicit
        console.log(targetUrl);
        // Điều hướng người dùng đến URL xác thực
        window.location.href = targetUrl;
    };

    const handleContinueGithub = () => {
        const callbackUri = OAuthGHConfig.redirectUri;
        const authUrl = OAuthGHConfig.authUri;
        const githubClientId = OAuthGHConfig.clientId;
        const targetUrl = `${authUrl}?client_id=${githubClientId}&scope=user:email&redirect_uri=${encodeURIComponent(
            callbackUri
        )}&state=${uuidv4()}`;
        window.location.href = targetUrl;
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="container mt-5 p-5 border rounded bg-light shadow-sm"
            style={{ maxWidth: "450px" }}
        >
            <h2 className="text-center mb-4">Welcome back</h2>
            {notification ? (
                <div className="text-danger text-center mb-3">
                    {notification}
                </div>
            ) : (
                <></>
            )}

            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
            </div>

            <div className="mb-4 position-relative">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="position-absolute top-50 bottom-50 end-0 pe-3 border-0 bg-transparent"
                >
                    {showPassword ? (
                        <FiEyeOff className="text-muted" />
                    ) : (
                        <FiEye className="text-muted" />
                    )}
                </button>
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                    Login
                </button>
            </div>
            <div className="d-flex justify-content-between mb-3 mt-3 align-items-center">
                <button type="button" className="text-primary btn p-0 ">
                    Forgot password?
                </button>
            </div>

            <div className="mt-3">
                <div className="position-relative">
                    <div
                        className="position-absolute w-100 d-flex align-items-center"
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                        <hr className="w-100 text-secondary" />
                    </div>
                    <div
                        className="text-center position-relative text-muted d-inline-block px-2 "
                        style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#f8f9fa",
                        }}
                    >
                        Or continue with
                    </div>
                </div>

                <div className="mt-3 row g-3">
                    <div className="col">
                        <button
                            type="button"
                            onClick={handleContinueGG}
                            className="btn w-100 border rounded py-2 d-flex align-items-center justify-content-center bg-white text-muted"
                        >
                            <FaGoogle className="me-2 text-danger" />
                            <span>Google</span>
                        </button>
                    </div>

                    <div className="col">
                        <button
                            type="button"
                            onClick={handleContinueGithub}
                            className="btn w-100 border rounded py-2 d-flex align-items-center justify-content-center bg-white text-muted"
                        >
                            <FaGithub className="me-2 text-dark" />
                            <span>GitHub</span>
                        </button>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary btn p-0">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
};

export default Login;
