import { useEffect, useState } from "react";
import {
    deleteProductById,
    filterProduct,
    getAllProducts,
} from "../../services/ProductAPI";
import Pagination from "../utils/Pagination";
import { getCategoriesByProductId } from "../../services/CategoryAPI";

import { confirmDeleteToast } from "../utils/CustomToast";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem";

interface IProductManagement {
    keyword?: string;
    categoryId?: number;
}
const ProductManagement: React.FC<IProductManagement> = ({}) => {
    const [products, setProducts] = useState<any[]>([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyWord] = useState("");
    const navigate = useNavigate();
    const [productEdit, setProductEdit] = useState<any>(null);
    const [isNew, setIsNew] = useState(false);

    // get data from be
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (keyword === "") {
                    response = await getAllProducts(currentPage - 1);
                } else {
                    response = await filterProduct(keyword);
                }

                setTotalPages(response.totalPages);
                return response.res; // Trả về danh sách sản phẩm
            } catch (error: any) {
                return []; // Trả về mảng rỗng nếu có lỗi để tránh lỗi undefined
            }
        };

        fetchProducts()
            .then(async (data) => {
                const products = await Promise.all(
                    data.map(async (product: any) => {
                        const category = await getCategoriesByProductId(
                            product.productId
                        );
                        let categoryName: string[] = [];
                        if (category && category.res != null) {
                            category.res!.forEach((item) => {
                                categoryName.push(item.categoryName);
                            });
                        }

                        return {
                            ...product,
                            category: categoryName,
                        };
                    })
                );
                console.log(products);

                setProducts(products);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [currentPage, keyword]);

    const handleEdit = (product: any) => {
        setIsNew(false);
        setProductEdit(product);
        setShowProductForm(true);
    };

    const paging = (page: number) => {
        setCurrentPage(page);
    };

    // Delete handler
    const handleDeleteProduct = async (productId: number) => {
        try {
            const confirm = await confirmDeleteToast(productId); // Hiển thị xác nhận xóa
            if (!confirm) {
                toast.info("Delete action canceled.");
                return;
            }

            const success = await deleteProductById(productId, navigate); // Gọi API xóa user
            if (success) {
                setProducts((prevState) =>
                    prevState.filter(
                        (product) => product.productId !== productId
                    )
                );
                toast.success("Product deleted successfully!");
            } else {
                toast.error("Failed to delete product!");
            }
        } catch (error) {
            console.error("Error during delete operation:", error);
            toast.error("An unexpected error occurred!");
        }
    };

    return (
        <div className="admin-content-container shadow-sm">
            <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h5 fw-bold">Product Management</h2>
                    <button
                        onClick={() => {
                            setIsNew(true);
                            setShowProductForm(true);
                        }}
                        className="btn btn-success"
                    >
                        Add Product
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" style={{ width: "30%" }}>
                                    Name
                                </th>
                                <th scope="col" style={{ width: "20%" }}>
                                    Category
                                </th>
                                <th
                                    scope="col"
                                    style={{
                                        width: "10%",
                                    }}
                                >
                                    Price
                                </th>
                                <th
                                    scope="col"
                                    style={{
                                        width: "10%",
                                    }}
                                >
                                    Stock
                                </th>
                                <th
                                    scope="col"
                                    style={{
                                        width: "10%",
                                    }}
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    style={{
                                        width: "20%",
                                    }}
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <ProductItem
                                    key={product.productId}
                                    product={product}
                                    handleEdit={handleEdit}
                                    handleDeleteProduct={handleDeleteProduct}
                                />
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        total={totalPages}
                        paging={paging}
                    />
                    {showProductForm && (
                        <ProductForm
                            isNew={isNew}
                            setShowProductForm={setShowProductForm}
                            product={isNew ? null : productEdit}
                            setProducts={setProducts}
                            products={products}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductManagement;
