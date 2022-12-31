import { useFormik } from "formik";
import React from "react";

import { ICreateFilterFormProps } from "./CreateFilterForm.props";

import { transformToOption } from "../../../../app/helpers";
import { useFetchCategories } from "../../../../app/services/CategoryService/hooks";
import Button from "../../../atoms/Button";
import CustomSelect from "../../../atoms/Select";
import { Option } from "../../../atoms/Select/Select.props";
import FormControl from "../../../molecules/FormControl";
import Title from "../../../atoms/Title";

const FilterForm = ({ title, onCreate }: ICreateFilterFormProps) => {
    const [selectedCategory, setSelectedCategory] = React.useState<Option>({ label: "", value: "" });

    const categories = useFetchCategories({
        select: (data) => transformToOption(data, "name", "slug"),
        onSuccess: (data: any) => setSelectedCategory(data[0]),
    });

    const create = onCreate;

    const FilterAdminForm = useFormik({
        initialValues: {
            name: "",
        },

        onSubmit: (values) => {
            console.log(values);

            create.mutateAsync({ name: values.name, category: selectedCategory.value });

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

            <FormControl
                placeholder="Введіть назву"
                id="name"
                type="text"
                name="name"
                value={FilterAdminForm.values.name}
                onChange={FilterAdminForm.handleChange}
                onBlur={FilterAdminForm.handleBlur}
                error={FilterAdminForm.errors.name}
                touched={FilterAdminForm.touched.name}
            />
            <Button type="submit" variant="black" className="mt-4 w-full py-2">
                Далі
            </Button>
        </form>
    );
};

export default FilterForm;
