import React, { useContext, useEffect, useMemo, useState } from "react";
import { MyContext } from "../../../App";
import DeliveryDetail from "./order-review/DeliveryDetail";
import CartItemsDetails from "./order-review/CartItemsDetails";
import UserModel from "../../../models/UserModel";

interface ICartPaymentForm {
    cartItems: ICartItem[];
    totalAmount: number;
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserModel;
}

interface ICartItem {
    orderDetailId: number;
    productName: string;
    quantity: number;
    sellPrice: number;
}

const CartPaymentForm: React.FC<ICartPaymentForm> = ({
    cartItems,
    totalAmount,
    setShow,
    user,
}) => {
    const { userId } = useContext(MyContext); // Lấy thông tin userId từ context

    const [isLoading, setIsLoading] = useState(false);
    const [stage, setStage] = useState(1);

    const handleCancel = () => {
        setShow(false);
    };

    // Tối ưu tính toán subtotal, tax, và shipping bằng useMemo
    const { subtotal, tax, shipping } = useMemo(() => {
        const subtotalValue = cartItems.reduce(
            (acc, item) => acc + item.quantity * item.sellPrice,
            0
        );
        const taxValue = subtotalValue * 0.1; // Thuế giả định
        const shippingValue = 5.0; // Phí vận chuyển giả định
        return {
            subtotal: subtotalValue,
            tax: taxValue,
            shipping: shippingValue,
        };
    }, [cartItems]);
    const checkStage = () => {
        switch (stage) {
            case 1:
                return <DeliveryDetail user={user} />;
            case 2:
                return (
                    <CartItemsDetails
                        cartItems={cartItems}
                        totalAmount={totalAmount}
                    />
                );

            default:
                return (
                    <div className="total-amount mb-4">
                        <h4 className="text-center">
                            <strong>
                                Total Amount: ${totalAmount.toFixed(2)}
                            </strong>
                        </h4>
                        {cartItems.length > 0 && (
                            <p className="text-center mt-2">
                                <strong>Subtotal:</strong> $
                                {subtotal.toFixed(2)} <br />
                                <strong>Tax:</strong> ${tax.toFixed(2)} <br />
                                <strong>Shipping:</strong> $
                                {shipping.toFixed(2)}
                            </p>
                        )}
                    </div>
                );
        }
    };

    const handleContinue = () => {
        console.log(stage);
        setStage((prevState) => ++prevState);
    };

    return (
        <div className="overlay d-flex align-items-center justify-content-center">
            <div className="overlay-content shadow-lg rounded-lg bg-white h-100 d-flex flex-column">
                <h3 className="text-center order-review-header mb-0">
                    Order Review
                </h3>
                <div className="order-stage w-100 d-flex">
                    <ul className="payment-stages w-75">
                        <li>
                            <div
                                className="circle-number text-white mt-2"
                                onClick={() => setStage(1)}
                            >
                                <p className="payment-stage">1</p>
                            </div>
                            <span>Address</span>
                        </li>
                        <li style={{ flex: 2 }}>
                            <div
                                className="circle-number text-white mt-2"
                                onClick={() => setStage(2)}
                            >
                                <p className="payment-stage">2</p>
                            </div>
                            <span>Order Summary</span>
                        </li>
                        <li>
                            <div
                                className="circle-number text-white mt-2"
                                onClick={() => setStage(3)}
                            >
                                <p className="payment-stage">3</p>
                            </div>
                            <span>Payment</span>
                        </li>
                    </ul>
                </div>

                {checkStage()}

                <div className="stage-action mt-auto">
                    {/* Actions */}
                    <div className="checkout-actions text-center">
                        {userId > 0 ? (
                            <button
                                className="btn btn-primary w-50 py-2"
                                onClick={handleContinue}
                            >
                                Continue
                            </button>
                        ) : (
                            <button className="btn btn-secondary w-50 py-2">
                                Login to Proceed
                            </button>
                        )}
                    </div>
                    {/* Back to Cart */}
                    <div className="text-center">
                        <button
                            className="btn btn-secondary w-50 py-2 mt-2 mb-4"
                            onClick={handleCancel}
                        >
                            Back to Cart
                        </button>
                    </div>
                </div>

                {/* Loading Spinner */}
                <div className="loading-spinner text-center">
                    {isLoading && (
                        <div className="spinner-border" role="status"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPaymentForm;
