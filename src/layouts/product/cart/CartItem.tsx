import React, { useState, useEffect } from "react";
import ProductModel from "../../../models/ProductModel";
import { deleteOd } from "../../../services/OrderDetailAPI";

const CartItem: React.FC<{
    item: any;
    updateQuantity: (id: number, quantity: number) => void;
    removeItemFE: (oId: number) => void;
}> = ({ item, updateQuantity, removeItemFE }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [totalProductPrice, setTotalProductPrice] = useState(
        item.quantity * item.sellPrice
    );

    useEffect(() => {
        isNaN(quantity)
            ? setTotalProductPrice(0)
            : setTotalProductPrice(quantity * item.sellPrice);
    }, [quantity, item.sellPrice]);

    const removeItem = async (odId: number) => {
        const response = await deleteOd(odId);
        console.log(response);
    };

    const handleRemove = (odId: number) => {
        removeItem(odId);
        removeItemFE(odId);
    };

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
            <td>${item.sellPrice.toFixed(2)}</td>
            <td>
                <input
                    type="number"
                    className="form-control mx-auto text-end"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    style={{ width: "60px" }}
                />
            </td>
            <td>${totalProductPrice.toFixed(2)}</td>
            <td>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemove(item.orderDetailId)}
                >
                    <i className="bi bi-trash"></i> Remove
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
