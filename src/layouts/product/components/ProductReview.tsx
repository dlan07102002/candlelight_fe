import React, { useContext, useEffect, useState } from "react";
import ReviewModel from "../../../models/ReviewModel";
import {
    getReviewsByProductId,
    submitReview,
} from "../../../services/ReviewAPI";
import ratingStarRender from "../../utils/ratingStar";
import { MyContext } from "../../../App";
import { Star, StarFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import Pagination from "../../utils/Pagination";

const ProductReview: React.FC<{
    productId: number;
    setReviewQuantity: React.Dispatch<React.SetStateAction<number>>;
}> = ({ productId, setReviewQuantity }) => {
    const [reviews, setReviews] = useState<ReviewModel[] | null>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [newComment, setNewComment] = useState("");
    const { userId } = useContext(MyContext);

    const [isDisabled, setIsDisabled] = useState(false);

    const handleRating = (currentRating: number) => {
        if (!isDisabled) {
            setRating(currentRating);
            setIsDisabled(true);
        }
    };

    // Check closure in React
    useEffect(() => {
        getReviewsByProductId(productId, currentPage - 1)
            .then((response) => {
                if (response) {
                    setReviews(response.res);

                    setTotalPage(response.totalPages);
                    response.res && setReviewQuantity(response.res.length);
                }

                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [currentPage, productId]);
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

    const handleSubmit = async () => {
        // const response = await submitReview()
        const review = new ReviewModel();
        review.rate = rating;
        review.userId = userId;
        review.productId = productId;
        review.comment = newComment;

        const response = await submitReview(review);
        if (response != 0) {
            toast.success("Review added successfully");
        } else {
            toast.error("Please try later");
        }

        setNewComment("");
        setRating(0);
        setHover(0);
        setIsDisabled(false);
        console.log(response);
    };
    const paging = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="row col-12 col-sm-12 col-md-8 col-log-8 col-xl-8">
            <div className="container mt-5 ">
                <h3 className="mb-4 product-detail-sub_title">
                    Customer Reviews
                </h3>
                {/* Add new Comment Form */}
                <div className="bg-light p-4 rounded shadow-sm mb-4">
                    <h5 className="  text-center">Write a Review</h5>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="needs-validation"
                        noValidate
                    >
                        <div
                            className=" mt-3 mb-3 d-flex align-items-center "
                            style={{ boxSizing: "border-box" }}
                        >
                            <p className="border-0 me-2">
                                {rating
                                    ? `You rated ${rating} out of 5 stars`
                                    : "Rate your experience"}
                            </p>
                            {isDisabled && (
                                <button
                                    onClick={() => {
                                        setRating(0);
                                        setHover(0);
                                        setIsDisabled(false);
                                    }}
                                    className="btn btn-primary"
                                >
                                    Reset Rating
                                </button>
                            )}
                        </div>
                        {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <button
                                    key={index}
                                    className={` ${
                                        isDisabled && currentRating > rating
                                            ? "cursor-not-allowed"
                                            : "cursor-pointer"
                                    } text-3xl focus:outline-none border-0 bg-transparent p-0`}
                                    style={{
                                        color:
                                            currentRating <= (hover || rating)
                                                ? "#FFD700"
                                                : "#D3D3D3", // Gold for selected, light gray for unselected
                                    }}
                                    onClick={() => handleRating(currentRating)}
                                    onMouseEnter={() =>
                                        !isDisabled && setHover(currentRating)
                                    }
                                    onMouseLeave={() =>
                                        !isDisabled && setHover(rating)
                                    }
                                    disabled={
                                        isDisabled && currentRating > rating
                                    }
                                    aria-label={`Rate ${currentRating} out of 5 stars`}
                                >
                                    {currentRating <= (hover || rating) ? (
                                        <StarFill className="text-warning star-rating" />
                                    ) : (
                                        <Star className="text-secondary star-rating" />
                                    )}
                                </button>
                            );
                        })}

                        <div className="mb-3 mt-3">
                            <label htmlFor="comment" className="form-label">
                                Your Feedback
                            </label>
                            <textarea
                                id="comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="form-control"
                                rows={4}
                                placeholder="Share your thoughts about the product..."
                            ></textarea>
                        </div>

                        {error && <p className="text-danger small">{error}</p>}

                        <button
                            type="submit"
                            className="w-100 btn btn-primary py-2 px-4"
                            onClick={handleSubmit}
                        >
                            Submit Review
                        </button>
                    </form>
                </div>

                {/* Existing review */}
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
                                    <h5 className="mb-1">{review.username}</h5>
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
            <Pagination
                paging={paging}
                currentPage={currentPage}
                total={totalPage}
            />
        </div>
    );
};

export default ProductReview;
