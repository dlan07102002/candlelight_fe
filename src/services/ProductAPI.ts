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
    keyword?: string,
    categoryId?: number
): Promise<IProductResponse> {
    let baseEndpoint = "http://localhost:8080/products";
    let endpoint = baseEndpoint;
    const params = new URLSearchParams({ size: "4", page: "0" });

    if (keyword && !categoryId) {
        endpoint = `${baseEndpoint}/search/findByProductNameContaining`;
        params.append("productName", keyword);
    } else if (categoryId && !keyword) {
        endpoint = `${baseEndpoint}/search/findByCategoryList_CategoryId`;
        params.append("categoryId", categoryId.toString());
    } else if (categoryId && keyword) {
        endpoint = `${baseEndpoint}/search/findByProductNameContainingAndCategoryList_CategoryId`;
        params.append("productName", keyword);
        params.append("categoryId", categoryId.toString());
    }

    // Ghép endpoint với các tham số
    endpoint = `${endpoint}?${params.toString()}`;

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
export async function getSimilarProductByContentBased(
    productId: number
): Promise<{
    products: [] | null;
} | null> {
    const endpoint = `http://localhost:5555/api?product_id=${productId}`;

    try {
        const products = await requestBE(endpoint);

        // If productResponse is null, return both responses
        return products;
    } catch (error) {
        console.error("Error fetching product or categories:", error);
        return null;
    }
}
