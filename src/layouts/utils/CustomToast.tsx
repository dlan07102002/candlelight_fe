import { toast } from "react-toastify";

export const confirmDeleteToast = (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Are you sure you want to delete #{id}?</p>
                    <button
                        onClick={() => {
                            resolve(true); // accepts
                            closeToast();
                        }}
                        className="btn mt-2  btn-success mt-1 me-4 bg-green text-white cursor-pointer "
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => {
                            resolve(false); // cancels
                            closeToast();
                        }}
                        className="btn mt-2 btn-danger mt-1 me-4 bg-green text-white cursor-pointer "
                    >
                        Cancel
                    </button>
                </div>
            ),
            {
                position: "top-center",
                autoClose: false, // Keep Toast open until the user selects
                closeOnClick: false, // Prevent closing by clicking outside
                draggable: false,
            }
        );
    });
};
