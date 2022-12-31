import { IProduct } from "../ProductService/Product.types";

export interface IFUserBasket {
    basket: IUserBasket[];
    count: number;
    totalPrice: number;
}

export interface IUserBasket {
    _id: string;
    user: string;
    product: IProduct;
    size: string;
    count: number;
}

export type AddToBasketDto = {
    user: string;
    product: string;
    size: string;
    count?: number;
};

export type UpdateBasketDto = {
    count: number;
};

export type ConfirmOrderDto = {
    userId: string;
    name: string;
    email: string;
    number: string;
    city: string;
    adress: string;
    payment: string;
    delivery: string;
    basket: string[];
};
