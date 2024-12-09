import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from "react-icons/fi";
import InputField from "./InputField";

const UserEditForm = () => {
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("PREFER_NOT_TO_SAY");
    const [showPassword, setShowPassword] = useState(false);
    const [orderAddress, setOrderAddress] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");

    const [errors, setErrors] = useState<any>({});

    const validateForm = () => {
        const newErrors: any = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\+?[1-9]\d{9,14}$/.test(phoneNumber)) {
            newErrors.phoneNumber = "Invalid phone number format";
        }

        if (!firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        if (!gender) {
            newErrors.gender = "Please select a gender";
        }

        if (!orderAddress.trim()) {
            newErrors.orderAddress = "Order address is required";
        }

        if (!deliveryAddress.trim()) {
            newErrors.deliveryAddress = "Delivery address is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", {
                userId,
                username,
                email,
                firstName,
                lastName,
                phoneNumber,
                password,
                gender,
                orderAddress,
                deliveryAddress,
            });
            alert("User updated successfully!");
        }
    };

    return (
        <div className="container py-5 ">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="admin-content-container shadow-sm p-4">
                        <div className="">
                            <h2 className=" text-center mb-4">
                                Update User Information
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <InputField
                                    icon={FiUser}
                                    label="User ID"
                                    name="userId"
                                    value={userId}
                                    setState={setUserId}
                                    readOnly
                                />
                                <InputField
                                    icon={FiUser}
                                    label="Username"
                                    name="username"
                                    value={username}
                                    error={errors.username}
                                    setState={setUsername}
                                />

                                <InputField
                                    icon={FiMail}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    error={errors.email}
                                    setState={setEmail}
                                />
                                <InputField
                                    icon={FiPhone}
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    error={errors.phoneNumber}
                                    setState={setPhoneNumber}
                                />
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <InputField
                                            icon={FiUser}
                                            label="First Name"
                                            name="firstName"
                                            value={firstName}
                                            error={errors.firstName}
                                            setState={setFirstName}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <InputField
                                            icon={FiUser}
                                            label="Last Name"
                                            name="lastName"
                                            value={lastName}
                                            error={errors.lastName}
                                            setState={setLastName}
                                        />
                                    </div>
                                </div>
                                <InputField
                                    icon={FiLock}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    isPassword={true}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    error={errors.password}
                                    setState={setPassword}
                                />
                                <div className="mb-3">
                                    <label
                                        htmlFor="gender"
                                        className="form-label"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        className="form-select"
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="PREFER_NOT_TO_SAY">
                                            Prefer not to say
                                        </option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    {errors.gender && (
                                        <div className="invalid-feedback">
                                            {errors.gender}
                                        </div>
                                    )}
                                </div>
                                <InputField
                                    icon={FiMapPin}
                                    label="Order Address"
                                    name="orderAddress"
                                    value={orderAddress}
                                    error={errors.orderAddress}
                                    setState={setOrderAddress}
                                />
                                <InputField
                                    icon={FiMapPin}
                                    label="Delivery Address"
                                    name="deliveryAddress"
                                    value={deliveryAddress}
                                    error={errors.deliveryAddress}
                                    setState={setDeliveryAddress}
                                />
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEditForm;
