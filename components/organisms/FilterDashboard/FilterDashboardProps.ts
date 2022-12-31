/* eslint-disable no-unused-vars */
import { IFilter } from "../../../app/services/FilterService/Filter.types";
import { Option } from "../../atoms/Select/Select.props";

export interface IFilterDashboardProps {
    data: {
        [key: string]: IFilter[];
    };
    isLoading: boolean;
    isError: boolean;
    currentPage: number;
    limit: number;
    sort: Option;
    setSort: (value: Option) => void;
    setCurrentPage: (value: number) => void;
}
