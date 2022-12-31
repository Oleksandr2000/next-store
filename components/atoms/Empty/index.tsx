import React from "react";
import { IEmptyProps } from "./Empty.props";

const Empty = ({ children }: IEmptyProps) => (
    <div className="flex h-full w-full items-center justify-center">{children}</div>
);

export default Empty;
