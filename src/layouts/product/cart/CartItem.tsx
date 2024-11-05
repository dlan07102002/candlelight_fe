import React, { useState, useEffect } from "react";
import ProductModel from "../../../models/ProductModel";

const CartItem: React.FC<{
    item: any;
    updateQuantity: (id: number, quantity: number) => void;
}> = ({ item, updateQuantity }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [totalProductPrice, setTotalProductPrice] = useState(
        item.quantity * item.sellPrice
    );

    useEffect(() => {
        setTotalProductPrice(quantity * item.sellPrice);
    }, [quantity, item.sellPrice]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateQuantity(item.productId, newQuantity);
    };

    return (
        <tr key={item.productId} className="align-middle">
            <td className="text-end">
                <strong>{item.productName}</strong>
            </td>
            <td>{item.sellPrice.toFixed(2)}</td>
            <td>
                <input
                    type="number"
                    className="form-control text-center"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    style={{ width: "60px" }}
                />
            </td>
            <td>{totalProductPrice.toFixed(2)}</td>
            <td>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                        /* handle remove */
                    }}
                >
                    <i className="bi bi-trash"></i> Remove
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
