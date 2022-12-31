import { ReactNode } from "react";

export interface ISimpleSliderProps {
    title?: string;
    children: ReactNode;
    slidesToShow?: number;
    slidesToScroll?: number;
    vertical?: boolean;
    verticalSwiping?: boolean;
    nextArrow?: any;
    prevArrow?: any;
}
