import OrderDetail from "../models/OrderDetailModel";
import OrderModel from "../models/OrderModel";
import requestBE from "./Request";

interface IOrderResponse {
    res: OrderModel[];
}

export async function countOrders(): Promise<number> {
    let result = 0;
    const endpoint = `http://localhost:8080/orders/search/countOrders`;
    await requestBE(endpoint).then((data) => (result = data));
    return result;
}

async function getOrders(endpoint: string): Promise<IOrderResponse> {
    const res: OrderModel[] = [];
    const response = await requestBE(endpoint);
    const orderList = response._embedded.orders;

    // Get page state

    for (const key in orderList) {
        res.push(orderList[key]);
    }

    return { res: res };
}

export async function getOrdersByUserId(
    userId: number
): Promise<{ res: OrderModel[] }> {
    const endpoint = `http://localhost:8080/users/${userId}/orderList`;
    const response = await getOrders(endpoint);
    return response;
}

export async function getLatestOrderAndOrderDetailByUserId(
    userId: number
): Promise<{
    order: OrderModel;
    orderDetailList: OrderDetail[];
}> {
    // http://localhost:8080/orders/search/findTopByUser_UserIdOrderByOrderIdDesc%7B?userId,page,size,sort*}
    const endpoint = `http://localhost:8080/orders/search/findTopByUser_UserIdOrderByOrderIdDesc?userId=${userId}`;
    const response = await requestBE(endpoint);
    const order = response._embedded.orders[0];
    const odHref = order._links.orderDetailList.href;
    const orderDetailResponse = await requestBE(odHref);
    const orderDetailList = orderDetailResponse._embedded
        .orderDetails as OrderDetail[];

    return { order: order, orderDetailList: orderDetailList };
}

export async function createOrder(order: OrderModel): Promise<number> {
    const endpoint = `http://localhost:8080/api/order`;
    const token = localStorage.getItem("token");
    let orderId = 0;
    if (token) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    createdAt: order.createdAt,
                    orderAddress: "",
                    deliveryAddress: "",
                    paymentCost: 0,
                    deliveryCost: 0,
                    totalPrice: 0,
                    deliveryStatus: "PENDING",
                    paymentStatus: "PENDING",
                }),
            });
            if (response.ok) {
                const data = await response.json();
                orderId = parseInt(data);
            } else {
                console.error(
                    `Add order id: ${order.orderId} failed with status ${response.status}`
                );
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    } else {
        console.error("Adding Failed");
    }

    return orderId;
}
