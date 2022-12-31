import { useMutation, useQuery, UseQueryOptions } from "react-query";
import BasketService from "..";
import { AddToBasketDto, ConfirmOrderDto, IFUserBasket, UpdateBasketDto } from "../Basket.types";

export const useFetchUserBasket = (id: string, { enabled, select, onSuccess, onError }: UseQueryOptions) =>
    useQuery<IFUserBasket, Error, any>(["basket", id], () => BasketService.get(id), {
        enabled,
        select,
        onSuccess,
        onError,
        refetchOnWindowFocus: "always",
    });

export const useAddToBasket = () => useMutation((dto: AddToBasketDto) => BasketService.add(dto));

export const useUpdateProductCount = (id: string) =>
    useMutation((dto: UpdateBasketDto) => BasketService.changeCount(dto, id));

export const useRemoveFromBasket = () => useMutation((id: string) => BasketService.delete(id));

export const useConfirm = () => useMutation((dto: ConfirmOrderDto) => BasketService.confirm(dto));
