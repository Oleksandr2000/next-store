import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { IFilterDashboardProps } from "./FilterDashboardProps";

import FilterIcon from "../../../public/icons/filter.svg";

import { addToSearchParams } from "../../../app/helpers";
import { IFilter } from "../../../app/services/FilterService/Filter.types";
import { useFetchAllProducts } from "../../../app/services/ProductService/hooks";
import Button from "../../atoms/Button";
import Checkbox from "../../atoms/Checkbox";
import Label from "../../atoms/Label";
import Accordion from "../../molecules/Accordion";
import TwoThumbsRange from "../../molecules/Range";
import Error from "../../molecules/Action/Error";
import CustomSelect from "../../atoms/Select";
import { sortOptions } from "./constants";

const FilterDashboard = ({
    data,
    isLoading,
    isError,
    currentPage,
    limit,
    sort,
    setSort,
    setCurrentPage,
}: IFilterDashboardProps) => {
    const { query } = useRouter();
    const [rangePrice, setRangePrice] = useState([0, 5000]);

    const FilterForm = useFormik({
        initialValues: {
            colors: [],
            materials: [],
            sizes: [],
        },

        onSubmit: () => {
            setCurrentPage(1);

            if (currentPage === 1) {
                product.refetch();
            }
        },
    });

    const queryString = addToSearchParams([
        { key: "skip", value: String(currentPage - 1) },
        { key: "limit", value: String(limit) },
        { key: "category", value: query.category },
        { key: "colors", value: FilterForm?.values.colors },
        { key: "sizes", value: FilterForm?.values.sizes },
        { key: "materials", value: FilterForm?.values.materials },
        { key: "minPrice", value: rangePrice[0] <= 0 ? 1 : rangePrice[0] },
        { key: "maxPrice", value: rangePrice[1] },
        { key: "sortField", value: sort.value.field },
        { key: "sortValue", value: sort.value.value },
    ]);

    const product = useFetchAllProducts({}, queryString);

    useEffect(() => {
        FilterForm.resetForm();
    }, [query.category]);

    useEffect(() => {
        product.refetch();
    }, [sort, currentPage]);

    if (isError) {
        return (
            <div className="w-full">
                <Error />
            </div>
        );
    }

    return (
        <div className="-gray-300 relative flex flex-row items-start justify-between border-b">
            <Accordion title="Фільтр" isIcon={false} addIcon={FilterIcon.src}>
                <form onSubmit={FilterForm.handleSubmit} className="w-full">
                    <div className="row-auto grid grid-cols-2 gap-8 lg:grid-cols-5 ">
                        {!isLoading &&
                            Object.keys(data).map((key: string) => (
                                <div key={key} className="flex w-full flex-col">
                                    <div className="mb-3">
                                        <Label name={key} label={key} />
                                    </div>
                                    {data[key].map((item: IFilter | string) => (
                                        <Checkbox
                                            key={typeof item === "string" ? item : item._id}
                                            type="checkbox"
                                            name={key}
                                            value={typeof item === "string" ? item : item.name}
                                            onChange={FilterForm.handleChange}
                                            values={FilterForm.values[key]}
                                        />
                                    ))}
                                </div>
                            ))}
                    </div>
                    <TwoThumbsRange values={rangePrice} setValues={setRangePrice} />
                    <Button variant="black" type="submit" className="mt-5 w-52 py-3">
                        Фільтрувати
                    </Button>
                </form>
            </Accordion>
            <div className="absolute right-0 top-1">
                <CustomSelect onChange={setSort} value={sort} options={sortOptions} id="sort" instanceId="sort" />
            </div>
        </div>
    );
};

export default FilterDashboard;
