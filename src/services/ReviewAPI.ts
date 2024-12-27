import ReviewModel from "../models/ReviewModel";
import requestBE from "./Request";
const beHost = import.meta.env.VITE_BE_HOST;
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
    const endpoint: string = `${beHost}/reviews`;
    return getReviews(endpoint);
}

// Product Detail Review Data
export async function getReviewsByProductId(
    productId: number,
    currentPage: number
): Promise<{
    res: ReviewModel[] | null;
    totalPages: number;
} | null> {
    // ${beHost}/reviews/search/findReviewsByProductId?productId=1&size=5
    const endpoint = `${beHost}/reviews/search/findReviewsByProductId?productId=${productId}&size=5&page=${currentPage}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const reviews = data._embedded.reviews;
        const totalPages = data.page.totalPages;
        // If productResponse is null, return both responses
        return { res: reviews, totalPages: totalPages };
    } catch (error) {
        console.error("Error fetching product or reviews:", error);
        return null;
    }
}

export async function submitReview(review: ReviewModel): Promise<number> {
    const endpoint = `${beHost}/api/review`;
    const token = localStorage.getItem("token");
    let reviewId = 0;
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                user_id: review.userId,
                comment: review.comment,
                rate: review.rate,
                productId: review.productId,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            reviewId = parseInt(data);
            console.log("Review Id: " + data);
        } else {
            console.error(
                `Submit review failed with status ${response.status}`
            );
        }
    } catch (error) {
        console.log(error);
    }
    return reviewId;
}
