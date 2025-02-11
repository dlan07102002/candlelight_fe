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
        </div>
    );
};

export default CartItemsDetails;
