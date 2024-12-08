const data = {
    users: [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            status: "Active",
        },
    ],
};
interface IUserManagement {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const UserManagement: React.FC<IUserManagement> = ({
    setShowModal,
    setModalType,
}) => {
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
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
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
export default UserManagement;
