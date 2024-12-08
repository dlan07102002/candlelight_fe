const data = {
    categories: [
        { id: 1, name: "Electronics", products: 150 },
        { id: 2, name: "Clothing", products: 200 },
    ],
};

interface ICategoryManagement {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}
const CategoryManagement: React.FC<ICategoryManagement> = ({
    setModalType,
    setShowModal,
}) => {
    return (
        <div className="admin-content-container shadow-sm">
            <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h5 fw-bold">Category Management</h2>
                    <button
                        onClick={() => {
                            setModalType("add-category");
                            setShowModal(true);
                        }}
                        className="btn btn-purple"
                    >
                        Add Category
                    </button>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {data.categories.map((category) => (
                        <div key={category.id} className="col">
                            <div className="card border rounded-lg p-4">
                                <div className="card-body">
                                    <h3 className="card-title fw-bold">
                                        {category.name}
                                    </h3>
                                    <p className="card-text text-muted">
                                        {category.products} Products
                                    </p>
                                    <div className="mt-3">
                                        <button className="btn btn-link text-primary me-2">
                                            Edit
                                        </button>
                                        <button className="btn btn-link text-danger">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CategoryManagement;
