import axios from "../axios";
import { CollectionDto, ICollection } from "./Collection.types";

const CollectionService = {
    async getAll() {
        const { data } = await axios.get<ICollection[]>(`/api/collection`);
        return data;
    },

    async getOne(id: string) {
        const { data } = await axios.get<ICollection>(`/api/collection/${id}`);
        return data;
    },

    async create(dto: CollectionDto) {
        const { data } = await axios.post(`/api/collection`, dto);
        return data;
    },

    async update(dto: CollectionDto, id: string) {
        const { data } = await axios.patch(`/api/collection/${id}`, dto);
        return data;
    },

    async delete(id: string) {
        await axios.delete(`/api/collection/${id}`);
    },
};

export default CollectionService;
