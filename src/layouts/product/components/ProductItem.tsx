import React, { useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import ImageModel from "../../../models/ImageModel";
import { getImagesByProductId } from "../../../services/ImageAPI";
interface ProductItemInterface {
    product: ProductModel;
}
const ProductItem: React.FC<ProductItemInterface> = (props) => {
    const productId: number = props.product.productId;

    const [images, setImages] = useState<ImageModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // get data from be
    useEffect(
        () => {
            getImagesByProductId(productId)
                .then((response) => {
                    setImages(response);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error.message);
                });
        },
        [] //get data at the first one
    );

    if (loading) {
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
    if (props.product.listPrice != null) {
        listPrice = props.product.listPrice.toFixed(2);
    }

    let sellPrice: string = "";
    if (props.product.sellPrice != null) {
        sellPrice = props.product.sellPrice.toFixed(2);
    }
    return (
        <div className="col-md-3 mt-2" style={{ height: "450px" }}>
            <div className="card" style={{ height: "100%" }}>
                <div style={{ height: "250px" }}>
                    <img
                        src={dataImg}
                        className="card-img-top"
                        alt={props.product.description}
                        style={{ height: "100%" }}
                    />
                </div>

                <div className="card-body">
                    <h5 className="card-title">{props.product.productName}</h5>
                    <p className="card-text" style={{ height: "48px" }}>
                        {props.product.description}
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

                    <div className="row mt-2" role="group">
                        <div className="col-8">
                            <button className="btn btn-success btn-block">
                                <i className="fas fa-shopping-cart"></i>
                                <span className="ms-4">Add to cart</span>
                            </button>
                        </div>
                        <div className="col-4">
                            <a
                                href="#"
                                className="btn btn-danger btn-block"
                                style={{ float: "right" }}
                            >
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
