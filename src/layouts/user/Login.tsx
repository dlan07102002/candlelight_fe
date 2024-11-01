import { useState } from "react";
import { login } from "../../services/UserAPI";
import { useNavigate } from "react-router-dom";
interface LoginInterface {
    isLogin: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login: React.FC<LoginInterface> = ({ isLogin, setLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();
    if (isLogin) {
        navigate("/");
        return;
    }
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (username.trim() !== "" && password.trim() !== "") {
            const response = await login(username, password)
                .then((res) => {
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
            <h2 className="text-center mb-4">Login</h2>
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

            <div className="mb-4">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
