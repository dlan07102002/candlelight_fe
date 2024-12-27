import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    deleteUserById,
    getUserRole,
    getUsersInPage,
} from "../../services/UserAPI";
import Pagination from "../utils/Pagination";
import { useNavigate } from "react-router-dom";
import { confirmDeleteToast } from "../utils/CustomToast";
import UserEditForm from "./UserEditForm";
import RoleModel from "../../models/RoleModel";

interface IUserManagement {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const UserManagement: React.FC<IUserManagement> = ({
    setShowModal,
    setModalType,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<any[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [userUpdated, setUserUpdated] = useState<any>(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            await getUsersInPage(currentPage - 1)
                .then(async (data) => {
                    const userWithRolesList = await Promise.all(
                        data.res.map(async (user: any) => {
                            const roles: RoleModel[] = await getUserRole(
                                user.userId
                            );
                            if (roles[0] != undefined)
                                return {
                                    ...user,
                                    roleName: roles[0].roleName,
                                };
                            return user;
                        })
                    );

                    setUsers(userWithRolesList);
                    setTotalPage(data.totalPages);
                })
                .catch((e) => {
                    console.log("Fetch User failed: " + e);
                });
        };
        fetchUserRole();
    }, [currentPage]);

    // Delete handler
    const handleDeleteUser = async (userId: number) => {
        try {
            const confirm = await confirmDeleteToast(userId); // Hiển thị xác nhận xóa
            if (!confirm) {
                toast.info("Delete action canceled.");
                return;
            }

            const success = await deleteUserById(userId, navigate); // Gọi API xóa user
            if (success) {
                setUsers((prevState) =>
                    prevState.filter((user) => user.userId !== userId)
                );
                toast.success("User deleted successfully!");
            } else {
                toast.error("Failed to delete user!");
            }
        } catch (error) {
            console.error("Error during delete operation:", error);
            toast.error("An unexpected error occurred!");
        }
    };

    const handleShowUpdate = (user: any) => {
        setUserUpdated(user);
        setShowUpdateForm(!showUpdateForm);
    };

    const paging = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="admin-content-container shadow-sm">
            <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h5 fw-bold">User Management</h2>
                    <button
                        onClick={() => {
                            setModalType("add-user");
                            setShowModal(true);
                        }}
                        className="btn btn-primary"
                    >
                        Add User
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
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    style={{
                                        width: "10%",
                                    }}
                                >
                                    Role
                                </th>
                                <th
                                    scope="col"
                                    style={{
                                        width: "10%",
                                    }}
                                >
                                    Status
                                </th>
                                <th scope="col" style={{ width: "30%" }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: any) => {
                                return (
                                    <tr key={user.userId}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.roleName
                                                ? user.roleName + " "
                                                : "NULL"}
                                        </td>
                                        <td
                                            className={
                                                user.isActivate
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {user.isActivate
                                                ? "Active"
                                                : "Inactive"}
                                        </td>
                                        <td>
                                            <button
                                                style={{ width: "4rem" }}
                                                className="btn btn-primary text-white me-2 p-0 mt-2"
                                                onClick={() =>
                                                    handleShowUpdate(user)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                style={{ width: "4rem" }}
                                                className="btn btn-danger text-white p-0 mt-2"
                                                onClick={() =>
                                                    handleDeleteUser(
                                                        user.userId
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Pagination
                        paging={paging}
                        currentPage={currentPage}
                        total={totalPage}
                    />
                </div>
            </div>
            {showUpdateForm && (
                <UserEditForm
                    user={userUpdated}
                    setShowUpdateForm={setShowUpdateForm}
                />
            )}
        </div>
    );
};
export default UserManagement;
