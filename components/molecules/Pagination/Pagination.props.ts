/* eslint-disable no-unused-vars */

export interface IPaginationProps {
    countPage: number;
    currentPage: number;
    perNumber?: number;
    onChange: (value: number) => void;
}

export type PageNumberArray =
    | number[]
    | [...number[], string, number]
    | [number, string, ...number[], string, number]
    | [number, string, ...number[]];
