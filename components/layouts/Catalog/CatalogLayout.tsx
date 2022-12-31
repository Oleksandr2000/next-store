import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { ICatalogLayoutProps } from "./CatalogLayout.props";

import { addToSearchParams } from "../../../app/helpers";
import { useFetchCategories } from "../../../app/services/CategoryService/hooks";
import { useFetchAllProducts } from "../../../app/services/ProductService/hooks";
import Pagination from "../../molecules/Pagination";
import SimpleSlider from "../../molecules/Slider/Simple";
import Wrapper from "../../molecules/Wrapper";
import FilterDashboard from "../../organisms/FilterDashboard";
import { ICategory } from "../../../app/services/CategoryService/Category.types";
import { BlackNextArrow, BlackPrevArrow } from "../../molecules/Slider/CustomArrows";
import { sortOptions } from "../../organisms/FilterDashboard/constants";
import { Option } from "../../atoms/Select/Select.props";

const CatalogLayout = ({ filters }: ICatalogLayoutProps) => {
    const router = useRouter();
    const limit = 12;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState(sortOptions[0]);

    const categories = useFetchCategories({});

    const queryString = addToSearchParams([
        { key: "skip", value: String(currentPage - 1) },
        { key: "limit", value: String(limit) },
        { key: "category", value: router.query.category },
        { key: "sortField", value: sort.value.field },
        { key: "sortValue", value: sort.value.value },
    ]);

    const filtredProducts = useFetchAllProducts({}, queryString);

    useEffect(() => {
        setCurrentPage(1);
        setSort(sortOptions[0]);

        filtredProducts.refetch();
    }, [router.query]);

    return (
        <section className="px-5">
            <div className="md:hidden">
                <SimpleSlider title="Категорії" slidesToShow={2} slidesToScroll={1} nextArrow={null} prevArrow={null}>
                    {categories.isSuccess &&
                        categories.data.map((category: ICategory) => (
                            <Link
                                key={category._id}
                                className={`my-5 mb-8 pb-5 text-center text-2xl font-medium text-black md:mb-16 md:text-3xl ${
                                    router.query.category === category.slug && "border-b-2 border-solid border-black"
                                }
                    `}
                                href={`/catalog/${category.slug}`}
                            >
                                {category.name}
                            </Link>
                        ))}
                </SimpleSlider>
            </div>
            <div className="hidden md:block">
                <SimpleSlider
                    title="Категорії"
                    slidesToShow={3}
                    slidesToScroll={1}
                    nextArrow={<BlackNextArrow />}
                    prevArrow={<BlackPrevArrow />}
                >
                    {categories.isSuccess &&
                        categories.data.map((category: ICategory) => (
                            <Link
                                key={category._id}
                                className={`my-5 mb-16 pb-5 text-center text-3xl font-medium text-black ${
                                    router.query.category === category.slug && "border-b border-black"
                                }
                    `}
                                href={`/catalog/${category.slug}`}
                            >
                                {category.name}
                            </Link>
                        ))}
                </SimpleSlider>
            </div>

            <FilterDashboard
                data={filters.data}
                isLoading={filters.isLoading}
                isError={filters.isError}
                currentPage={currentPage}
                limit={limit}
                sort={sort}
                setSort={(value: Option) => setSort(value)}
                setCurrentPage={setCurrentPage}
            />
            <Wrapper
                data={filtredProducts.data?.products}
                isLoading={filtredProducts.isLoading || filtredProducts.isFetching}
                error={filtredProducts.error}
            />
            {filtredProducts.isSuccess && (
                <Pagination
                    countPage={Math.ceil(filtredProducts.data.count / limit)}
                    perNumber={5}
                    currentPage={currentPage}
                    onChange={setCurrentPage}
                />
            )}
        </section>
    );
};

export default CatalogLayout;
