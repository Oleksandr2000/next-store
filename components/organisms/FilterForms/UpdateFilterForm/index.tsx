import { useFormik } from "formik";
import React from "react";

import { IUpdateFilterFormProps } from "./UpdateFilterForm.props";

import { transformToOption } from "../../../../app/helpers";
import { useFetchCategories } from "../../../../app/services/CategoryService/hooks";
import Button from "../../../atoms/Button";
import CustomSelect from "../../../atoms/Select";
import { Option } from "../../../atoms/Select/Select.props";
import FormControl from "../../../molecules/FormControl";
import Title from "../../../atoms/Title";

const UpdateFilterForm = ({ title, onUpdate, onDestroy, useQuery }: IUpdateFilterFormProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<Option>({ label: "", value: "" });
    const [filter, setFilter] = React.useState<Option>({ label: "", value: "" });
    const [options, setOptions] = React.useState<Option[]>([]);

    const categories = useFetchCategories({
        select: (data) => transformToOption(data, "name", "slug"),
        onSuccess: (data: any) => setSelectedCategory(data[0]),
    });

    const update = onUpdate(filter.value);

    const destroy = onDestroy;

    const filters = useQuery(selectedCategory.value, {
        enabled: !!selectedCategory.value,
        select: (data) => transformToOption(data, "name", "_id"),
        onSuccess: (data: any) => setOptions(data),
    });

    React.useEffect(() => {
        filters.refetch();
        setFilter({ label: "", value: "" });
    }, [selectedCategory, destroy.isSuccess, update.isSuccess]);

    const FilterAdminForm = useFormik({
        initialValues: {
            name: "",
        },

        onSubmit: (values) => {
            update.mutateAsync({ name: values.name, category: selectedCategory.value });

            FilterAdminForm.resetForm();
        },
    });

    return (
        <form onSubmit={FilterAdminForm.handleSubmit}>
            <Title variant="h2">{title}</Title>
            <CustomSelect
                id="filter_categories"
                instanceId="filter_categories"
                onChange={setSelectedCategory}
                value={selectedCategory}
                options={categories.data}
            />
            <br />
            <CustomSelect id="filters" instanceId="filters" onChange={setFilter} value={filter} options={options} />
            <FormControl
                placeholder="Введіть нову назву"
                id="name"
                type="text"
                name="name"
                value={FilterAdminForm.values.name}
                onChange={FilterAdminForm.handleChange}
                onBlur={FilterAdminForm.handleBlur}
                error={FilterAdminForm.errors.name}
                touched={FilterAdminForm.touched.name}
            />
            <div className="grid grid-cols-2 gap-6">
                <Button type="submit" variant="black" className="mt-4 w-full py-2">
                    Далі
                </Button>
                <Button
                    type="button"
                    variant="black"
                    className="mt-4 w-full bg-red-900 py-2"
                    onClick={() => destroy.mutateAsync(filter.value)}
                >
                    Видалити
                </Button>
            </div>
        </form>
    );
};

export default UpdateFilterForm;
