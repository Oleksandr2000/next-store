import { ReactNode } from "react";

export interface IAccordionProps {
    children: ReactNode;
    title: string;
    isIcon?: boolean;
    addIcon?: any;
}
