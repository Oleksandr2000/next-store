/* eslint-disable no-unused-vars */

import { UseQueryOptions } from "react-query";

export interface IUpdateFilterFormProps {
    title: string;
    onUpdate: any;
    useQuery: (id: string, option: UseQueryOptions) => any;
    onDestroy: any;
}
