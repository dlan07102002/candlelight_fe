import { NavigateFunction } from "react-router-dom";
import CategoryModel from "../models/CategoryModel";
import requestBE from "./Request";
import { jwtDecode, JwtPayload } from "jwt-decode";
const beHost = import.meta.env.VITE_BE_HOST;
interface CategoryInterface {
    res: CategoryModel[];
}
async function getCategories(endpoint: string): Promise<CategoryInterface> {
    const res: CategoryModel[] = [];
    const response = await requestBE(endpoint);
    const categoryList = response._embedded.categories;

    // Get page state

    for (const key in categoryList) {
        const element: CategoryModel = categoryList[key];

        res.push(element);
    }

    return { res: res };
}

export function getAllCategories(): Promise<CategoryInterface> {
    const endpoint: string = `${beHost}/categories`;
    return getCategories(endpoint);
}

export async function getCategoriesByProductId(productId: number): Promise<{
    res: CategoryModel[] | null;
} | null> {
    const productEndpoint = `${beHost}/products/${productId}`;
    const endpoint = `${productEndpoint}/categoryList`;

    try {
        const categories = (await requestBE(endpoint))._embedded.categories;

        // If productResponse is null, return both responses
        return { res: categories };
    } catch (error) {
        console.error("Error fetching product or category:", error);
        return null;
    }
}

export async function deleteCategoryById(
    categoryId: number,
    navigate: NavigateFunction
) {
    const endpoint = `${beHost}/api/category/${categoryId}`;
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn("No token found. Delete failed.");
        return false;
    }

    try {
        const decodedToken = jwtDecode<JwtPayload & { isAdmin?: boolean }>(
            token
        );

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.warn("Token expired. Redirecting to login...");
            localStorage.removeItem("token");
            navigate("/login");
            return false;
        }

        if (!decodedToken.isAdmin) {
            console.warn(
                "User is not an admin. Redirecting to 403 error page..."
            );
            navigate("/403-error");
            return false;
        }

        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.info(
                `Category with ID ${categoryId} deleted successfully.`
            );
            return true;
        } else {
            console.error(
                `Failed to delete category with ID ${categoryId}. Status: ${response.status}`
            );
            return false;
        }
    } catch (error) {
        console.error("An error occurred during the delete operation:", error);
        return false;
    }
}

export async function deleteProductById(
    productId: number,
    navigate: NavigateFunction
): Promise<boolean> {
    const endpoint = `${beHost}/products/${productId}`;
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn("No token found. Delete failed.");
        return false;
    }

    try {
        const decodedToken = jwtDecode<JwtPayload & { isAdmin?: boolean }>(
            token
        );

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.warn("Token expired. Redirecting to login...");
            localStorage.removeItem("token");
            navigate("/login");
            return false;
        }

        if (!decodedToken.isAdmin) {
            console.warn(
                "User is not an admin. Redirecting to 403 error page..."
            );
            navigate("/403-error");
            return false;
        }

        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.info(`Product with ID ${productId} deleted successfully.`);
            return true;
        } else {
            console.error(
                `Failed to delete product with ID ${productId}. Status: ${response.status}`
            );
            return false;
        }
    } catch (error) {
        console.error("An error occurred during the delete operation:", error);
        return false;
    }
}
