import React, { useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import ImageModel from "../../../models/ImageModel";
import { getImagesByProductId } from "../../../services/ImageAPI";
import { Link } from "react-router-dom";

interface IProductItem {
    product: ProductModel;
}
const ProductItem: React.FC<IProductItem> = ({ product }) => {
    const productId: number = product.productId;

    const [images, setImages] = useState<ImageModel[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // get data from be
    useEffect(() => {
        getImagesByProductId(productId)
            .then((response) => {
                setImages(response);
                // setIsLoading(false);
            })
            .catch((error) => {
                // setIsLoading(false);
                setError(error.message);
            });
    }, []);

    // if (isLoading) {
    //     return (
    //         <div>
    //             <h1>Loading</h1>
    //         </div>
    //     );
    // }
    if (error) {
        return (
            <div>
                <h1>Get error: {error}</h1>
            </div>
        );
    }

    let dataImg: string = "";
    if (images[0] && images[0].link) {
        dataImg = images[0].link;
    }

    let listPrice: string = "";
    if (product.listPrice != null) {
        listPrice = product.listPrice.toFixed(2);
    }

    let sellPrice: string = "";
    if (product.sellPrice != null) {
        sellPrice = product.sellPrice.toFixed(2);
    }
    return (
        <div
            className="col-md-3 col-sm-3 mt-3 mb-3 col-3 "
            style={{ minHeight: "8.5rem" }}
        >
            <div className="card">
                <div>
                    <Link to={`/products/${product.productId}`}>
                        <img
                            style={{ height: "2.5rem", width: "2.5rem" }}
                            src={dataImg}
                            className="card-img-top d-block m-auto"
                            alt={product.description}
                        />
                    </Link>
                </div>

                <div className="card-body mt-1 pt-0">
                    <Link
                        to={`/products/${product.productId}`}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <p
                            className="card-title product-name"
                            style={{
                                fontSize: "0.55rem",
                                boxSizing: "border-box",
                                height: "30%",
                            }}
                        >
                            {product.productName}
                        </p>
                    </Link>

                    <div className="mt-4">
                        <span
                            className="sell-price"
                            style={{ fontSize: "10px" }}
                        >
                            <strong>${sellPrice}</strong>
                        </span>
                        {listPrice && (
                            <span className="list-price ">
                                <del>${listPrice}</del>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
