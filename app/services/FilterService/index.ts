import axios from "../axios";
import { IFilter, FDataFilters } from "./Filter.types";

const FilterService = {
    async getAll() {
        const { data } = await axios.get(`/api/filter`);
        return data;
    },

    async getForCategory(category: string) {
        const { data } = await axios.get<FDataFilters>(`/api/filter/${category}`);
        return data;
    },

    async getColors(category: string) {
        const { data } = await axios.get<IFilter[]>(`/api/filter/color/${category}`);
        return data;
    },

    async getMaterials(category: string) {
        const { data } = await axios.get<IFilter[]>(`/api/filter/material/${category}`);
        return data;
    },

    async getSizes(category: string) {
        const { data } = await axios.get<IFilter[]>(`/api/filter/size/${category}`);
        return data;
    },

    async createColors(dto: IFilter) {
        const { data } = await axios.post(`/api/filter/color`, dto);
        return data;
    },

    async createMaterials(dto: IFilter) {
        const { data } = await axios.post(`/api/filter/material`, dto);
        return data;
    },

    async createSizes(dto: IFilter) {
        const { data } = await axios.post(`/api/filter/size`, dto);
        return data;
    },

    async updateColors(dto: IFilter, id: string) {
        const { data } = await axios.patch(`/api/filter/color/${id}`, dto);
        return data;
    },

    async updateMaterials(dto: IFilter, id: string) {
        const { data } = await axios.patch(`/api/filter/material/${id}`, dto);
        return data;
    },

    async updateSizes(dto: IFilter, id: string) {
        const { data } = await axios.patch(`/api/filter/size/${id}`, dto);
        return data;
    },

    async deleteColors(id: string) {
        const { data } = await axios.delete(`/api/filter/color/${id}`);
        return data;
    },

    async deleteMaterials(id: string) {
        const { data } = await axios.delete(`/api/filter/material/${id}`);
        return data;
    },

    async deleteSizes(id: string) {
        const { data } = await axios.delete(`/api/filter/size/${id}`);
        return data;
    },
};

export default FilterService;
