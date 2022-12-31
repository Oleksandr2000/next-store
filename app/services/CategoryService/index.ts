import axios from "../axios";
import { ICategory } from "./Category.types";

const CategoryService = {
    async getAll() {
        const { data } = await axios.get(`/api/category`);
        return data;
    },

    async getOne(id: string) {
        const { data } = await axios.get(`/api/category/${id}`);
        return data;
    },

    async create(newCategory: ICategory) {
        const { data } = await axios.post(`/api/category`, newCategory);
        return data;
    },

    async update(updatedCategory: ICategory, id: string) {
        const { data } = await axios.patch(`/api/category/${id}`, updatedCategory);
        return data;
    },

    async delete(id: string) {
        await axios.delete(`/api/category/${id}`);
    },
};

export default CategoryService;
