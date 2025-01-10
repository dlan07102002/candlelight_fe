import React, { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";
import ProductModel from "../../models/ProductModel";
import { getAllProducts, filterProduct } from "../../services/ProductAPI";
import Pagination from "../utils/Pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface IProductList {
    keyword?: string;
    categoryId?: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductList: React.FC<IProductList> = ({
    keyword,
    categoryId,
    currentPage,
    setCurrentPage,
}) => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // get data from be
    useEffect(() => {
        if (keyword === "" && categoryId == 0) {
            const fetchProduct = async () => {
                try {
                    const response = await getAllProducts(currentPage - 1);
                    setProducts(response.res);
                    setTotalPages(response.totalPages);
                    setError(null); // Xóa lỗi nếu thành công
                } catch (error: any) {
                    console.error("Error fetching products:", error.message);
                    setError(error.message); // Lưu lỗi
                    throw error; // Ném lỗi để thử lại
                }
            };

            const retryFetchProduct = async (retries = 3, delay = 1000) => {
                for (let attempt = 1; attempt <= retries; attempt++) {
                    try {
                        await fetchProduct();
                        break; // Thành công, thoát khỏi vòng lặp
                    } catch (error: any) {
                        if (attempt === retries) {
                            setError(
                                "Unable to fetch products after multiple attempts"
                            );
                        } else {
                            await new Promise((resolve) =>
                                setTimeout(resolve, delay)
                            );
                        }
                    }
                }
            };

            // Gọi hàm retryFetchProduct
            retryFetchProduct();
        } else {
            filterProduct(keyword, currentPage - 1, categoryId)
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
