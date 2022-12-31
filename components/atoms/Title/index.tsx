import React from "react";
import cn from "classnames";
import Link from "next/link";
import { ITitleProps } from "./Title.props";

const Title = ({ variant, className, href, children }: ITitleProps) => {
    switch (variant) {
        case "h1":
            return (
                <h1 className={cn("text-3xl font-normal uppercase", className)}>
                    {href ? <Link href={href}>{children}</Link> : children}
                </h1>
            );
        case "h2":
            return (
                <h2 className={cn("my-5 text-center text-2xl font-semibold", className)}>
                    {href ? <Link href={href}>{children}</Link> : children}
                </h2>
            );
        case "h3":
            return (
                <h3 className={cn("text-xl font-medium", className)}>
                    {href ? <Link href={href}>{children}</Link> : children}
                </h3>
            );
        case "h4":
            return (
                <h4 className={cn("text-lg font-medium", className)}>
                    {href ? <Link href={href}>{children}</Link> : children}
                </h4>
            );
        case "h5":
            return (
                <h5 className={cn("text-base font-normal", className)}>
                    {href ? <Link href={href}>{children}</Link> : children}
                </h5>
            );
        case "h6":
            return (
                <h6 className={cn("text-sm font-normal", className)}>
                    {href ? <Link href={href}>{children}</Link> : children}
                </h6>
            );
        default:
            return <></>;
    }
};

export default Title;
