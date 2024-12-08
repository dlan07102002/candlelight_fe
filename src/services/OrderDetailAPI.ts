import OrderDetailModel from "../models/OrderDetailModel";
import ProductModel from "../models/ProductModel";
import requestBE from "./Request";

export async function getProductByOrderDetailId(
    odId: number
): Promise<ProductModel> {
    const endpoint = `http://localhost:8080/order-details/${odId}/product`;
    const response = await requestBE(endpoint);
    return response;
}

export async function addOd(od: OrderDetailModel): Promise<number> {
    const endpoint = `http://localhost:8080/api/order-detail`;
    const token = localStorage.getItem("token");
    let odId = 0;
    if (token) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderDetailId: od.orderDetailId,
                    productId: od.productId,
                    orderId: od.orderId,
                    userId: od.userId,
                    quantity: od.quantity,
                    sellPrice: od.sellPrice,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                odId = parseInt(data);
            } else {
                console.error(
                    `Add orderDetail id: ${od.orderDetailId} failed with status ${response.status}`
                );
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    } else {
        console.error("Adding Failed");
    }
    return odId;
}

export async function updateQuantity(
    odId: number,
    quantity: number
): Promise<boolean> {
    const endpoint = `http://localhost:8080/order-details/${odId}`;
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quantity: quantity,
                }),
            });
            if (response.ok) {
                return true;
            } else {
                console.error(
                    `Update orderDetail id: ${odId} failed with status ${response.status}`
                );
                return false;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
    } else {
        console.log("Updating Failed");
        return false;
    }
}

export async function deleteOd(odId: number): Promise<boolean> {
    const token = localStorage.getItem("token");
    const endpoint = `http://localhost:8080/order-details/${odId}`;
    if (token) {
        try {
            const response = await fetch(endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                return true;
            } else {
                console.error(
                    `Delete orderDetail id: ${odId} failed with status ${response.status}`
                );
                return false;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
    } else {
        console.log("Delete Failed");
        return false;
    }
}
