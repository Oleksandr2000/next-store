/* eslint-disable no-unused-vars */

export interface IFormControlProps {
    id: string;
    name: string;
    error?: any;
    label?: string;
    value?: any;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
    touched?: unknown;
    type: string;
    placeholder: string;
}
