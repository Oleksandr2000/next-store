import React from "react";

import { IFieldSelectProps } from "./FieldSelect.props";

import Input from "../../atoms/Input";
import CustomSelect from "../../atoms/Select";
import { Option } from "../../atoms/Select/Select.props";

const FieldSelect = ({
    keys,
    currentValue,
    currentOption,
    options,
    placeholder,
    selectId,
    handleChange,
    values,
    id,
    disabledSelect,
}: IFieldSelectProps) => {
    const [selectedValue, setSelectedValue] = React.useState<Option>(currentOption);
    const [value, setValue] = React.useState(currentValue);

    const changeField = (id: any) => {
        handleChange(
            values.map((item) =>
                item.id === id ? { ...item, [keys[0]]: selectedValue.value, [keys[1]]: value } : item,
            ),
        );
    };

    React.useEffect(() => {
        changeField(id);
    }, [selectedValue, value]);

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <CustomSelect
                    onChange={setSelectedValue}
                    value={selectedValue}
                    options={options}
                    id={selectId}
                    instanceId={selectId}
                    disabled={disabledSelect}
                />
                <Input
                    placeholder={placeholder}
                    type="text"
                    name="value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </>
    );
};

export default FieldSelect;
