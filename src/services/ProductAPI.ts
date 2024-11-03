import ProductModel from "../models/ProductModel";
import requestBE from "./Request";

interface IProductResponse {
    res: ProductModel[];
    totalPages: number;
    totalElements: number;
}

async function getProducts(endpoint: string): Promise<IProductResponse> {
    const res: ProductModel[] = [];
    // endpoint: localhost:8080/products

    const response = await requestBE(endpoint);
    const productList = response._embedded.products;

    // Get page state
    const totalPages: number = response.page.totalPages;
    const totalElements: number = response.page.totalElements;
    for (const key in productList) {
        res.push(productList[key]);
    }

    return { res: res, totalElements: totalElements, totalPages: totalPages };
}

export async function getAllProducts(page: number): Promise<IProductResponse> {
    // endpoint: localhost:8080/products
    const endpoint: string = `http://localhost:8080/products?size=4&page=${page}`;

    return getProducts(endpoint);
}

export async function getTopRateProducts(): Promise<IProductResponse> {
    // endpoint: localhost:8080/products
    const endpoint: string =
        "http://localhost:8080/products?sort=rateAverage,desc&page=0&size=3";
    return getProducts(endpoint);
}

export async function filterProduct(
    keyword: string,
    categoryId: number
): Promise<IProductResponse> {
    // endpoint: localhost:8080/productss
    let endpoint: string = `http://localhost:8080/products?size=4&page=0`;
    if (keyword !== "" && categoryId == 0) {
        endpoint = `http://localhost:8080/products/search/findByProductNameContaining?size=4&page=0&productName=${keyword}`;
    } else if (keyword === "" && categoryId > 0) {
        endpoint = `http://localhost:8080/products/search/findByCategoryList_CategoryId?categoryId=${categoryId}&size=4&page=0`;
    } else if (keyword !== "" && categoryId > 0) {
        endpoint = `http://localhost:8080/products/search/findByProductNameContainingAndCategoryList_Category?productName=${keyword}&categoryId=${categoryId}&size=4&page=0`;
    }

    return getProducts(endpoint);
}

// Product Detail Data
export async function getProductByProductId(productId: number): Promise<{
    res: ProductModel | null;
} | null> {
    const endpoint = `http://localhost:8080/products/${productId}`;

    try {
        const product = await requestBE(endpoint);

        // If productResponse is null, return both responses
        return { res: product };
    } catch (error) {
        console.error("Error fetching product or categories:", error);
        return null;
    }
}
// Await here mean the response of getProduct will be the input to get res[0]
// http://localhost:8080/products/1/categoryList
