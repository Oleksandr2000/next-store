import Link from "next/link";
import React from "react";
import cn from "classnames";
import { IRouteProps } from "./Route.props";

const Route = ({ href, children, subRoute = false, className }: IRouteProps) => (
    <li
        className={cn(className, {
            "py-1 px-2 text-lg font-normal text-gray-400": subRoute,
            "py-3 text-xl font-bold text-black": !subRoute,
        })}
    >
        {href ? <Link href={href}>{children}</Link> : children}
    </li>
);

export default Route;
