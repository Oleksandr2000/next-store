import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { toast } from "react-toastify";
import ProductService from "..";
import { DFetchAllProduct, DFetchOneProduct, IProduct } from "../Product.types";

export const useFetchAllProducts = ({ select, onSuccess, onError, enabled }: UseQueryOptions, queryString?: string) =>
    useQuery<DFetchAllProduct, Error, any>("all products", () => ProductService.getAll(queryString), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useFetchOneProduct = (id: string, { select, onSuccess, onError, enabled }: UseQueryOptions) =>
    useQuery<DFetchOneProduct, Error, any>(["product", id], () => ProductService.getOne(id), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useCreateProduct = () =>
    useMutation((dto: Omit<IProduct, "_id">) => ProductService.create(dto), {
        onSuccess: (data) => {
            toast.success(`Створено продукт ${data.title}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useUpdateProduct = () =>
    useMutation((dto: { data: Omit<IProduct, "_id">; id: string }) => ProductService.update(dto), {
        onSuccess: (data) => {
            toast.success(`Данні про ${data.title}  оновленно`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useDeleteProduct = () =>
    useMutation((id: string) => ProductService.delete(id), {
        onSuccess: () => {
            toast.error("Продукт видалено", {
                theme: "dark",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });
