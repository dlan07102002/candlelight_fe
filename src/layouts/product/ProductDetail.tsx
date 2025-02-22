import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getProductByProductId,
    getSimilarProductByCF,
    getSimilarProductByContentBased,
} from "../../services/ProductAPI";
import ProductModel from "../../models/ProductModel";
import CategoryModel from "../../models/CategoryModel";
import ProductImage from "./components/ProductImage";
import ProductReview from "./components/ProductReview";
import { getCategoriesByProductId } from "../../services/CategoryAPI";
import ProductPaymentForm from "./components/ProductPaymentForm";
import ratingStarRender from "../utils/ratingStar";
import ProductItem from "./recommend/ProductItem";
import { CategoryIcon } from "../../assets/icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MyContext } from "../../App";

const ProductDetail: React.FC = () => {
    // Get productId from URL
    const { productId } = useParams();
    const { userId } = useContext(MyContext);

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
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryModel[] | null>([]);
    const [reviewQuantity, setReviewQuantity] = useState(0);
    const [similarProductIds, setSimilarProductIds] = useState([]);
    const [similarProducts, setSimilarProducts] = useState<
        ProductModel[] | null
    >([]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to 0,0
    }, [productId]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const [productData, categoriesData] = await Promise.all([
                    getProductByProductId(productIdNum),
                    getCategoriesByProductId(productIdNum),
                ]);
                productData && setProduct(productData.res);
                categoriesData && setCategories(categoriesData.res);
            } catch (error: any) {
                setError(error);
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAPI();
    }, [productId]);

    // Fetch Similar Product
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let list: any = [];
                if (userId) {
                    const data = await getSimilarProductByCF(userId);
                    if (data && "CFBased" in data && data.CFBased.length > 0) {
                        list = data.CFBased;
                    }
                }

                if (list.length === 0) {
                    const data = await getSimilarProductByContentBased(
                        productIdNum
                    );
                    if (
                        data &&
                        "contentBased" in data &&
                        data.contentBased.length > 0
                    ) {
                        list = data.contentBased;
                    }
                }

                // If still not has data, handle error
                if (list.length > 0) {
                    console.log(list);
                    setSimilarProductIds(list);
                } else {
                    console.log("No similar products found");
                    setSimilarProductIds([]);
                }
            } catch (e) {
                console.log("Error fetching similar products:", e);
            }
        };

        fetchAPI();
    }, [productId]); // Chạy lại khi productId thay đổi

    useEffect(() => {
        const fetchAPI = async () => {
            console.log(productIdNum);
        };

        fetchAPI();
    }, [productId]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const products = await Promise.all(
                    similarProductIds.map(async (similarProductId) => {
                        const data = await getProductByProductId(
                            similarProductId
                        );
                        return data ? data.res : null;
                    })
                );
                // Filter null item
                setSimilarProducts(
                    products.filter((product) => product !== null)
                );
            } catch (error) {
                console.error("Error fetching similar products:", error);
            }
        };
        if (similarProductIds.length > 0) {
            fetchAPI();
        }
        console.log(similarProducts);
    }, [similarProductIds]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <AiOutlineLoading3Quarters className="loading-icon" />
                <style>
                    {`
                                       @keyframes spin {
                                           0% { transform: rotate(0deg); }
                                           100% { transform: rotate(360deg); }
                                       }
                                       `}
                </style>
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
                                categories.map((category) => (
                                    <CategoryIcon
                                        key={category.categoryId}
                                        category={category.categoryName}
                                    />
                                ))}
                        </li>
                    </ul>

                    {/* Similar Product */}
                    <p className="product-description">You may also like:</p>
                    <div className="row">
                        {similarProducts &&
                            similarProducts.map((similarProduct) => (
                                <ProductItem
                                    key={similarProduct.productId}
                                    product={similarProduct}
                                />
                            ))}
                    </div>
                </div>
                <ProductPaymentForm product={product} />
            </div>

            {/* Detailed Description */}
            <div className="row mt-4 mb-4">
                <div className="col-xl-8 col-lg-8 ">
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
