import React from "react";

import { IInputErrorProps } from "./InputError.props";

const InputError = ({ message }: IInputErrorProps) => (
    <div className="text-xs font-semibold text-red-700">{message}</div>
);

export default InputError;
