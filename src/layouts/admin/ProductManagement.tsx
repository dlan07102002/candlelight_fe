import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { filterProduct, getAllProducts } from "../../services/ProductAPI";

// const data = {
//     products: [
//         {
//             id: 1,
//             name: "Product 1",
//             category: "Electronics",
//             price: 299.99,
//             stock: 50,
//             status: "In Stock",
//         },
//         {
//             id: 2,
//             name: "Product 2",
//             category: "Clothing",
//             price: 49.99,
//             stock: 100,
//             status: "In Stock",
//         },
//     ],
// };

interface IProductManagement {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
    keyword?: string;
    categoryId?: number;
}
const ProductManagement: React.FC<IProductManagement> = ({
    setShowModal,
    setModalType,
    keyword,
    categoryId,
}) => {
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
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);

                    setError(error.message);
                });
        } else {
            filterProduct(keyword, categoryId)
                .then((response) => {
                    setProducts(response.res);
                    setTotalPages(response.totalPages);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);

                    setError(error.message);
                });
        }
    }, [currentPage, keyword, categoryId]);

    const paging = (page: number) => {
        setCurrentPage(page);
    };
    if (isLoading) {
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

    if (products.length == 0) {
        return (
            <div className="container">
                <h1>NOT FOUND</h1>
            </div>
        );
    }

    return (
        <div className="admin-content-container shadow-sm">
            <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h5 fw-bold">Product Management</h2>
                    <button
                        onClick={() => {
                            setModalType("add-product");
                            setShowModal(true);
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
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.productName}</td>
                                    {/* <td>{product.productcategory}</td> */}
                                    <td>${product.sellPrice}</td>
                                    <td>{product.quantity}</td>
                                    {/* <td>{product.productstatus}</td> */}
                                    <td>
                                        <button className="btn btn-link text-primary me-2">
                                            Edit
                                        </button>
                                        <button className="btn btn-link text-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default ProductManagement;
