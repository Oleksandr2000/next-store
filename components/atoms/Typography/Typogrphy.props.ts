import { ReactNode } from "react";

export interface ITypographyProps {
    children: ReactNode;
    size?: "text-sm" | "text-base" | "text-lg";
    bold?: "normal" | "semi" | "bold" | "medium";
    upercase?: boolean;
    color?: "gray" | "red";
    center?: boolean;
    className?: string;
}
