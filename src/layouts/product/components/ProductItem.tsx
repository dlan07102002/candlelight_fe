import React, { useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import ImageModel from "../../../models/ImageModel";
import { getImagesByProductId } from "../../../services/ImageAPI";
import { Link } from "react-router-dom";
import ratingStarRender from "../../utils/ratingStar";
interface ProductItemInterface {
    product: ProductModel;
}
const ProductItem: React.FC<ProductItemInterface> = ({ product }) => {
    const productId: number = product.productId;

    const [images, setImages] = useState<ImageModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // get data from be
    useEffect(
        () => {
            getImagesByProductId(productId)
                .then((response) => {
                    setImages(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error.message);
                });
        },
        [] //get data at the first one
    );

    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <h1>Get error: {error}</h1>
            </div>
        );
    }

    let dataImg: string = "";
    if (images[0] && images[0].imageData) {
        dataImg = images[0].imageData;
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
        <div className="col-md-3 col-sm-6 mt-2" style={{ height: "450px" }}>
            <div className="card" style={{ height: "100%" }}>
                <div style={{ height: "250px" }}>
                    <Link to={`/products/${product.productId}`}>
                        <img
                            src={dataImg}
                            className="card-img-top"
                            alt={product.description}
                            style={{ height: "200px" }}
                        />
                    </Link>
                </div>

                <div className="card-body">
                    <Link
                        to={`/products/${product.productId}`}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <h5 className="card-title">{product.productName}</h5>
                    </Link>
                    <p className="card-text" style={{ height: "48px" }}>
                        {product.description}
                    </p>

                    <div className="price ms-4">
                        <span
                            className="original-price "
                            style={{ fontSize: "12px" }}
                        >
                            <del>${listPrice}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>${sellPrice}</strong>
                        </span>
                    </div>

                    <div className="row mt-2 " role="group">
                        <div className="col-6">
                            <p>
                                {ratingStarRender(
                                    product.rateAverage
                                        ? product.rateAverage
                                        : 0
                                )}
                            </p>
                        </div>
                        <div className="col-6 ">
                            <button className="btn btn-success btn-block float-end">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                            <button className="btn btn-danger btn-block  me-2  float-end">
                                <i className="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
