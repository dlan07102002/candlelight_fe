import React, { useContext, useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import {
    getProductByProductId,
    getSimilarProductByCF,
    getTopRateProducts,
} from "../../../services/ProductAPI";
import CarouselItem from "./CarouselItem";
import { MyContext } from "../../../App";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Carousel: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [similarProductIds, setSimilarProductIds] = useState([]);
    const [similarProducts, setSimilarProducts] = useState<
        ProductModel[] | null
    >([]);
    const { userId } = useContext(MyContext);

    // get data from be
    useEffect(
        () => {
            const fetchAPI = async () => {
                let isNew = true;
                if (localStorage.getItem("isNew") != null) {
                    isNew = JSON.parse(localStorage.getItem("isNew")!);
                }
                isNew
                    ? await getTopRateProducts()
                          .then((response) => {
                              setSimilarProducts(response.res);
                          })
                          .catch((error) => {
                              setError(error.message);
                          })
                    : await getSimilarProductByCF(userId)
                          .then((data) => {
                              if (data && "CFBased" in data) {
                                  const list = data.CFBased;
                                  setSimilarProductIds(list);
                              }
                          })
                          .catch((e) => {
                              throw e;
                          });
            };

            const retryFetchAPI = async (retries = 3, delay = 1000) => {
                for (let attempt = 1; attempt <= retries; attempt++) {
                    try {
                        console.log(`Attempt ${attempt} of ${retries}`);
                        await fetchAPI();
                        break; // Thành công, thoát khỏi vòng lặp
                    } catch (error: any) {
                        if (attempt === retries) {
                            console.error("All retry attempts failed.");
                            setError(
                                "Unable to fetch products after multiple attempts"
                            );
                        } else {
                            console.log(
                                `Retrying in ${delay / 1000} seconds...`
                            );
                            await new Promise((resolve) =>
                                setTimeout(resolve, delay)
                            );
                        }
                    }
                }
                setLoading(false);
            };
            retryFetchAPI();
        },
        [userId] //get data at the first one
    );

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
    }, [similarProductIds]);

    if (loading) {
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
                <h1 style={{ fontSize: "1rem", color: "red" }}>
                    Get error: {error}
                </h1>
            </div>
        );
    }

    return (
        <div>
            <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide mt-3"
            >
                <div className="carousel-inner">
                    {similarProducts &&
                        similarProducts.map((product) => (
                            <CarouselItem
                                firstChild={
                                    product == similarProducts[0] ? true : false
                                }
                                key={product.productId}
                                product={product}
                            />
                        ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next "
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <hr />
        </div>
    );
};

export default Carousel;
