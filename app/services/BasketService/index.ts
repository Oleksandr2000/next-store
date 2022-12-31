import axios from "../axios";
import { AddToBasketDto, ConfirmOrderDto, IFUserBasket, UpdateBasketDto } from "./Basket.types";

const BasketService = {
    async get(id: string) {
        const { data } = await axios.get<IFUserBasket>(`/api/basket/${id}`);
        return data;
    },

    async add(dto: AddToBasketDto) {
        const { data } = await axios.post(`/api/basket/add`, dto);
        return data;
    },

    async changeCount(dto: UpdateBasketDto, id: string) {
        const { data } = await axios.patch(`/api/basket/count/${id}`, dto);
        return data;
    },

    async delete(id: string) {
        await axios.delete(`/api/basket/remove/${id}`);
    },

    async confirm(dto: ConfirmOrderDto) {
        await axios.post(`/api/basket/confirm`, dto);
    },
};

export default BasketService;
