export type ProductImage = {
    id: any;
    src: string;
};

export type ProductMaterial = {
    id?: any;
    name: string;
    value: number;
};

export type Size = {
    id: any;
    name: string;
    count: number;
};

export type Color = {
    _id?: any;
    name: string;
    value: string;
};

export interface IProduct {
    _id: string;
    title: string;
    price: number;
    sale: number;
    currentPrice: number;
    hit: boolean;
    description: string;
    material: ProductMaterial[];
    images: ProductImage[];
    color: Color;
    category: string;
    sizes: Size[];
    code: string;
    colections?: string;
    recomendation?: string[] | IProduct[];
    disabled: boolean;
}

export type ProductVariants = {
    _id: string;
    color: {
        name: string;
        value: string;
    };
};

export type FilterProductDto = {
    category?: string | null;
    color?: string[];
    sizes?: string[];
    material?: string[];
    minPrice?: number;
    maxPrice?: number;
    hit?: boolean;
    sale?: boolean;
    skip?: number;
    limit?: number;
    sortField?: string;
    sortValue?: any;
};

export type DFetchOneProduct = {
    product: IProduct;
    variants: ProductVariants[];
};

export type DFetchAllProduct = {
    count: number;
    products: IProduct[];
};
