import { useState } from "react";
import { login } from "../../services/UserAPI";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
    if (isLogin) {
        navigate("/");
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
            const response = await login(username, password)
                .then(() => {
                    setNotification("");
                    setLogin(true);
                    // forward to homepage
                    navigate("/");
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
                <div className="form-check d-flex">
                    <input
                        type="checkbox"
                        id="remember-me"
                        className="form-check-input"
                    />
                    <label htmlFor="remember-me" className=" m-auto ms-2">
                        Remember me
                    </label>
                </div>
                <button type="button" className="text-primary btn p-0 ">
                    Forgot password?
                </button>
            </div>
            <div className="text-center mt-3">
                <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary btn p-0">
                        Sign up here
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default Login;
