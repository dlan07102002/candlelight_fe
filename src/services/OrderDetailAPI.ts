import OrderDetailModel from "../models/OrderDetailModel";
import ProductModel from "../models/ProductModel";
import requestBE from "./Request";
interface IOrderDetail {
    res: OrderDetailModel[];
}
export async function getProductByOrderDetailId(
    odId: number
): Promise<ProductModel> {
    const endpoint = `http://localhost:8080/order-details/${odId}/product`;
    const response = await requestBE(endpoint);
    return response;
}
