import React, { useContext, useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import ImageModel from "../../../models/ImageModel";
import { getImagesByProductId } from "../../../services/ImageAPI";
import { Link } from "react-router-dom";
import ratingStarRender from "../../utils/ratingStar";
import { MyContext } from "../../../App";
import OrderDetailModel from "../../../models/OrderDetailModel";
import { addOd } from "../../../services/OrderDetailAPI";
import { toast } from "react-toastify";
interface IProductItem {
    product: ProductModel;
}
const ProductItem: React.FC<IProductItem> = ({ product }) => {
    const productId: number = product.productId;

    const [images, setImages] = useState<ImageModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { userId, order, setChangeOrderDetail } = useContext(MyContext); // Get value from context

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

    const addToCart = async () => {
        let orderDetail: OrderDetailModel | null = null;

        if (order != undefined) {
            orderDetail = new OrderDetailModel(
                product.productId,
                order.orderId,
                userId,
                1,
                product.sellPrice ? product.sellPrice : 0
            );
        }

        if (orderDetail != null && userId > 0) {
            const response = await addOd(orderDetail);
            setChangeOrderDetail && setChangeOrderDetail(Boolean(response));
            console.log(response);
        }

        toast.success("You have successfully added the product to the cart");
    };

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
            className="col-md-3 col-sm-6 mt-2 mb-2 col-10 "
            style={{ minHeight: "450px" }}
        >
            <div className="card">
                <div>
                    <Link to={`/products/${product.productId}`}>
                        <img
                            src={dataImg}
                            className="card-img-top"
                            alt={product.description}
                        />
                    </Link>
                </div>

                <div className="card-body mt-1 pt-0">
                    <p>
                        {ratingStarRender(
                            product.rateAverage ? product.rateAverage : 0
                        )}
                    </p>
                    <Link
                        to={`/products/${product.productId}`}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <p className="card-title product-name">
                            {product.productName}
                        </p>
                    </Link>
                    <p className="product-item_description">
                        {product.description}
                    </p>

                    <div className="mt-4">
                        <span className="sell-price">
                            <strong>${sellPrice}</strong>
                        </span>
                        {listPrice && (
                            <span className="list-price ">
                                <del>${listPrice}</del>
                            </span>
                        )}
                    </div>

                    <div className="row mt-2 " role="group">
                        <div className="col-6"></div>
                        <div>
                            <button
                                className="btn btn-success btn-block float-end"
                                onClick={() => addToCart()}
                            >
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
