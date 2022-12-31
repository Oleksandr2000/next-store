import React, { useEffect, useState } from "react";

import { IPaginationProps, PageNumberArray } from "./Pagination.props";

import Button from "../../atoms/Button";

const Pagination = ({ countPage, currentPage, perNumber = 3, onChange }: IPaginationProps) => {
    const numberPages: number[] = [];
    const perNumberArray: number[] = [];
    const sideCount: number = (perNumber - 1) / 2;
    const dotsLeft = "... ";
    const dotsRight = " ...";

    const [currentNumberPages, setCurrentNumberPages] = useState<PageNumberArray>([]);

    for (let i = 1; i <= countPage; i++) {
        numberPages.push(i);
    }

    for (let i = 1; i <= perNumber; i++) {
        perNumberArray.push(i + 1);
    }

    useEffect(() => {
        if (countPage <= perNumber + 3) {
            setCurrentNumberPages([...numberPages]);
        } else if (currentPage >= 1 && currentPage <= perNumber) {
            setCurrentNumberPages([1, ...perNumberArray, dotsRight, countPage]);
        } else if (currentPage > perNumber && currentPage <= countPage - perNumber) {
            setCurrentNumberPages([
                1,
                dotsLeft,
                ...numberPages.slice(currentPage - sideCount - 1, currentPage),
                ...numberPages.slice(currentPage, currentPage + sideCount),
                dotsRight,
                countPage,
            ]);
        } else if (currentPage > countPage - perNumber) {
            setCurrentNumberPages([1, dotsLeft, ...numberPages.slice(countPage - perNumber - 1)]);
        }
    }, [currentPage, countPage]);

    const handlerPage = (value: number | string): void => {
        if (typeof value === "number") {
            onChange(value);
        } else if (typeof value === "string" && value === dotsRight) {
            onChange(currentPage + perNumber);
        } else if (typeof value === "string" && value === dotsLeft) {
            onChange(currentPage - perNumber);
        }
    };

    return (
        <div className="flex w-full flex-row justify-center">
            <Button
                disabled={currentPage === 1}
                variant="pagination"
                className="pb-[6px] text-3xl"
                onClick={() => handlerPage(currentPage - 1)}
            >
                {String.fromCharCode(171)}
            </Button>
            {currentNumberPages?.map((item: number | string, i: number) => (
                <Button
                    variant={currentPage === item ? "activePage" : "pagination"}
                    key={i}
                    onClick={() => handlerPage(item)}
                >
                    {item}
                </Button>
            ))}
            <Button
                disabled={currentPage === countPage}
                variant="pagination"
                className="pb-[6px] text-3xl"
                onClick={() => handlerPage(currentPage + 1)}
            >
                {String.fromCharCode(187)}
            </Button>
        </div>
    );
};
export default Pagination;
