import { useEffect, useState } from "react";
import {
    deleteCategoryById,
    getAllCategories,
} from "../../services/CategoryAPI";
import { CategoryIcon } from "../../assets/icons";
import { confirmDeleteToast } from "../utils/CustomToast";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ICategoryManagement {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}
const CategoryManagement: React.FC<ICategoryManagement> = ({
    setModalType,
    setShowModal,
}) => {
    console.log("Category Management");
    const [categories, setCategories] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            const confirm = await confirmDeleteToast(categoryId); // Hiển thị xác nhận xóa
            if (!confirm) {
                toast.info("Delete action canceled.");
                return;
            }

            const success = await deleteCategoryById(categoryId, navigate); // Gọi API xóa user
            if (success) {
                setCategories((prevState) =>
                    prevState.filter(
                        (category) => category.categoryId !== categoryId
                    )
                );
                toast.success("Category deleted successfully!");
            } else {
                toast.error("Failed to delete category!");
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
                    <h2 className="h5 fw-bold">Category Management</h2>
                    <button
                        onClick={() => {
                            setModalType("add-category");
                            setShowModal(true);
                        }}
                        className="btn btn-success"
                    >
                        Add Category
                    </button>
                </div>
                <div className="row g-4">
                    {categories.map((category) => (
                        <div
                            key={category.categoryId}
                            className="col-3 col-sm-6 col-12 col-xl-3"
                        >
                            <div className="card border rounded-lg ">
                                <div className="card-body text-center ">
                                    <h3 className="card-title fw-bold">
                                        <CategoryIcon
                                            category={category.categoryName}
                                        />
                                    </h3>
                                    <p className="card-text text-muted">
                                        {category.quantity} Products
                                    </p>
                                    <div className="mt-3">
                                        <button className="btn btn-primary text-white me-2">
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger text-white"
                                            onClick={() =>
                                                handleDeleteCategory(
                                                    category.categoryId
                                                )
                                            }
                                        >
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
