import { Option } from "../../components/atoms/Select/Select.props";

export const transformToOption = (data: any, label: string, value: string): Option[] | undefined => {
    if (typeof data !== "undefined") {
        return data.map((item: any) => ({
            label: item[label],
            value: item[value],
        }));
    }

    return [{ label: "", value: "" }];
};

export const addToSearchParams = (params: { key: string; value?: any }[]): string => {
    const searchQueryString = new URLSearchParams();
    params.forEach((param) => {
        if (param.value) {
            searchQueryString.append(param.key, param.value);
        }
    });

    return searchQueryString.toString();
};
