import React, { useEffect, useState } from "react";
import ImageModel from "../../../models/ImageModel";
import { getImageByProductId } from "../../../services/ImageAPI";
import ProductModel from "../../../models/ProductModel";
interface ICarouselItem {
    firstChild: boolean;
    product: ProductModel;
}
const CarouselItem: React.FC<ICarouselItem> = (props) => {
    const productId: number = props.product.productId;

    const [image, setImage] = useState<ImageModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // get data from be
    useEffect(
        () => {
            getImageByProductId(productId)
                .then((response) => {
                    setImage(response);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error.message);
                });
        },
        [] //get data at the first one
    );

    if (loading) {
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
    let dataImg: string = "";
    if (image[0] && image[0].imageData) {
        dataImg = image[0].imageData;
    }
    return (
        <div
            className={
                props.firstChild ? "carousel-item active" : "carousel-item"
            }
            data-bs-interval="10000"
        >
            <div className="row align-items-center">
                <div className="col-5 text-center">
                    <img src={dataImg} className="float-end" height="150px" />
                </div>
                <div className="col-7">
                    <h5>{props.product.productName}</h5>
                    <p>{props.product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CarouselItem;
