import React, { useState, useEffect } from "react";
import { deleteOd } from "../../../services/OrderDetailAPI";
import ImageModel from "../../../models/ImageModel";
import { getImagesByProductId } from "../../../services/ImageAPI";
import { Link } from "react-router-dom";

const CartItem: React.FC<{
    item: any;
    updateQuantity: (id: number, quantity: number) => void;
    removeItemFE: (oId: number) => void;
}> = ({ item, updateQuantity, removeItemFE }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [totalProductPrice, setTotalProductPrice] = useState(
        item.quantity * item.sellPrice
    );
    const [images, setImages] = useState<ImageModel[]>([]);
    // // get data from be
    useEffect(
        () => {
            getImagesByProductId(item.productId)
                .then((response) => {
                    setImages(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [] //get data at the first one
    );

    useEffect(() => {
        isNaN(quantity)
            ? setTotalProductPrice(0)
            : setTotalProductPrice(quantity * item.sellPrice);
    }, [quantity, item.sellPrice]);

    const removeItem = async (odId: number) => {
        await deleteOd(odId);
    };

    const handleRemove = (odId: number) => {
        removeItem(odId);
        removeItemFE(odId);
    };

    const handleQuantityChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        updateQuantity(item.orderDetailId, newQuantity);
    };

    let dataImg: string = "";
    if (images[0] && images[0].link) {
        dataImg = images[0].link;
    }

    let sellPrice = item.sellPrice ? item.sellPrice.toFixed(2) : "0.00";

    return (
        <tr
            key={item.productId}
            className="shadow p-3 mb-5 bg-white rounded border-bottom"
        >
            <td className="align-middle">
                <div className="d-flex align-items-center">
                    <Link to={`/products/${item.productId}`}>
                        <img
                            style={{ height: "75px", width: "75px" }}
                            src={dataImg}
                            className="card-img-top me-3"
                            alt={item.description}
                        />
                    </Link>
                    <strong>{item.productName}</strong>
                </div>
            </td>
            <td className="align-middle">${sellPrice}</td>
            <td className="align-middle">
                <input
                    type="number"
                    className="form-control mx-auto text-end"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    style={{ width: "60px" }}
                />
            </td>
            <td className="align-middle">${totalProductPrice.toFixed(2)}</td>
            <td className="align-middle">
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
