import React, { useEffect, useState } from "react";
import { getImagesByProductId } from "../../../services/ImageAPI";
import ImageModel from "../../../models/ImageModel";

const ProductImage: React.FC<{ productId: number }> = ({ productId }) => {
    const [images, setImages] = useState<ImageModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [active, setActive] = useState<string | undefined>("");
    useEffect(
        () => {
            getImagesByProductId(productId)
                .then((response) => {
                    setImages(response);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error.message);
                });
        },
        [productId] //get data at the first one
    );

    useEffect(() => {
        if (images[0] && images[0].link) {
            setActive(images[0].link);
        }
    }, [images]); // Chạy lại mỗi khi images thay đổi

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
        <div className="col-12 col-xl-3 mb-4">
            <div className="product-image mb-4">
                <img
                    src={active}
                    alt={images[0].imageId + ""}
                    className="img-fluid rounded"
                />
            </div>
            <div className="additional-images d-flex justify-content-start gap-2">
                {images.map((img) => (
                    <img
                        key={img.imageId}
                        src={img.link}
                        alt={img.imageId + ""}
                        className="img-thumbnail image-thumbnail" // Thêm class mới
                        onClick={() => setActive(img.link)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductImage;
