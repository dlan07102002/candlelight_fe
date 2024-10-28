import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ProductList from "../product/ProductList";
import { useParams } from "react-router-dom";
interface HomePageInterface {
    keyword: string;
}
const HomePage: React.FC<HomePageInterface> = (props) => {
    const { categoryId } = useParams();
    let categoryIdNum = 0;
    try {
        categoryIdNum = parseInt(categoryId + "");
    } catch (e) {
        categoryIdNum = 0;
        console.log("Error: ", e);
    }

    if (Number.isNaN(categoryIdNum)) {
        categoryIdNum = 0;
    }

    // console.log("keyword: ", props.keyword);

    return (
        <div>
            <Banner />
            <Carousel />
            <ProductList keyword={props.keyword} categoryId={categoryIdNum} />
        </div>
    );
};

export default HomePage;
