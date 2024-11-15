import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getProductByProductId,
    getSimilarProductByContentBased,
} from "../../services/ProductAPI";
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
    const [similarProducts, setSimilarProducts] = useState([]);

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

    // Fetch Similar Product
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getSimilarProductByContentBased(
                productIdNum
            );
            console.log("similar: ", response);
        };

        fetchAPI();
    }, []);

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
        <div className="container">
            <div className="row">
                {/* Product Image */}
                <ProductImage productId={productIdNum} />

                {/* Product Info */}
                <div className="col-12 col-xl-5 col-lg-5 mb-4 pb-4 mt-4 product-detail_info">
                    <h5 className="product-title product-detail-title mt-2">
                        {product.productName}
                    </h5>
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

                    {/* Similar Product */}
                    <p className="product-description">Similar products:</p>
                </div>
                <ProductPaymentForm product={product} />
            </div>

            {/* Detailed Description */}
            <div className="row mt-4 mb-4">
                <div className="col">
                    <h3 className="product-detail-sub_title">
                        Detailed Description:
                    </h3>
                    {product.detailDescription && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product.detailDescription,
                            }}
                        />
                    )}
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
