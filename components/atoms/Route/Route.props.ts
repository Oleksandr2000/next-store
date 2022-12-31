import { ReactNode } from "react";

export interface IRouteProps {
    href?: string;
    children: ReactNode;
    subRoute?: boolean;
    className?: string;
}
