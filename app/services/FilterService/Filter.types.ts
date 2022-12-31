export interface IFilter {
    createdAt?: string;
    name: string;
    updatedAt?: string;
    __v?: number;
    _id?: string;
    category?: string;
}

export type FDataFilters = {
    colors: IFilter[];
    materials: IFilter[];
    sizes: IFilter[];
};
