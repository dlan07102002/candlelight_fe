import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByProductId } from "../../services/ProductAPI";
import ProductModel from "../../models/ProductModel";
import CategoryModel from "../../models/CategoryModel";
import ProductImage from "./components/ProductImage";
import ProductReview from "./components/ProductReview";
import { getCategoriesByProductId } from "../../services/CategoryAPI";
import ProductPaymentForm from "./components/ProductPaymentForm";
import ratingStarRender from "../utils/ratingStar";

const ProductDetail: React.FC = () => {
    // Get productId from URL
    const { productId } = useParams();

    let productIdNum = 0;
    try {
        productIdNum = parseInt(productId + "");
        if (Number.isNaN(productIdNum)) {
            productIdNum = 0;
        }
    } catch (err) {
        productIdNum = 0;
        console.log("Error: ", err);
    }

    const [product, setProduct] = useState<ProductModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState<CategoryModel[] | null>([]);
    const [reviewQuantity, setReviewQuantity] = useState(0);

    useEffect(() => {
        getProductByProductId(productIdNum)
            .then((response) => {
                if (response) {
                    setProduct(response.res);
                }

                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [productId]);

    useEffect(() => {
        getCategoriesByProductId(productIdNum)
            .then((response) => {
                if (response) {
                    setCategories(response.res);
                }

                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [productId]);

    // get data from be

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
    if (!product) {
        return (
            <div className="container">
                <h1>NOT FOUND</h1>
            </div>
        );
    }

    let discountPercent = 0;
    let listPrice: string = "";
    if (product.listPrice != null) {
        discountPercent = product.listPrice;
        listPrice = product.listPrice.toFixed(2);
    }

    let sellPrice: string = "";
    if (product.sellPrice != null) {
        discountPercent =
            ((product.sellPrice - discountPercent) / discountPercent) * 100;
        sellPrice = product.sellPrice.toFixed(2);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Product Image */}
                <ProductImage productId={productIdNum} />

                {/* Product Info */}
                <div className=" card col-md-4 col-12 col-sm-12 mb-4 me-3 pb-4">
                    <h1 className="product-title">{product.productName}</h1>
                    <div className="product-rating d-flex  mb-2">
                        <span className="ms-2 me-2">
                            ({reviewQuantity} review)
                        </span>
                        <p>
                            {ratingStarRender(
                                product.rateAverage ? product.rateAverage : 0
                            )}
                        </p>
                    </div>

                    <div className="product-price mb-3">
                        <h2 className="text-danger">${sellPrice}</h2>
                        <p className="text-muted">
                            List price: <del>${listPrice}</del>{" "}
                            <span className="badge bg-danger ms-2">
                                {Math.round(discountPercent)}%
                            </span>
                        </p>
                    </div>

                    <p className="product-description">
                        Description: {product.description}
                    </p>

                    {/* Additional Information */}
                    <ul className="list-unstyled my-2">
                        <li>
                            Categories:{" "}
                            {categories &&
                                categories
                                    .map((category) => category.categoryName)
                                    .join(", ")}
                        </li>
                    </ul>

                    {/* Quantity and Add to Cart */}

                    <div>
                        <ul
                            className="list-unstyled mb-0 "
                            style={{ width: "135px" }}
                        >
                            <li className="mb-2">
                                <button className="btn btn-danger btn-md w-100">
                                    Buy Now
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="btn btn-light btn-md w-100 btn-outline-secondary">
                                    Add to Cart
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-light btn-md w-100 btn-outline-secondary">
                                    Add to Wishlist
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <ProductPaymentForm product={product} />
            </div>

            {/* Detailed Description */}
            <div className="row mt-4 mb-4">
                <div className="col">
                    <h3>Detailed Description:</h3>
                    <p>{product.description}</p>
                </div>
            </div>

            {/* Review */}
            <div className="row mt-4">
                <ProductReview
                    productId={productIdNum}
                    setReviewQuantity={setReviewQuantity}
                />
            </div>
        </div>
    );
};

export default ProductDetail;
