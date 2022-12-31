import cn from "classnames";
import Link from "next/link";
import React from "react";

import { IButtonProps } from "./Button.props";

const Button = ({ children, variant, className, href, ...props }: IButtonProps) => (
    <button
        {...props}
        className={cn(" block text-center text-sm shadow-sm shadow-black", className, {
            "bg-black text-gray-100": variant === "black",
            "bg-white text-black": variant === "white",
            "bg-gray-100 text-black": variant === "gray",
            "bg-red-900 text-black": variant === "remove",
            "duration-400 mr-1 flex h-8 min-w-[32px] items-center justify-center bg-gray-100 px-2 text-center text-sm font-normal text-black transition-all disabled:opacity-40":
                variant === "pagination",
            "duration-400 mr-1 flex h-8 min-w-[32px] items-center justify-center bg-black px-2 text-center text-sm font-normal text-white transition-all":
                variant === "activePage",
        })}
    >
        {href ? (
            <Link href={href} className="z-30">
                {children}
            </Link>
        ) : (
            children
        )}
    </button>
);

export default Button;
