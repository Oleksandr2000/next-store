import React from "react";
import { UseQueryOptions } from "react-query";
import { useMediaQuery } from "usehooks-ts";

import {
    mutateCreateColor,
    mutateCreateMaterial,
    mutateCreateSize,
    mutateDeleteColor,
    mutateDeleteMaterial,
    mutateDeleteSize,
    mutateUpdateColor,
    mutateUpdateMaterial,
    mutateUpdateSize,
    useFetchCategoryColors,
    useFetchCategoryMaterials,
    useFetchCategorySizes,
} from "../../../app/services/FilterService/hooks";
import Title from "../../atoms/Title";
import Tabs from "../../molecules/Tabs";
import CapsuleForm from "../../organisms/CapsuleForm";
import CategoriesForm from "../../organisms/CategoriesForm";
import CollectionForm from "../../organisms/CollectionsForm";
import CreateFilterForm from "../../organisms/FilterForms/CreateFilterForm";
import UpdateFilterForm from "../../organisms/FilterForms/UpdateFilterForm";
import ProductForm from "../../organisms/ProductForm";

const AdminDashboard = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    const queryMaterials = (id: string, options: UseQueryOptions) => useFetchCategoryMaterials(id, options);
    const queryColors = (id: string, options: UseQueryOptions) => useFetchCategoryColors(id, options);
    const querySizes = (id: string, options: UseQueryOptions) => useFetchCategorySizes(id, options);

    return (
        <div className="container mx-auto px-5">
            <Tabs
                className="h-full w-full"
                divider
                oriental={isMobile ? "top" : "right"}
                sliderList={isMobile}
                slidesToShow={2}
                activeStyle="bottom"
                list={[
                    {
                        label: (
                            <Title variant="h2" className="pl-1 text-center md:text-left lg:my-2 ">
                                Категорії
                            </Title>
                        ),
                        content: (
                            <div className="flex w-full flex-col justify-center px-0 md:px-10 lg:px-20 xl:px-40">
                                <CategoriesForm title="Створити категорію" isUpdate={false} />
                                <CategoriesForm title="Обновити інформацію" isUpdate />
                            </div>
                        ),
                    },
                    {
                        label: (
                            <Title variant="h2" className="pl-1 text-center md:text-left lg:my-2 ">
                                Товари
                            </Title>
                        ),
                        content: (
                            <div className="flex w-full flex-col justify-center px-0 md:px-10 lg:px-20 xl:px-40">
                                <ProductForm title="Створити Товар" isUpdate={false} />
                                <ProductForm title="Обновити інформацію" isUpdate />
                            </div>
                        ),
                    },
                    {
                        label: (
                            <Title variant="h2" className="pl-1 text-center md:text-left lg:my-2 ">
                                Палітра
                            </Title>
                        ),
                        content: (
                            <div className="flex w-full flex-col justify-center px-0 md:px-10 lg:px-20 xl:px-40">
                                <CreateFilterForm title="Додати Колір" onCreate={mutateCreateColor()} />
                                <UpdateFilterForm
                                    title="Обновити палітру"
                                    useQuery={queryColors}
                                    onUpdate={(id: string) => mutateUpdateColor(id)}
                                    onDestroy={mutateDeleteColor()}
                                />
                            </div>
                        ),
                    },
                    {
                        label: (
                            <Title variant="h2" className="pl-1 text-center md:text-left lg:my-2 ">
                                Матеріали
                            </Title>
                        ),
                        content: (
                            <div className="flex w-full flex-col justify-center px-0 md:px-10 lg:px-20 xl:px-40">
                                <CreateFilterForm title="Додати матеріал" onCreate={mutateCreateMaterial()} />
                                <UpdateFilterForm
                                    title="Змінити інформацію"
                                    useQuery={queryMaterials}
                                    onUpdate={(id: string) => mutateUpdateMaterial(id)}
                                    onDestroy={mutateDeleteMaterial()}
                                />
                            </div>
                        ),
                    },
                    {
                        label: (
                            <Title variant="h2" className="pl-1 text-center md:text-left lg:my-2 ">
                                Розмір
                            </Title>
                        ),
                        content: (
                            <div className="flex w-full flex-col justify-center px-0 md:px-10 lg:px-20 xl:px-40">
                                <CreateFilterForm title="Додати розмір" onCreate={mutateCreateSize()} />
                                <UpdateFilterForm
                                    title="Змінити інформацію"
                                    useQuery={querySizes}
                                    onUpdate={(id: string) => mutateUpdateSize(id)}
                                    onDestroy={mutateDeleteSize()}
                                />
                            </div>
                        ),
                    },
                    {
                        label: (
                            <Title variant="h2" className="pl-1 text-center md:text-left lg:my-2 ">
                                Образи
                            </Title>
                        ),
                        content: (
                            <div className="flex w-full flex-col justify-center px-0 md:px-10 lg:px-20 xl:px-40">
                                <CapsuleForm title="Створити образ" />
                                <CapsuleForm title="Змінити інформацію" isUpdate />
                            </div>
                        ),
                    },
                    {
                        label: (
                            <Title variant="h2" className="pl-1 text-center md:text-left lg:my-2 ">
                                Колекції
                            </Title>
                        ),
                        content: (
                            <div className="flex w-full flex-col justify-center px-0 md:px-10 lg:px-20 xl:px-40">
                                <CollectionForm title="Створити Колекцію" />
                                <CollectionForm title="Змінити інформацію" isUpdate />
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default AdminDashboard;
