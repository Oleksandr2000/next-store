import React from "react";

import { ILabelProps } from "./Label.props";

const Label = ({ name, label }: ILabelProps) => (
    <label htmlFor={name} className="text-base font-bold text-black">
        {label}
    </label>
);

export default Label;
