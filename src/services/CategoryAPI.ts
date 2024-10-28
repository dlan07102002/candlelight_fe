import CategoryModel from "../models/CategoryModel";
import requestBE from "./Request";

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
    const endpoint: string = `http://localhost:8080/categories`;
    return getCategories(endpoint);
}

export async function getCategoriesByProductId(productId: number): Promise<{
    res: CategoryModel[] | null;
} | null> {
    const productEndpoint = `http://localhost:8080/products/${productId}`;
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
