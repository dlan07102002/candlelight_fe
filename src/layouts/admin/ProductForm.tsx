import React, { useState } from "react";
import ProductModel from "../../models/ProductModel";

const ProductForm = () => {
    const [productId, setProductId] = useState(0);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [listPrice, setListPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Handle data submission to the server or process logic here
        const token = localStorage.getItem("token");
        token &&
            (await fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: productId,
                    productName: productName,
                    description: description,
                    listPrice: parseInt(listPrice),
                    sellPrice: parseInt(sellPrice),
                    quantity: parseInt(quantity),
                    rateAverage: 0,
                }),
            }).then((response) => {
                if (response.ok) {
                    alert("Product added successfully");
                    setProductName("");
                    setDescription("");
                    setQuantity("");
                    setSellPrice("");
                    setListPrice("");
                } else {
                    alert("Product added failed");
                }
            }));
    };

    return (
        <div className="container mt-5">
            <div className=" shadow-sm product-form-border ">
                <div className=" bg-secondary text-white">
                    <h3 className="mb-0">Product</h3>
                </div>
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" id="productId" value={productId} />
                        <div>
                            <label htmlFor="productName" className="form-label">
                                Product Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="productName"
                                placeholder="Product Name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="quantity" className="form-label">
                                Quantity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                placeholder="Units"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="list_price" className="form-label">
                                List Price
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="list_price"
                                placeholder="List Price"
                                value={listPrice}
                                onChange={(e) => setListPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="sell_price" className="form-label">
                                Sell Price
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="sell_price"
                                placeholder="Sell Price"
                                value={sellPrice}
                                onChange={(e) => setSellPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="file_img" className="form-label">
                                Image (jpg/png)
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="file_img"
                                accept=".jpg, .png"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="file_archive"
                                className="form-label"
                            >
                                Files
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="file_archive"
                                accept=".zip, .rar"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="technologist"
                                className="form-label"
                            >
                                Technologist
                            </label>
                            <select
                                className="form-select"
                                id="technologist"
                                required
                            >
                                <option value="">Select</option>
                                <option value="technologist2">
                                    Technologist 2
                                </option>
                                <option value="technologist3">
                                    Technologist 3
                                </option>
                            </select>
                        </div>

                        <div className="col-md-12 text-end mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
