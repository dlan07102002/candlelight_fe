import React, { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";
import ProductModel from "../../models/ProductModel";
import { getAllProducts, filterProduct } from "../../services/ProductAPI";
import Pagination from "../utils/Pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface IProductList {
    keyword?: string;
    categoryId?: number;
}

const ProductList: React.FC<IProductList> = ({ keyword, categoryId }) => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // get data from be
    useEffect(() => {
        if (keyword === "" && categoryId == 0) {
            getAllProducts(currentPage - 1)
                .then((response) => {
                    setProducts(response.res);
                    setTotalPages(response.totalPages);
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            filterProduct(keyword, categoryId)
                .then((response) => {
                    setProducts(response.res);
                    setTotalPages(response.totalPages);
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
        setIsLoading(false);
    }, [currentPage, keyword, categoryId]);

    const paging = (page: number) => {
        setCurrentPage(page);
    };
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

    if (products.length == 0) {
        return (
            <div className="container">
                <h1>NOT FOUND</h1>
            </div>
        );
    }
    return (
        <div className="container ">
            <div className="row mt-4">
                {products.map((product) => (
                    <ProductItem key={product.productId} product={product} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                total={totalPages}
                paging={paging}
            />
        </div>
    );
};

export default ProductList;
