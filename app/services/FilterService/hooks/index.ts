import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { toast } from "react-toastify";
import { IFilter } from "../Filter.types";
import FilterService from "..";

export const useFetchCategoryFilters = (category: string, { enabled, select, onSuccess, onError }: UseQueryOptions) =>
    useQuery(["category filters", category], () => FilterService.getForCategory(category), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useFetchAllFilters = ({ enabled, select }: UseQueryOptions) =>
    useQuery("all filters", () => FilterService.getAll(), {
        enabled,
        select,
    });

export const useFetchCategoryColors = (category: string, { enabled, onSuccess, onError, select }: UseQueryOptions) =>
    useQuery(["colors", category], () => FilterService.getColors(category), {
        enabled,
        select,
        onSuccess,
        onError,
        cacheTime: 0,
    });

export const useFetchCategoryMaterials = (category: string, { enabled, onSuccess, onError, select }: UseQueryOptions) =>
    useQuery(["materials", category], () => FilterService.getMaterials(category), {
        enabled,
        select,
        onSuccess,
        onError,
        cacheTime: 0,
    });

export const useFetchCategorySizes = (category: string, { enabled, onSuccess, onError, select }: UseQueryOptions) =>
    useQuery(["sizes", category], () => FilterService.getSizes(category), {
        enabled,
        select,
        onSuccess,
        onError,
        cacheTime: 0,
    });

export const mutateCreateColor = () =>
    useMutation((dto: IFilter) => FilterService.createColors(dto), {
        onSuccess: (data) => {
            toast.success(`Створено колір ${data.name}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const mutateCreateMaterial = () =>
    useMutation((dto: IFilter) => FilterService.createMaterials(dto), {
        onSuccess: (data) => {
            toast.success(`Створено матеріал ${data.name}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const mutateCreateSize = () =>
    useMutation((dto: IFilter) => FilterService.createSizes(dto), {
        onSuccess: (data) => {
            toast.success(`Додано розмір ${data.name}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const mutateUpdateColor = (id: string) =>
    useMutation((dto: IFilter) => FilterService.updateColors(dto, id), {
        onSuccess: (data) => {
            toast.success(`Оновленно данні про колір ${data.name} категорії ${data.category}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const mutateUpdateMaterial = (id: string) =>
    useMutation((dto: IFilter) => FilterService.updateMaterials(dto, id), {
        onSuccess: (data) => {
            toast.success(`Оновленно данні про матеріал ${data.name} категорії ${data.category}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const mutateUpdateSize = (id: string) =>
    useMutation((dto: IFilter) => FilterService.updateSizes(dto, id), {
        onSuccess: (data) => {
            toast.success(`Оновленно данні про розмір ${data.name} категорії ${data.category}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const mutateDeleteColor = () =>
    useMutation((id: string) => FilterService.deleteColors(id), {
        onSuccess: () => {
            toast.error("Колір видадено", {
                theme: "dark",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const mutateDeleteMaterial = () =>
    useMutation((id: string) => FilterService.deleteMaterials(id), {
        onSuccess: () => {
            toast.error("Матеріал видадено", {
                theme: "dark",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const mutateDeleteSize = () =>
    useMutation((id: string) => FilterService.deleteSizes(id), {
        onSuccess: () => {
            toast.error("Розмір видадено", {
                theme: "dark",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });
