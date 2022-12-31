import React from "react";
import cn from "classnames";

import { ITypographyProps } from "./Typogrphy.props";

const Typography = ({ children, size, bold, upercase = false, color, center = false, className }: ITypographyProps) => (
    <p
        className={cn(className, {
            "text-sm": size === "text-sm",
            "text-base": size === "text-base",
            "text-lg": size === "text-lg",
            "font-bold": bold === "bold",
            "font-normal": bold === "normal",
            "font-medium": bold === "medium",
            "font-semibold": bold === "semi",
            "text-gray-400": color === "gray",
            "text-red-900": color === "red",
            uppercase: upercase,
            "text-center": center,
        })}
    >
        {children}
    </p>
);

export default Typography;
