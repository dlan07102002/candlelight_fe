import React, { useState } from "react";
import RequiredAdmin from "./RequiredAdmin";

const ProductForm = () => {
    const productId = 0;
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [listPrice, setListPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Handle data submission to the server or process logic here
        const token = localStorage.getItem("token");
        token &&
            (await fetch("http://localhost:8080/admin/products", {
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
            })
                .then((response) => {
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
                    return response.text();
                })
                .then(async (data) => {
                    console.log("product id", data);
                    // If admin add images

                    if (image) {
                        const imageBase64 = await getBase64(image);

                        fetch("http://localhost:8080/admin/products/images", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            // icon,image_data,image_name,link,product_id
                            body: JSON.stringify({
                                icon: false,
                                imageData: imageBase64,
                                imageName: productName,
                                link: "",
                                productId: parseInt(data),
                            }),
                        });
                    }
                })

                .catch((err) => {
                    console.log(err);
                }));
    };

    // Convert file to Base64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            // FileReader in ReactJs
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>
                resolve(
                    reader.result
                        ? (reader.result as string).split(",")[1]
                        : null
                );
            reader.onerror = (err) => reject(err);
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setImage(file);
        }
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
                                accept=".jpg, .png, image/*"
                                onChange={handleImageChange}
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
const RequiredAdmin_ProductForm: React.FC = RequiredAdmin(ProductForm);
export default RequiredAdmin_ProductForm;
