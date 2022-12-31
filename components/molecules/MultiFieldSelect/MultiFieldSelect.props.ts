/* eslint-disable no-unused-vars */

import { Option } from "../../atoms/Select/Select.props";

export type IMultiFieldSelectProps = {
    keys: string[];
    title: string;
    values: any;
    onChange: (newValue: any) => any;
    options: Option[];
    placeholder: string;
    disabledSelect?: boolean;
};
