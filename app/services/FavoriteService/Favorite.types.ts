import { IProduct } from "../ProductService/Product.types";

export interface IFavorite {
    _id: string;
    userId: string;
    productId: string | IProduct;
}

export interface IFavoriteDeleted {
    deletedCount: number;
}

export type togleFavoriteDto = {
    user: string;
    product: string;
};
