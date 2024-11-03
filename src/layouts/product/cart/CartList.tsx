import React, { useEffect, useState } from "react";
import {
    getLatestOrderAndOrderDetailByUserId,
    getOrdersByUserId,
} from "../../../services/OrderAPI";

const CartList: React.FC<{ userId: number }> = ({ userId }) => {
    // Danh sách các sản phẩm trong giỏ hàng, có thể cập nhật danh sách này từ API hoặc Context
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Scented Candle - Vanilla",
            price: 100000,
            quantity: 2,
        },
        {
            id: 2,
            name: "Scented Candle - Lavender",
            price: 120000,
            quantity: 1,
        },
    ]);
    console.log(userId);

    useEffect(() => {
        if (userId > 0) {
            getLatestOrderAndOrderDetailByUserId(userId).then((response) => {
                console.log(response.orderDetailList);
            });
        }
    }, [userId]);

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = (id: number, quantity: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeItem = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Tính tổng giá
    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    return (
        <div className="container row">
            <div className=" py-5">
                <h2 className="text-center mb-5">Shopping Cart</h2>
                <div className="table-responsive">
                    <table className="table table-hover align-middle text-center">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id} className="align-middle">
                                    <td className="text-start">
                                        <strong>{item.name}</strong>
                                    </td>
                                    <td>
                                        {item.price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(
                                                    item.id,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            min="1"
                                            style={{ width: "60px" }}
                                        />
                                    </td>
                                    <td>
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <i className="bi bi-trash"></i>{" "}
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="fw-bold">
                                <td colSpan={3} className="text-end">
                                    Total
                                </td>
                                <td colSpan={2}>
                                    {calculateTotal().toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <button className="btn btn-lg btn-primary px-5">
                        Checkout
                    </button>
                </div>
            </div>
            <div>{/* <CartPayment /> */}</div>
        </div>
    );
};

export default CartList;
