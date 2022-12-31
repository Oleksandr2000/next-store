import React from "react";

import { IFormControlProps } from "./FormControl.props";

import Input from "../../atoms/Input";
import InputError from "../../atoms/InputError";
import Label from "../../atoms/Label";

const FormControl = ({
    id,
    placeholder,
    name,
    label,
    touched,
    error,
    type,
    value,
    onChange,
    onBlur,
}: IFormControlProps) => (
    <div className="flex flex-col items-stretch justify-center">
        {label && (
            <div className="my-2">
                <Label label={label} name={name} />
            </div>
        )}
        <div className="my-2">
            <Input
                placeholder={placeholder}
                id={id}
                name={name}
                touched={touched}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
            />
        </div>
        {error && touched && (
            <div>
                <InputError message={error} />
            </div>
        )}
    </div>
);

export default FormControl;
