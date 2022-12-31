import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { toast } from "react-toastify";
import { ICategory } from "../Category.types";
import CategoryService from "..";
import { FDataFilters } from "../../FilterService/Filter.types";

export const useFetchCategories = ({ enabled, select, onSuccess, onError }: UseQueryOptions) =>
    useQuery<FDataFilters, Error, any>("categories", () => CategoryService.getAll(), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useFetchOneCategories = (id: string, { enabled, select, onSuccess, onError }: UseQueryOptions) =>
    useQuery<FDataFilters, Error, any>(["category", id], () => CategoryService.getOne(id), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useCreateCategory = () =>
    useMutation((dto: ICategory) => CategoryService.create(dto), {
        onSuccess: (data: ICategory) => {
            toast.success(`Створено категорію ${data.name}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useUpdateCategory = (id: string) =>
    useMutation((dto: ICategory) => CategoryService.update(dto, id), {
        onSuccess: (data) => {
            toast.success(data.message, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useDeleteCategory = () =>
    useMutation((id: string) => CategoryService.delete(id), {
        onSuccess: () => {
            toast.success("Категорія успішно видалена", {
                theme: "dark",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });
