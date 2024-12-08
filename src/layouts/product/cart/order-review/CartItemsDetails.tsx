import { useState } from "react";

interface ICartItem {
    orderDetailId: number;
    productName: string;
    quantity: number;
    sellPrice: number;
}

interface ICartItemsDetails {
    cartItems: ICartItem[];
    totalAmount: number;
}

const CartItemsDetails: React.FC<ICartItemsDetails> = ({ cartItems }) => {
    const [specialInstructions, setSpecialInstructions] = useState("");

    return (
        <div className="order-details mb-3 " style={{ height: "30%" }}>
            <h4 className="mb-3 text-center">Order Summary</h4>
            <ul
                className="list-group overflow-auto"
                style={{ height: "100px" }}
            >
                {cartItems.length === 0 ? (
                    <li className="list-group-item text-center">
                        No items in the cart
                    </li>
                ) : (
                    cartItems.map((item) => (
                        <li
                            key={item.orderDetailId}
                            className="list-group-item"
                        >
                            <div>
                                <strong>{item.productName}:</strong>
                            </div>
                            <div>
                                {item.quantity} x ${item.sellPrice.toFixed(2)} =
                                ${(item.quantity * item.sellPrice).toFixed(2)}
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {/* Special Instructions */}
            <div className="order-details mb-3">
                <h4 className="text-center mb-3">Special Instructions</h4>
                <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Any specific requests or instructions for your order"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default CartItemsDetails;
