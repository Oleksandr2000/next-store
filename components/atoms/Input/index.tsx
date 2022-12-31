import React from "react";

import { IInputProps } from "./Input.props";

const Input = ({ id, value, name, type, placeholder, icon, onBlur, onChange }: IInputProps) => (
    <div className="relative">
        <input
            id={id}
            placeholder={placeholder || `Enter ${name}`}
            value={value}
            name={name}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            className="h-full w-full border-b border-b-gray-300 py-2 text-sm font-normal text-black outline-none"
        />
        {icon && <div className="absolute top-1/2 right-5 -translate-y-1/2">{icon}</div>}
    </div>
);

export default Input;
