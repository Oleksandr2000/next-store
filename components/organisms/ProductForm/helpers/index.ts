/* eslint-disable no-unused-vars */

import { Option } from "../../../atoms/Select/Select.props";

export const setFilterOption = (filter: any, setOptions: (option: Option[]) => void, options: Option[]): void => {
    const existFilter = filter.map((item: any) => item.name);

    const newOptions = options
        .map((option: Option) => {
            if (existFilter.includes(option.label)) {
                return { label: "", value: "" };
            }
            return option;
        })
        .filter((item) => item.label !== "");

    setOptions(newOptions);
};
