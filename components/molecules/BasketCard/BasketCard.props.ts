export interface IBasketCardProps {
    _id: string;
    productId: string;
    img: string;
    title: string;
    price?: number;
    currentPrice: number;
    code: string;
    count: number;
    currentSize: string;
    category: string;
    upateBasket: () => any;
}
