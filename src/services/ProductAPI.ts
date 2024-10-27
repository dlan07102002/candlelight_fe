import React from "react";
import ProductModel from "../models/ProductModel";
import requestBE from "./Request";

interface ProductResponseInterface {
    res: ProductModel[];
    totalPages: number;
    totalElements: number;
}

async function getProducts(
    endpoint: string
): Promise<ProductResponseInterface> {
    const res: ProductModel[] = [];
    // endpoint: localhost:8080/products

    const response = await requestBE(endpoint);
    const productList = response._embedded.products;

    // Get page state
    const totalPages: number = response.page.totalPages;
    const totalElements: number = response.page.totalElements;
    for (const key in productList) {
        const element: ProductModel = productList[key];

        res.push(element);
    }

    return { res: res, totalElements: totalElements, totalPages: totalPages };
}

export async function getAllProducts(
    page: number
): Promise<ProductResponseInterface> {
    // endpoint: localhost:8080/products
    const endpoint: string = `http://localhost:8080/products?size=4&page=${page}`;

    return getProducts(endpoint);
}

export async function getTopRateProducts(): Promise<ProductResponseInterface> {
    // endpoint: localhost:8080/products
    const endpoint: string =
        "http://localhost:8080/products?sort=rateAverage,desc&page=0&size=3";
    return getProducts(endpoint);
}

export async function filterProduct(
    keyword: string,
    categoryId: number
): Promise<ProductResponseInterface> {
    // endpoint: localhost:8080/productss
    let endpoint: string = `http://localhost:8080/products?size=4&page=0`;
    if (keyword !== "" && categoryId == 0) {
        endpoint = `http://localhost:8080/products/search/findByProductNameContaining?size=4&page=0&productName=${keyword}`;
    } else if (keyword === "" && categoryId > 0) {
        endpoint = `http://localhost:8080/products/search/findByCategoryList_CategoryId?categoryId=${categoryId}&size=4&page=0`;
    } else if (keyword !== "" && categoryId > 0) {
        endpoint = `http://localhost:8080/products/search/findByProductNameContainingAndCategoryList_Category?productName=${keyword}&categoryId=${categoryId}&size=4&page=0`;
    }

    return getProducts(endpoint);
}
