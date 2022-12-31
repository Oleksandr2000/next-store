import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface ICheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    values?: any;
}
