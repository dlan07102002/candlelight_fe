import React from "react";
import ImageModel from "../models/ImageModel";
import requestBE from "./Request";

async function getImage(
    // productId: number,
    endpoint: string
): Promise<ImageModel[]> {
    const res: ImageModel[] = [];
    const response = await requestBE(endpoint);
    const ImageList = response._embedded.images;

    for (const key in ImageList) {
        const element: ImageModel = ImageList[key];

        res.push(element);
    }

    return res;
}

export async function getImagesByProductId(
    productId: number
): Promise<ImageModel[]> {
    // endpoint: localhost:8080/images
    const endpoint: string = `http://localhost:8080/products/${productId}/images`;

    return getImage(endpoint);
}

export async function getImageByProductId(
    productId: number
): Promise<ImageModel[]> {
    // endpoint: localhost:8080/images
    const endpoint: string = `http://localhost:8080/products/${productId}/images?size=1`;

    return getImage(endpoint);
}
