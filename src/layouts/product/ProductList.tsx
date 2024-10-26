import React, { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";
import ProductModel from "../../models/ProductModel";
import { getAllProducts } from "../../services/ProductAPI";
import Pagination from "../../utils/Pagination";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // get data from be
    useEffect(
        () => {
            getAllProducts(currentPage - 1)
                .then((response) => {
                    setProducts(response.res);
                    setTotalPages(response.totalPages);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);

                    setError(error.message);
                });
        },
        [currentPage] //get data at the first one
    );

    const paging = (page: number) => {
        setCurrentPage(page);
    };
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
        <div className="container">
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
