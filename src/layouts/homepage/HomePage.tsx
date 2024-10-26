import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ProductList from "../product/ProductList";

function HomePage() {
    return (
        <div>
            <Banner />
            <Carousel />
            <ProductList />
        </div>
    );
}

export default HomePage;
