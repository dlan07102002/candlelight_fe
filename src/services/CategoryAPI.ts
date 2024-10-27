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
