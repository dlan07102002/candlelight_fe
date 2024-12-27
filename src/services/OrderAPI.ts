import OrderDetail from "../models/OrderDetailModel";
import OrderModel from "../models/OrderModel";
import requestBE from "./Request";

const beHost = import.meta.env.VITE_BE_HOST;
interface IOrderResponse {
    res: OrderModel[];
    totalPages: number;
    totalElements: number;
}

export async function countOrders(): Promise<number> {
    let result = 0;
    const endpoint = `${beHost}/orders/search/countOrders`;
    await requestBE(endpoint).then((data) => (result = data));
    return result;
}

export async function calculateRevenue(): Promise<number> {
    let result = 0;
    const endpoint = `${beHost}/api/order`;
    await requestBE(endpoint).then((data) => (result = data));
    return result;
}

async function getOrders(endpoint: string): Promise<IOrderResponse> {
    const res: OrderModel[] = [];
    const response = await requestBE(endpoint);
    const orderList = response._embedded.orders;

    // Get page state
    const totalPages: number = response.page.totalPages;
    const totalElements: number = response.page.totalElements;
    for (const key in orderList) {
        res.push(orderList[key]);
    }

    return { res: res, totalElements, totalPages };
}

export async function getOrdersWithPaging(
    page: number
): Promise<IOrderResponse> {
    const endpoint = `${beHost}/orders?size=8&page=${page}`;
    const response = await getOrders(endpoint);
    return response;
}

export async function getOrdersByUserId(
    userId: number
): Promise<{ res: OrderModel[] }> {
    const endpoint = `${beHost}/users/${userId}/orderList`;
    const response = await getOrders(endpoint);
    return response;
}

export async function getLatestOrderAndOrderDetailByUserId(
    userId: number
): Promise<{
    order: OrderModel;
    orderDetailList: OrderDetail[];
}> {
    // ${beHost}/orders/search/findTopByUser_UserIdOrderByOrderIdDesc%7B?userId,page,size,sort*}
    const endpoint = `${beHost}/orders/search/findTopByUser_UserIdOrderByOrderIdDesc?userId=${userId}`;
    const response = await requestBE(endpoint);
    const order = response._embedded.orders[0];
    const odHref = order._links.orderDetailList.href;
    const orderDetailResponse = await requestBE(odHref);
    const orderDetailList = orderDetailResponse._embedded
        .orderDetails as OrderDetail[];

    return { order: order, orderDetailList: orderDetailList };
}

export async function createOrder(order: OrderModel): Promise<number> {
    const endpoint = `${beHost}/api/order`;
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

export async function updateOrder(
    deliveryStatus: string | undefined,
    paymentStatus: string | undefined,
    orderId: number
) {
    const endpoint = `${beHost}/api/order`;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderId: orderId,
                    deliveryStatus: deliveryStatus,
                    paymentStatus: paymentStatus,
                }),
            });
        } catch (error) {}
    }
}
