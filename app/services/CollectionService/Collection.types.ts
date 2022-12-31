import { IProduct } from "../ProductService/Product.types";

export interface ICollection {
    _id: string;
    name: string;
    img: string;
    products: IProduct[];
}

export type CollectionDto = {
    name: string;
    img: string;
    products: string[];
};
