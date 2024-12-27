import { useState } from "react";
import OrderModel from "../../models/OrderModel";
import { updateOrder } from "../../services/OrderAPI";
import { toast } from "react-toastify";

interface IOrderItem {
    order: OrderModel;
    deliveryStatus: string | undefined;
    paymentStatus: string | undefined;
}

const deliveryStatusList = ["PENDING", "SHIPPED", "DELIVERIED", "FAILED"];
const paymentStatusList = ["PENDING", "SUCCESS", "FAILED"];

const OrderItem: React.FC<IOrderItem> = ({
    order,
    deliveryStatus,
    paymentStatus,
}) => {
    const [deliveryState, setDeliveryStatus] = useState(deliveryStatus);
    const [paymentState, setPaymentStatus] = useState(paymentStatus);
    const handleUpdateOrder = async () => {
        try {
            const response = await updateOrder(
                deliveryState,
                paymentState,
                order.orderId!
            );
            console.log(response);
            toast.success("Order status updated");
        } catch (e) {
            console.log("Can not update order");
            toast.error("Order status failed");
        }
    };
    return (
        <tr key={order.orderId}>
            <td>#{order.orderId}</td>
            <td>{order.username}</td>
            <td>{order.createdAt + ""}</td>
            <td>${order.totalPrice}</td>
            <td>
                <div className=" dropdown custom-nav-item custom-dropdown">
                    <div className=" dropdown-toggle custom-nav-link custom-dropdown-toggle">
                        {deliveryState}
                    </div>
                    <ul className=" dropdown-menu custom-dropdown-menu">
                        {deliveryStatusList.map((status) => (
                            <li
                                key={status}
                                onClick={() => setDeliveryStatus(status)}
                                className="custom-dropdown-item  px-3 py-3"
                            >
                                {status}
                            </li>
                        ))}
                    </ul>
                </div>
            </td>
            <td>
                <div className=" dropdown custom-nav-item custom-dropdown">
                    <div className="  dropdown-toggle  custom-dropdown-toggle">
                        {paymentState}
                    </div>
                    <ul className=" dropdown-menu custom-dropdown-menu">
                        {paymentStatusList.map((status) => (
                            <li
                                key={status}
                                onClick={() => setPaymentStatus(status)}
                                className="custom-dropdown-item px-3 py-3 "
                            >
                                {status}
                            </li>
                        ))}
                    </ul>
                </div>
            </td>

            <td>
                <button className="btn btn-primary" onClick={handleUpdateOrder}>
                    Update Status
                </button>
            </td>
        </tr>
    );
};

export default OrderItem;
