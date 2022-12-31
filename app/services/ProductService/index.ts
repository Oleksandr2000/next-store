import axios from "../axios";
import { DFetchAllProduct, DFetchOneProduct, IProduct } from "./Product.types";

const ProductService = {
    async getAll(query?: string) {
        const { data } = await axios.get<DFetchAllProduct>(`/api/product?${query && query}`);
        return data;
    },

    async getOne(id: string) {
        const { data } = await axios.get<DFetchOneProduct>(`/api/product/${id}`);
        return data;
    },

    async create(ProductDto: Omit<IProduct, "_id">) {
        const { data } = await axios.post(`/api/product/create`, ProductDto);
        return data;
    },

    async update(ProductDto: { data: Omit<IProduct, "_id">; id: string }) {
        const { data } = await axios.patch(`/api/product/update/${ProductDto.id}`, ProductDto.data);
        return data;
    },

    async delete(id: string) {
        await axios.delete(`/api/product/${id}`);
    },
};

export default ProductService;
