import OrderDetail from "../models/OrderDetailModel";
import OrderModel from "../models/OrderModel";
import requestBE from "./Request";

interface IOrderResponse {
    res: OrderModel[];
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
    const response = getOrders(endpoint);
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
    const orderDetailList = orderDetailResponse._embedded.orderDetails;

    return { order: order, orderDetailList: orderDetailList };
}
