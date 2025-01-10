import React, { useState } from "react";
import ProductModel from "../../../models/ProductModel";
import { toast } from "react-toastify";

const ProductPaymentForm: React.FC<{ product: ProductModel }> = ({
    product,
}) => {
    const [quantity, setQuantity] = useState<number | "">(1);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const stockQuantity = product.quantity ? product.quantity : 0;

        if (!isNaN(Number(value))) {
            if (value === "") {
                setQuantity(0);
            }
            if (Number(value) >= stockQuantity) {
                setQuantity(stockQuantity); // Chỉ cập nhật nếu là số
            } else {
                setQuantity(Number(value)); // Chỉ cập nhật nếu là số
            }
        }
    };

    const addToCart = () => {
        toast.success("Add to cart successfully");
    };

    const handleChangeClick = (action: string) => {
        if (action === "+") {
            const stockQuantity = product.quantity ? product.quantity : 0;
            if (Number(quantity) < stockQuantity)
                setQuantity(Number(quantity) + 1);
        } else {
            if (Number(quantity) > 0) {
                setQuantity(Number(quantity) - 1);
            }
        }
    };

    let total: string = "";
    if (product.sellPrice != null) {
        total = (product.sellPrice * Number(quantity)).toFixed(2);
    }
    return (
        <div className="card col-xl-3 col-lg-3 pb-4 mt-4 ">
            {/*  Seller Info */}
            <div className="seller-info d-flex align-items-center">
                <div>
                    <img src="/src/assets/images/logo.svg" alt="Candle Light" />
                </div>
                <div className="ms-3">
                    <h5 className="mb-0">CandleLight Trading</h5>
                    <small>Official Store</small>
                </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity d-flex align-items-center">
                <label htmlFor="quantity" className="me-3">
                    Quantity:
                </label>
                <div className="input-group">
                    <div className="input-group-append">
                        <button
                            onClick={() => handleChangeClick("+")}
                            className="btn btn-outline-secondary"
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>

                    <input
                        type="text"
                        id="quantity"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <div className="input-group-prepend">
                        <button
                            onClick={() => handleChangeClick("-")}
                            className="btn btn-outline-secondary"
                        >
                            <i className="fa-solid fa-subtract"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Price */}
            <div className="price d-flex justify-content-between ms-0">
                <span>Sub Total:</span>
                <span>${total}</span>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons d-flex justify-content-between">
                <button className="btn btn-danger">Buy Now</button>
                <button
                    className="btn btn-outline-secondary ms-4"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductPaymentForm;
