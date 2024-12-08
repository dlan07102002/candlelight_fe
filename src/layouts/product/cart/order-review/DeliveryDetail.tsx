import { useState } from "react";
import UserModel from "../../../../models/UserModel";
interface IDeliveryDetail {
    user: UserModel;
}
const DeliveryDetail: React.FC<IDeliveryDetail> = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newAddress, setNewAddress] = useState(user.deliveryAddress); // Lưu địa chỉ mới khi người dùng chỉnh sửa
    const [typeOfAddress, setTypeOfAddress] = useState("HOME");

    const handleAddressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewAddress(event.target.value);
    };

    const handleSaveAddress = () => {
        setIsEditing(false); // Tắt chế độ chỉnh sửa
    };
    return (
        <div>
            <div className="order-details mb-3">
                <h4 className="text-center mb-3">Delivery</h4>
                <p className="ms-3 mt-3">
                    Shipping address:{" "}
                    <em>
                        {isEditing ? (
                            <input
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        handleSaveAddress();
                                    } else if (e.key === "Escape") {
                                        handleSaveAddress();
                                    }
                                }}
                                type="text"
                                value={newAddress}
                                onChange={handleAddressChange}
                                onBlur={handleSaveAddress}
                                autoFocus
                            />
                        ) : (
                            newAddress || "N/A"
                        )}
                    </em>
                    {!isEditing && (
                        <i
                            onClick={() => setIsEditing(true)}
                            className="fa-solid fa-pen-to-square ms-2"
                            style={{ color: "#000000", cursor: "pointer" }}
                        ></i>
                    )}
                </p>
                <p className="ms-3 mt-3">
                    Email address: <em>{user.email}</em>
                </p>
                <p className="ms-3 mt-3">
                    Phone number: <em>{user.phoneNumber}</em>
                </p>
            </div>
            <div className="ms-3">
                <div className="d-flex  ">
                    <label htmlFor="type_of_address" className="">
                        <h6 className="mt-2 me-2">Type of address:</h6>
                    </label>

                    <select
                        id="type_of_address"
                        className="form-select w-25"
                        value={typeOfAddress}
                        onChange={(e) => setTypeOfAddress(e.target.value)}
                        required
                    >
                        <option value="HOME">Home</option>
                        <option value="OFFICE">Office</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDetail;
