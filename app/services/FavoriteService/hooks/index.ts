import { useMutation, useQuery, UseQueryOptions } from "react-query";
import FavoriteService from "..";
import { IFavorite, togleFavoriteDto } from "../Favorite.types";

export const useFetchFavotire = ({ enabled, select, onSuccess, onError }: UseQueryOptions, query: string) =>
    useQuery<IFavorite[], Error, any>(["favorites", query], () => FavoriteService.get(query), {
        enabled,
        select,
        onSuccess,
        onError,
        refetchOnWindowFocus: "always",
    });

export const useTogleFavorite = () => useMutation((dto: togleFavoriteDto) => FavoriteService.togle(dto));
