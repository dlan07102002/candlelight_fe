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
    const [error, setError] = useState(null);
    const [similarProductIds, setSimilarProductIds] = useState([]);
    const [similarProducts, setSimilarProducts] = useState<
        ProductModel[] | null
    >([]);
    const { userId } = useContext(MyContext);

    // get data from be
    useEffect(
        () => {
            console.log(userId);
            const fetchAPI = async () => {
                let isNew = true;
                if (localStorage.getItem("isNew") != null) {
                    isNew = JSON.parse(localStorage.getItem("isNew")!);
                }
                console.log(isNew);
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
                                  console.log(list);
                                  setSimilarProductIds(list);
                              }
                          })
                          .catch((e) => console.log(e));
                setLoading(false);
            };
            fetchAPI();
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
                <h1>Get error: {error}</h1>
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
