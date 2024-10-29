import React, { useEffect, useState } from "react";
import ReviewModel from "../../../models/ReviewModel";
import { getReviewsByProductId } from "../../../services/ReviewAPI";
import ratingStarRender from "../../utils/ratingStar";

const ProductReview: React.FC<{
    productId: number;
    setReviewQuantity: React.Dispatch<React.SetStateAction<number>>;
}> = ({ productId, setReviewQuantity }) => {
    const [reviews, setReviews] = useState<ReviewModel[] | null>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check closure in React
    useEffect(() => {
        getReviewsByProductId(productId)
            .then((response) => {
                if (response) {
                    setReviews(response.res);
                    response.res && setReviewQuantity(response.res.length);
                }

                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [productId]);
    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <h1>Get error: {error}</h1>
            </div>
        );
    }

    return (
        <div className="row col-12 col-sm-12 col-md-8 col-log-8 col-xl-8">
            <div className="container mt-5 ">
                <h2 className="mb-4">Customer Reviews</h2>

                {reviews &&
                    reviews.map((review) => (
                        <div className="review-card" key={review.reviewId}>
                            <div className="d-flex align-items-center">
                                <div className="review-profile me-3">
                                    <img
                                        src="https://via.placeholder.com/50"
                                        alt="User Profile"
                                    />
                                </div>
                                <div>
                                    <h5 className="mb-1">
                                        User: {review.reviewId}
                                    </h5>
                                    <p>
                                        {ratingStarRender(
                                            review.rate ? review.rate : 0
                                        )}
                                    </p>
                                </div>
                            </div>
                            <p className="review-comment mt-3">
                                "{review.comment}"
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductReview;
