/* eslint-disable no-unused-vars */

export interface ISelectProps {
    onChange: (value: any) => void;
    isMulti?: boolean;
    isLoading?: boolean;
    value: unknown;
    options: any;
    id: string;
    instanceId: string;
    disabled?: boolean;
}

export type Option = {
    label: string;
    value: any;
};
