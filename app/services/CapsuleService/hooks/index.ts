import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { toast } from "react-toastify";
import CapsuleService from "..";
import { CapsuleDto, ILook } from "../Capsule.types";

export const useFetchLooks = ({ enabled, select, onSuccess, onError }: UseQueryOptions) =>
    useQuery<ILook[], Error, any>(["all looks"], () => CapsuleService.getAll(), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useFetchOneLook = ({ enabled, select, onSuccess, onError }: UseQueryOptions, id: string) =>
    useQuery<ILook, Error, any>(["look", id], () => CapsuleService.getOne(id), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useFetchRecomendation = ({ enabled, select, onSuccess, onError }: UseQueryOptions, product: string) =>
    useQuery<ILook[], Error, any>(["looks recomendation"], () => CapsuleService.getRecomendation(product), {
        enabled,
        select,
        onSuccess,
        onError,
    });

export const useCreateCapsule = () =>
    useMutation((dto: CapsuleDto) => CapsuleService.create(dto), {
        onSuccess: (data) => {
            toast.success(`Створено образ ${data.name}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useUpdeateCapsule = () =>
    useMutation((dto: CapsuleDto) => CapsuleService.update(dto), {
        onSuccess: (data) => {
            toast.success(`Оновленно данні про образ ${data.name}`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useDeleteCapsule = () =>
    useMutation((id: string) => CapsuleService.delete(id), {
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
