export interface IMiniCardProps {
    _id: string;
    title: string;
    img: string;
    price: number;
    currentPrice: number;
    code: string;
    hit?: boolean;
    isLoading?: boolean;
    currentSize?: string;
}
