import { IProduct } from "../../../app/services/ProductService/Product.types";

export interface IWrapperProps {
    data?: IProduct[];
    isLoading: boolean;
    error: unknown;
}
