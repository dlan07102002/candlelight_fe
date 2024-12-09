import React, { useEffect, useState } from "react";
import {
    isUsernameExist,
    isEmailExists,
    register,
} from "../../services/UserAPI";
import UseDebounce from "../../hooks/UseDebounce";
import UserModel from "../../models/UserModel";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("PREFER_NOT_TO_SAY");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [notification, setNotification] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const usernameDebounced = UseDebounce(username, 100);
    const emailDebounced = UseDebounce(email, 100);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        if (
            usernameError === "" &&
            emailError === "" &&
            passwordError === "" &&
            confirmPasswordError === ""
        ) {
            const res = await register(
                new UserModel(
                    username,
                    email,
                    password,
                    phoneNumber,
                    firstName,
                    lastName,
                    gender
                )
            );
            console.log(res);
            if (res) {
                toast.success(
                    "Registration successful. Please check your email to activate your account"
                );
                setNotification(
                    "Registration successful. Please check your email to activate your account"
                );
            } else {
                setNotification("Registration failed");
            }
        }
    };

    // check username
    useEffect(() => {
        const fetchData = async () => {
            const response = await isUsernameExist(usernameDebounced + "");
            if (response) {
                setUsernameError("Username already exists!");
            }
            return response;
        };
        fetchData();
    }, [usernameDebounced]);

    // check email
    useEffect(() => {
        const fetchData = async () => {
            const response = await isEmailExists(emailDebounced + "");
            if (response) {
                setEmailError("Email already exists!");
            }
            return response;
        };
        fetchData();
    }, [emailDebounced]);

    // check password
    const passwordValidation = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must be at least 8 characters with one special character"
            );
            return true;
        } else {
            setPasswordError("");
            return false;
        }
    };

    const handleUsernameChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(e.target.value);
        setUsernameError("");
    };

    const handleEmailChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmail(e.target.value);
        setEmailError("");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        passwordValidation(e.target.value);
        setConfirmPasswordError("");
    };

    const confirmPasswordCheck = (confirmPassword: string) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError("Password does not match");
            return true;
        } else {
            setConfirmPasswordError("");
            return false;
        }
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmPassword(e.target.value);

        setConfirmPasswordError("");

        return confirmPasswordCheck(e.target.value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="container mt-5 p-4 border rounded bg-light row m-auto"
        >
            <h2 className="text-center mb-4">Create your account</h2>
            <div className="text-success">{notification}</div>
            <div className="col-lg-6">
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
                {usernameError && (
                    <div
                        className=" alert alert-danger  h-auto p-1 d-inline-block "
                        role="alert"
                        style={{ fontSize: "12px" }}
                    >
                        {usernameError}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                {emailError && (
                    <div
                        className="alert alert-danger  h-auto p-1 d-inline-block"
                        role="alert"
                    >
                        {emailError}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="col-lg-6">
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 position-relative">
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
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="position-absolute top-50 bottom-50 end-0 pe-3 border-0 bg-transparent"
                    >
                        {showPassword ? (
                            <FiEyeOff className="text-muted" />
                        ) : (
                            <FiEye className="text-muted" />
                        )}
                    </button>
                </div>
                {passwordError && (
                    <div
                        className="alert alert-danger  h-auto p-1 d-inline-block"
                        role="alert"
                    >
                        {passwordError}
                    </div>
                )}

                <div className="mb-3 position-relative">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        autoComplete="off"
                        className="form-control"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="position-absolute top-50 bottom-50 end-0 pe-3 border-0 bg-transparent"
                    >
                        {showConfirmPassword ? (
                            <FiEyeOff className="text-muted" />
                        ) : (
                            <FiEye className="text-muted" />
                        )}
                    </button>
                </div>
                {confirmPasswordError && (
                    <div
                        className="alert alert-danger  h-auto p-1 d-inline-block"
                        role="alert"
                    >
                        {confirmPasswordError}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                        Gender
                    </label>
                    <select
                        id="gender"
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="PREFER_NOT_TO_SAY">
                            Prefer not to say
                        </option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="btn btn-primary ">
                Register
            </button>
        </form>
    );
}

export default RegisterForm;
