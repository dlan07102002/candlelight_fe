import React, { useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import { getTopRateProducts } from "../../../services/ProductAPI";
import CarouselItem from "./CarouselItem";

const Carousel: React.FC = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // get data from be
    useEffect(
        () => {
            getTopRateProducts()
                .then((response) => {
                    setProducts(response.res);
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

    return (
        <div>
            <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide"
            >
                <div className="carousel-inner">
                    {products.map((product) => (
                        <CarouselItem
                            firstChild={product == products[0] ? true : false}
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
