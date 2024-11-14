import React, { useState, useEffect } from "react";
import ProductModel from "../../../models/ProductModel";
import { deleteOd, updateOdQuantity } from "../../../services/OrderDetailAPI";

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
        const newTotalPrice = isNaN(quantity) ? 0 : quantity * item.sellPrice;
        setTotalProductPrice(newTotalPrice);
        updateQuantity(item.productId, quantity);
        const fetchAPI = async () => {
            const response = await updateOdQuantity(
                item.orderDetailId,
                quantity
            );
            console.log("Updated State: " + response);
        };
        fetchAPI();
    }, [quantity, item.sellPrice]);

    const removeItem = async (odId: number) => {
        try {
            const response = await deleteOd(odId);
            if (response) {
                console.log("Delete successful");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = (odId: number) => {
        removeItem(odId);
        removeItemFE(odId);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (!isNaN(Number(value))) {
            let newQuantity = Number(value);
            if (newQuantity === 0 || value === "") {
                setQuantity(0);
            } else if (newQuantity > item.stockQuantity) {
                setQuantity(item.stockQuantity);
            } else {
                setQuantity(newQuantity);
            }
        }
    };

    const handleChangeClick = (action: string) => {
        if (action === "+") {
            setQuantity((prev: any) => Math.min(prev + 1, item.stockQuantity));
        } else {
            setQuantity((prev: any) => Math.max(prev - 1, 0));
        }
    };

    return (
        <tr key={item.productId} className="align-middle">
            <td className="text-end">
                <strong>{item.productName}</strong>
            </td>
            <td>${item.sellPrice.toFixed(2)}</td>
            <td>
                <div className="input-group m-auto" style={{ width: "150px" }}>
                    <div className="input-group-prepend">
                        <button
                            onClick={() => handleChangeClick("-")}
                            className="btn btn-outline-secondary"
                        >
                            <i className="fa-solid fa-subtract"></i>
                        </button>
                    </div>

                    <input
                        type="text"
                        id="quantity"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <div className="input-group-append">
                        <button
                            onClick={() => handleChangeClick("+")}
                            className="btn btn-outline-secondary"
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
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
