import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ProductList from "../product/ProductList";
import { useParams } from "react-router-dom";

interface IHomePage {
    keyword: string;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const HomePage: React.FC<IHomePage> = ({
    keyword,
    currentPage,
    setCurrentPage,
}) => {
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

    return (
        <div>
            <Banner />
            <Carousel />
            <ProductList
                keyword={keyword}
                categoryId={categoryIdNum}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default HomePage;
