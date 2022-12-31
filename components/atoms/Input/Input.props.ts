import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id?: string;
    value?: any;
    type: string;
    name?: string;
    touched?: unknown;
    icon?: any;
}
