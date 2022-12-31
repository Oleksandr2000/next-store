import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { toast } from "react-toastify";
import CollectionService from "..";
import { CollectionDto, ICollection } from "../Collection.types";

export const useFetchCollections = ({ enabled, select, onSuccess, onError }: UseQueryOptions) =>
    useQuery<ICollection[], Error, any>(["all collections"], () => CollectionService.getAll(), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useFetchOneCollection = ({ enabled, select, onSuccess, onError }: UseQueryOptions, id: string) =>
    useQuery<ICollection, Error, any>(["collections", id], () => CollectionService.getOne(id), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useCreateCollection = () =>
    useMutation((dto: CollectionDto) => CollectionService.create(dto), {
        onSuccess: (data) => {
            toast.success(`Створено колекцію ${data.name}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useUpdeateCollection = (id: string) =>
    useMutation((dto: CollectionDto) => CollectionService.update(dto, id), {
        onSuccess: (data) => {
            toast.success(`Оновленно данні про колекцію ${data.name}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useDeleteCollection = () =>
    useMutation((id: string) => CollectionService.delete(id), {
        onSuccess: () => {
            toast.error("Видадено", {
                theme: "dark",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });
