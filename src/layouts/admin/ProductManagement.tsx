const data = {
    products: [
        {
            id: 1,
            name: "Product 1",
            category: "Electronics",
            price: 299.99,
            stock: 50,
            status: "In Stock",
        },
        {
            id: 2,
            name: "Product 2",
            category: "Clothing",
            price: 49.99,
            stock: 100,
            status: "In Stock",
        },
    ],
};

interface IProductManagement {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}
const ProductManagement: React.FC<IProductManagement> = ({
    setShowModal,
    setModalType,
}) => {
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
                            {data.products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.status}</td>
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
