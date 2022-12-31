import Select from "react-select";

import { ISelectProps } from "./Select.props";

const CustomSelect = ({
    id,
    instanceId,
    onChange,
    isMulti = false,
    value,
    options,
    isLoading = false,
    disabled,
}: ISelectProps) => (
    <Select
        id={id}
        instanceId={instanceId}
        classNamePrefix="custom-select"
        value={value}
        options={options}
        onChange={onChange}
        isMulti={isMulti}
        isLoading={isLoading}
        isDisabled={disabled}
        theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                primary25: "lightgray",
                primary: "black",
            },
        })}
    />
);

export default CustomSelect;
