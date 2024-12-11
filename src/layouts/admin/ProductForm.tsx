import React, { useState } from "react";
import RequiredAdmin from "./RequiredAdmin";
import { toast } from "react-toastify";
interface IProductForm {
    isNew: boolean;
    setShowProductForm: React.Dispatch<React.SetStateAction<boolean>>;
    product?: any;
    setProducts: React.Dispatch<React.SetStateAction<any>>;
    products: any[];
}
const ProductForm: React.FC<IProductForm> = ({
    isNew,
    setShowProductForm,
    product,
    setProducts,
    products,
}) => {
    const productId = 0;
    const [productName, setProductName] = useState(
        product && product.productName ? product.productName : ""
    );
    const [description, setDescription] = useState(
        product && product.detailDescription ? product.detailDescription : ""
    );
    const [listPrice, setListPrice] = useState(
        product && product.listPrice ? product.listPrice : ""
    );
    const [sellPrice, setSellPrice] = useState(
        product && product.sellPrice ? product.sellPrice : ""
    );
    const [quantity, setQuantity] = useState(
        product && product.quantity ? product.quantity : ""
    );
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Handle data submission to the server or process logic here
        const token = localStorage.getItem("token");
        console.log(
            `http://localhost:8080/${
                isNew ? "admin/products" : "products" + "/" + product.productId
            }`
        );
        token &&
            (await fetch(
                `http://localhost:8080/${
                    isNew
                        ? "admin/products"
                        : "products" + "/" + product.productId
                }`,
                {
                    method: isNew ? "POST" : "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        // productId: productId,
                        productName: productName,
                        description: description,
                        listPrice: parseInt(listPrice),
                        sellPrice: parseInt(sellPrice),
                        quantity: parseInt(quantity),
                        rateAverage: 0,
                    }),
                }
            )
                .then((response) => {
                    if (response.ok) {
                        products.push({
                            productId: 0,
                            category: [],
                            productName: productName,
                            description: description,
                            listPrice: listPrice ? parseInt(listPrice) : 0,
                            sellPrice: sellPrice ? parseInt(sellPrice) : 0,
                            quantity: parseInt(quantity),
                            rateAverage: 0,
                        });
                        setProducts(products);

                        isNew
                            ? toast.success("Product was added successfully")
                            : toast.info("Product was updated successfully");

                        setProductName("");
                        setDescription("");
                        setQuantity("");
                        setSellPrice("");
                        setListPrice("");
                    } else {
                        toast.error(
                            isNew
                                ? "Product added failed"
                                : "Product updated failed"
                        );
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
        <div className="overlay d-flex" style={{ zIndex: 10 }}>
            <div
                className="overlay-content p-4 shadow-sm product-form-border m-auto"
                style={{ maxHeight: "90%" }}
            >
                <div className="text-center">
                    <h3 className="mb-0">Product</h3>
                </div>
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" id="productId" value={productId} />
                        <div>
                            <label
                                htmlFor="productName"
                                className="form-label mt-2 ms-1"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="productName"
                                placeholder="Product Name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="form-label mt-2 ms-1"
                            >
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
                            <label
                                htmlFor="quantity"
                                className="form-label mt-2 ms-1"
                            >
                                Quantity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                placeholder="Units"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="list_price"
                                className="form-label mt-2 ms-1"
                            >
                                List Price
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="list_price"
                                placeholder="List Price"
                                value={listPrice}
                                onChange={(e) => setListPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="sell_price"
                                className="form-label mt-2 ms-1"
                            >
                                Sell Price
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="sell_price"
                                placeholder="Sell Price"
                                value={sellPrice}
                                onChange={(e) => setSellPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="file_img"
                                className="form-label mt-2 ms-1"
                            >
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

                        <div className="col-md-12 text-center mt-5">
                            <button
                                type="submit"
                                className={
                                    isNew
                                        ? "btn btn-success"
                                        : "btn btn-primary"
                                }
                            >
                                Submit
                            </button>
                            <button
                                type="submit"
                                className="btn btn-danger ms-4"
                                onClick={() => setShowProductForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
const RequiredAdmin_ProductForm: React.FC<IProductForm> =
    RequiredAdmin(ProductForm);
export default RequiredAdmin_ProductForm;
