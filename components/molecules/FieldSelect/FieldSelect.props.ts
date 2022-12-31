/* eslint-disable no-unused-vars */

import { Color, ProductMaterial, Size } from "../../../app/services/ProductService/Product.types";
import { Option } from "../../atoms/Select/Select.props";

export interface IFieldSelectProps {
    keys: string[];
    values: Color[] | ProductMaterial[] | Size[];
    handleChange: (value: any) => any;
    options: Option[];
    selectId: string;
    id: any;
    placeholder: string;
    currentOption: Option;
    currentValue: any;
    disabledSelect?: boolean;
}
