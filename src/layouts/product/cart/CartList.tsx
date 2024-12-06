import React, { useContext, useEffect, useState } from "react";
import { getProductByOrderDetailId } from "../../../services/OrderDetailAPI";
import CartItem from "./CartItem";
import { updateQuantity as updateOdQuantity } from "../../../services/OrderDetailAPI";
import "../../../App.css";
import { MyContext } from "../../../App";
import { getLatestOrderAndOrderDetailByUserId } from "../../../services/OrderAPI";
import OrderDetailModel from "../../../models/OrderDetailModel";

const CartList: React.FC = () => {
    const [cartItems, setCartItems] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [orderDetails, setOrderDetails] = useState<OrderDetailModel[]>([]);
    const { userId } = useContext(MyContext);
    useEffect(() => {
        if (userId > 0) {
            getLatestOrderAndOrderDetailByUserId(userId)
                .then((response) => {
                    setOrderDetails(response.orderDetailList);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userId]);

    useEffect(() => {
        const fetchProducts = async () => {
            const newCartItems: any = [];

            for (const od of orderDetails) {
                try {
                    const product = await getProductByOrderDetailId(
                        od.orderDetailId
                    );
                    if (product) {
                        const stockQuantity = product.quantity;
                        console.log(orderDetails);
                        newCartItems.push({
                            ...product,
                            ...od,
                            quantity: od.quantity,
                            stockQuantity: stockQuantity,
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }

            setCartItems(newCartItems); // Avoid appending, just set once
        };

        fetchProducts();
    }, [orderDetails]);

    const updateQuantity = async (id: number, quantity: number) => {
        setCartItems((prevCartItems: any) =>
            prevCartItems.map((item: any) => {
                return item.orderDetailId === id ? { ...item, quantity } : item;
            })
        );

        const response = await updateOdQuantity(id, quantity);
        console.log(response);
    };

    const removeItem = (oId: number) => {
        setCartItems((prevCartItems: any) =>
            prevCartItems.filter((item: any) => item.orderDetailId !== oId)
        );
    };

    const calculateTotalPrice = () => {
        const total = cartItems.reduce(
            (sum: number, item: any) => sum + item.sellPrice * item.quantity,
            0
        );

        setTotalPrice(isNaN(total) ? 0 : total);
    };

    // Recalculate total price whenever cart items change
    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]); // Depend on cartItems, not totalPrice

    return (
        <div className="py-5 ">
            <h2 className="text-center mb-5">Shopping Cart</h2>
            <div className="table-responsive container">
                <table className="table table-hover  text-center table-bordered border-primary">
                    <thead className=" text-uppercase">
                        <tr>
                            <th scope="col" className="cart-table-head">
                                Product
                            </th>
                            <th scope="col" className="cart-table-head">
                                Price
                            </th>
                            <th scope="col" className="cart-table-head">
                                Quantity
                            </th>
                            <th scope="col" className="cart-table-head">
                                Total
                            </th>
                            <th scope="col" className="cart-table-head">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(
                            (
                                item: any,
                                index: React.Key | null | undefined
                            ) => (
                                <CartItem
                                    key={index}
                                    item={item}
                                    removeItemFE={removeItem}
                                    updateQuantity={updateQuantity}
                                />
                            )
                        )}
                        <tr className="fw-bold">
                            <td colSpan={3} className="text-end">
                                Total
                            </td>
                            <td colSpan={2}>${totalPrice.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-end mt-4">
                    <button className="btn btn-lg btn-primary px-5">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartList;
