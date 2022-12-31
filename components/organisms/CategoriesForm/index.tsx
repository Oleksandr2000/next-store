import { useFormik } from "formik";
import React from "react";

import * as Yup from "yup";

import { ICategoriesFormProps } from "./CategoriesForm.props";

import { transformToOption } from "../../../app/helpers";
import { useFillForm } from "../../../app/hooks/useFillForm";
import { ICategory } from "../../../app/services/CategoryService/Category.types";
import {
    useCreateCategory,
    useDeleteCategory,
    useFetchCategories,
    useFetchOneCategories,
    useUpdateCategory,
} from "../../../app/services/CategoryService/hooks";
import Button from "../../atoms/Button";
import CustomSelect from "../../atoms/Select";
import { Option } from "../../atoms/Select/Select.props";
import FormControl from "../../molecules/FormControl";
import Title from "../../atoms/Title";

const CategoriesForm = ({ title, isUpdate = false }: ICategoriesFormProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<Option>({ label: "", value: "" });

    const categories = useFetchCategories({
        select: (data) => transformToOption(data, "name", "_id"),
        onSuccess: (data: any) => setSelectedCategory(data[0]),
    });

    const category = useFetchOneCategories(selectedCategory.value, {
        enabled: !!categories,
    });

    const create = useCreateCategory();

    const update = useUpdateCategory(selectedCategory.value);

    const destroy = useDeleteCategory();

    React.useEffect(() => {
        isUpdate &&
            category.refetch().then(({ data }: any) => {
                if (data) {
                    useFillForm(data, CategoriesAdminForm);
                }
            });
    }, [selectedCategory]);

    React.useEffect(() => {
        categories.refetch();
    }, [update.isSuccess, destroy.isSuccess, create.isSuccess]);

    const confirmAction = (message: string, action: any) => {
        if (window.confirm(message)) {
            action();
        }
    };

    const CategoriesAdminForm = useFormik({
        initialValues: {
            name: "",
            slug: "",
            img: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            slug: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            img: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
        }),

        onSubmit: (values: ICategory) => {
            if (!isUpdate) {
                create.mutateAsync(values);
            }
            if (isUpdate) {
                update.mutateAsync(values);
            }

            CategoriesAdminForm.resetForm();
        },
    });

    return (
        <div className="">
            <form onSubmit={CategoriesAdminForm.handleSubmit}>
                <Title variant="h2">{title}</Title>
                {isUpdate && (
                    <CustomSelect
                        instanceId="maintain_categories"
                        id="maintain_categories"
                        value={selectedCategory}
                        options={categories.data}
                        onChange={setSelectedCategory}
                        isLoading={categories.isLoading}
                    />
                )}
                <FormControl
                    placeholder="Введіть назву"
                    id="name"
                    type="text"
                    name="name"
                    value={CategoriesAdminForm.values.name}
                    onChange={CategoriesAdminForm.handleChange}
                    onBlur={CategoriesAdminForm.handleBlur}
                    error={CategoriesAdminForm.errors.name}
                    touched={CategoriesAdminForm.touched.name}
                />
                <FormControl
                    placeholder="Введіть коротку назву англійською"
                    id="slug"
                    type="text"
                    name="slug"
                    value={CategoriesAdminForm.values.slug}
                    onChange={CategoriesAdminForm.handleChange}
                    onBlur={CategoriesAdminForm.handleBlur}
                    error={CategoriesAdminForm.errors.slug}
                    touched={CategoriesAdminForm.touched.slug}
                />
                <FormControl
                    placeholder="Додайте прев'ю"
                    id="img"
                    type="text"
                    name="img"
                    value={CategoriesAdminForm.values.img}
                    onChange={CategoriesAdminForm.handleChange}
                    onBlur={CategoriesAdminForm.handleBlur}
                    error={CategoriesAdminForm.errors.img}
                    touched={CategoriesAdminForm.touched.img}
                />
                {isUpdate ? (
                    <div className="grid grid-cols-2 gap-6">
                        <Button type="submit" variant="black" className="mt-4 w-full py-2">
                            Далі
                        </Button>
                        <Button
                            type="button"
                            variant="black"
                            className="mt-4 w-full bg-red-900 py-2"
                            onClick={() =>
                                confirmAction(
                                    "Ви впевненні що хочете видалити категорію",
                                    destroy.mutateAsync(selectedCategory.value),
                                )
                            }
                        >
                            Видалити
                        </Button>
                    </div>
                ) : (
                    <Button type="submit" variant="black" className="mt-4 w-full py-2">
                        Далі
                    </Button>
                )}
            </form>
        </div>
    );
};

export default CategoriesForm;
