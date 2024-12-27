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
    const [error, setError] = useState(null);

    // get data from be
    useEffect(
        () => {
            getImageByProductId(productId)
                .then((response) => {
                    setImage(response);
                })
                .catch((error) => {
                    setError(error.message);
                });
        },
        [] //get data at the first one
    );

    if (error) {
        return (
            <div>
                <h1>Get error: {error}</h1>
            </div>
        );
    }
    let dataImg: string = "";
    if (image[0] && image[0].link) {
        dataImg = image[0].link;
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
                    <h5 className="carousel-name">
                        {props.product.productName}
                    </h5>
                    <p className="carousel-description">
                        {props.product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CarouselItem;
