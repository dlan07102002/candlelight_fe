import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from "react-icons/fi";
import InputField from "./InputField";

interface IUserEditForm {
    setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
    user?: any;
}
const UserEditForm: React.FC<IUserEditForm> = ({ setShowUpdateForm, user }) => {
    console.log("user edit");
    const [userId, setUserId] = useState(user.userId ? user.userId : "");
    const [username, setUsername] = useState(
        user.username ? user.username : ""
    );
    const [email, setEmail] = useState(user.email ? user.email : "");
    const [firstName, setFirstName] = useState(
        user.firstName ? user.firstName : ""
    );
    const [lastName, setLastName] = useState(
        user.lastName ? user.lastName : ""
    );
    const [phoneNumber, setPhoneNumber] = useState(
        user.phoneNumber ? user.phoneNumber : ""
    );
    const [password, setPassword] = useState(
        user.password ? user.password : ""
    );
    const [gender, setGender] = useState(
        user.gender ? user.gender : "PREFER_NOT_TO_SAY"
    );
    const [showPassword, setShowPassword] = useState(false);
    const [orderAddress, setOrderAddress] = useState(
        user.orderAddress ? user.orderAddress : ""
    );
    const [deliveryAddress, setDeliveryAddress] = useState(
        user.deliveryAddress
    );

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
        <div className="overlay d-flex" style={{ zIndex: 10 }}>
            <div
                className="overlay-content container m-auto"
                style={{ maxWidth: "800px", maxHeight: "fit-content" }}
            >
                <div className=" justify-content-center  bg-white">
                    <div className="admin-content-container shadow-sm p-4 ">
                        <h2 className=" text-center mb-4">
                            Update User Information
                        </h2>
                        <form onSubmit={handleSubmit} className="row">
                            <div className="col-6">
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
                            </div>

                            <div className="col-6 ">
                                <InputField
                                    icon={FiUser}
                                    label="First Name"
                                    name="firstName"
                                    value={firstName}
                                    setState={setFirstName}
                                />

                                <InputField
                                    icon={FiUser}
                                    label="Last Name"
                                    name="lastName"
                                    value={lastName}
                                    setState={setLastName}
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
                                        className="form-select "
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
                            </div>
                            <div className="text-center d-flex mt-3 justify-content-evenly">
                                <button
                                    type="submit"
                                    className="btn btn-primary "
                                    style={{ width: "6rem" }}
                                >
                                    Update
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-danger "
                                    style={{ width: "6rem" }}
                                    onClick={() => setShowUpdateForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEditForm;
