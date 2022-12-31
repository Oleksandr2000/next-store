import { IProduct } from "../ProductService/Product.types";

export interface ILook {
    name: string;
    products: IProduct[];
}

export type CapsuleDto = {
    name: string;
    products: string[];
    _id?: string;
};
