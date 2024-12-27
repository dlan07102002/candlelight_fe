import { NavigateFunction } from "react-router-dom";
import ProductModel from "../models/ProductModel";
import requestBE from "./Request";
import { jwtDecode, JwtPayload } from "jwt-decode";
const beHost = import.meta.env.VITE_BE_HOST;
const rcmHost = import.meta.env.VITE_RCM_HOST;
interface IProductResponse {
    res: ProductModel[];
    totalPages: number;
    totalElements: number;
}

export async function countProducts(): Promise<number> {
    let result = 0;
    const endpoint = `${beHost}/products/search/countProducts`;
    await requestBE(endpoint).then((data) => (result = data));
    return result;
}

async function getProducts(endpoint: string): Promise<IProductResponse> {
    const res: ProductModel[] = [];

    const response = await requestBE(endpoint);
    const productList = response._embedded.products;

    // Get page state
    const totalPages: number = response.page.totalPages;
    const totalElements: number = response.page.totalElements;
    for (const product of productList) {
        res.push(product);
    }

    return { res: res, totalElements: totalElements, totalPages: totalPages };
}

export async function getAllProducts(page: number): Promise<IProductResponse> {
    // endpoint: localhost:8080/products
    const endpoint: string = `${beHost}/products?size=8&page=${page}`;

    return getProducts(endpoint);
}

export async function getTopRateProducts(): Promise<IProductResponse> {
    // endpoint: localhost:8080/products
    const endpoint: string = `${beHost}/products?sort=rateAverage,desc&page=0&size=3`;
    return getProducts(endpoint);
}

export async function filterProduct(
    keyword?: string,
    categoryId?: number
): Promise<IProductResponse> {
    let baseEndpoint = "${beHost}/products";
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
    const endpoint = `${beHost}/products/${productId}`;

    try {
        const product = await requestBE(endpoint);

        // If productResponse is null, return both responses
        return { res: product };
    } catch (error) {
        console.error("Error fetching product or categories:", error);
        return null;
    }
}

export async function getSimilarProductByCF(
    userId: number
): Promise<{ CFBased: [] } | {}> {
    const endpoint = `${rcmHost}/collaborative/${userId}`;
    try {
        const products = await requestBE(endpoint);
        return products;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export async function getSimilarProductByContentBased(
    productId: number
): Promise<
    | {
          contentBased: [];
      }
    | {}
> {
    const endpoint = `${rcmHost}/content/${productId}`;

    try {
        const products = await requestBE(endpoint);

        // If productResponse is null, return both responses
        return products;
    } catch (error) {
        console.error("Error fetching product or categories:", error);
        return {};
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
