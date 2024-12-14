import React, { useContext, useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import {
    getProductByProductId,
    getSimilarProductByCF,
    getTopRateProducts,
} from "../../../services/ProductAPI";
import CarouselItem from "./CarouselItem";
import { MyContext } from "../../../App";

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
            const fetchAPI = async () => {
                let isNew = false;
                if (localStorage.getItem("isNew") != null) {
                    isNew = JSON.parse(localStorage.getItem("isNew")!);
                }
                isNew
                    ? await getTopRateProducts()
                          .then((response) => {
                              setSimilarProducts(response.res);
                              setLoading(false);
                          })
                          .catch((error) => {
                              setLoading(false);

                              setError(error.message);
                          })
                    : await getSimilarProductByCF(userId)
                          .then((data) => {
                              if (data && "CFBased" in data) {
                                  const list = data.CFBased;
                                  setSimilarProductIds(list);
                              }
                          })
                          .catch((e) => console.log(e));
            };
            if (userId != 0) fetchAPI();
        },
        [userId] //get data at the first one
    );

    useEffect(() => {}, [userId]);

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
