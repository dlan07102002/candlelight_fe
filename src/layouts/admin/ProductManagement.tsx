import { useEffect, useState } from "react";
import { filterProduct, getAllProducts } from "../../services/ProductAPI";
import Pagination from "../utils/Pagination";
import { getCategoriesByProductId } from "../../services/CategoryAPI";
import { CategoryIcon } from "../../assets/icons";

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
}) => {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyWord] = useState("");

    // get data from be
    console.log(currentPage);
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null); // Đặt lại trạng thái lỗi

            try {
                let response;
                if (keyword === "") {
                    response = await getAllProducts(currentPage - 1);
                } else {
                    response = await filterProduct(keyword);
                }

                // setProducts(response.res);
                setTotalPages(response.totalPages);
                setIsLoading(false);
                return response.res; // Trả về danh sách sản phẩm
            } catch (error: any) {
                setIsLoading(false);
                setError(error.message);
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
                setIsLoading(false);

                setError(error.message);
            });
    }, [currentPage, keyword]);

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
                                <th scope="col" style={{ width: "20%" }}>
                                    Name
                                </th>
                                <th scope="col" style={{ width: "30%" }}>
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
                                <tr key={product.productId}>
                                    <td>{product.productName}</td>
                                    <td>
                                        {product.category.map((item: any) => (
                                            <CategoryIcon category={item} />
                                        ))}
                                        <CategoryIcon
                                            category={product.category}
                                        />
                                    </td>
                                    <td>${product.sellPrice}</td>
                                    <td>
                                        {product.quantity
                                            ? product.quantity
                                            : 0}
                                    </td>
                                    <td>
                                        {product.quantity > 0
                                            ? "In Stock"
                                            : "Out of stock"}
                                    </td>
                                    <td>
                                        <button
                                            style={{ width: "5rem" }}
                                            className="btn btn-primary text-white me-2 p-0"
                                            // onClick={() =>
                                            //     handleShowUpdate(user)
                                            // }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            style={{ width: "5rem" }}
                                            className="btn btn-danger text-white p-0"
                                            // onClick={() =>
                                            //     handleDeleteUser(user.userId)
                                            // }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        total={totalPages}
                        paging={paging}
                    />
                </div>
            </div>
        </div>
    );
};
export default ProductManagement;
