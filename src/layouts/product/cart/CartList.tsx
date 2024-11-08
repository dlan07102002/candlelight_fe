import React, { useEffect, useState } from "react";
import OrderDetailModel from "../../../models/OrderDetailModel";
import { getProductByOrderDetailId } from "../../../services/OrderDetailAPI";
import CartItem from "./CartItem";

const CartList: React.FC<{
    orderDetails: OrderDetailModel[];
}> = ({ orderDetails }) => {
    const [cartItems, setCartItems] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const newCartItems: any = [];

            for (const od of orderDetails) {
                const product = await getProductByOrderDetailId(
                    od.orderDetailId
                );
                if (product) {
                    newCartItems.push({ ...product, ...od });
                }
            }

            setCartItems(newCartItems); // Avoid appending, just set once
        };

        fetchProducts();
    }, [orderDetails]);

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems((prevCartItems: any) =>
            prevCartItems.map((item: any) =>
                item.productId === id ? { ...item, quantity } : item
            )
        );
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

        isNaN(total) ? setTotalPrice(0) : setTotalPrice(total);
    };

    // Recalculate total price whenever cart items change
    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);
    return (
        <div className="row">
            <div className="py-5 col-8">
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
                </div>
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
