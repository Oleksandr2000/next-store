import { IProduct } from "../../../app/services/ProductService/Product.types";

export interface ICollectionLayoutProps {
    title: string;
    data?: IProduct[];
    isLoading: boolean;
    error: Error | null;
}
