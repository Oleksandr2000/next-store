import React from "react";
import cn from "classnames";
import { IBlurProps } from "./Blur.props";

const Blur = ({ block, screen }: IBlurProps) => (
    <div
        className={cn("bg-black bg-opacity-60", {
            "fixed left-0 top-0 h-screen w-screen overflow-hidden": screen,
            "h-full, w-full": block,
        })}
    />
);

export default Blur;
