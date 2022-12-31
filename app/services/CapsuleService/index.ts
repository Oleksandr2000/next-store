import axios from "../axios";
import { CapsuleDto, ILook } from "./Capsule.types";

const CapsuleService = {
    async getAll() {
        const { data } = await axios.get<ILook[]>(`/api/capsule`);
        return data;
    },

    async getOne(id: string) {
        const { data } = await axios.get<ILook>(`/api/capsule/${id}`);
        return data;
    },

    async getRecomendation(product: string) {
        const { data } = await axios.get<ILook[]>(`/api/capsule/${product}`);
        return data;
    },

    async create(dto: CapsuleDto) {
        const { data } = await axios.post(`/api/capsule`, dto);
        return data;
    },

    async update(dto: CapsuleDto) {
        const { data } = await axios.patch(`/api/capsule/update`, dto);
        return data;
    },

    async delete(id: string) {
        await axios.delete(`/api/capsule/${id}`);
    },
};

export default CapsuleService;
