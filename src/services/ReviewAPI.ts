import ReviewModel from "../models/ReviewModel";
import requestBE from "./Request";

interface ReviewInterface {
    res: ReviewModel[];
}
async function getReviews(endpoint: string): Promise<ReviewInterface> {
    const res: ReviewModel[] = [];
    const response = await requestBE(endpoint);
    const reviewList = response._embedded.reviews;

    // Get page state

    for (const key in reviewList) {
        const element: ReviewModel = reviewList[key];

        res.push(element);
    }

    return { res: res };
}

export function getAllReviews(): Promise<ReviewInterface> {
    const endpoint: string = `http://localhost:8080/reviews`;
    return getReviews(endpoint);
}

// Product Detail Review Data
export async function getReviewsByProductId(productId: number): Promise<{
    res: ReviewModel[] | null;
} | null> {
    const productEndpoint = `http://localhost:8080/products/${productId}`;
    const endpoint = `${productEndpoint}/reviewList`;

    try {
        const reviews = (await requestBE(endpoint))._embedded.reviews;

        // If productResponse is null, return both responses
        return { res: reviews };
    } catch (error) {
        console.error("Error fetching product or reviews:", error);
        return null;
    }
}
