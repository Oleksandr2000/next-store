import { ReactNode } from "react";

export interface ICenterModeProps {
    speed?: number;
    slidesToShow?: number;
    title: string;
    children: ReactNode;
}
