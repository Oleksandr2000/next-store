import axios from "../axios";
import { IFavorite, IFavoriteDeleted, togleFavoriteDto } from "./Favorite.types";

const FavoriteService = {
    async get(query: string) {
        const { data } = await axios.get<IFavorite[]>(`/api/favorite?${query}`);
        return data;
    },

    async togle(dto: togleFavoriteDto) {
        const { data } = await axios.post<IFavorite | IFavoriteDeleted>(`/api/favorite/togle`, dto);
        return data;
    },
};

export default FavoriteService;
