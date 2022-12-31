import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { transformToOption } from "../../../app/helpers";
import {
    useCreateCapsule,
    useDeleteCapsule,
    useFetchLooks,
    useFetchOneLook,
    useUpdeateCapsule,
} from "../../../app/services/CapsuleService/hooks";
import { useFetchAllProducts } from "../../../app/services/ProductService/hooks";
import Button from "../../atoms/Button";
import CustomSelect from "../../atoms/Select";
import { Option } from "../../atoms/Select/Select.props";
import Title from "../../atoms/Title";
import FormControl from "../../molecules/FormControl";
import { ICapsuleFormProps } from "./CapsuleForm.props";

const CapsuleForm = ({ title, isUpdate = false }: ICapsuleFormProps) => {
    const [selectedProducts, setSelectedProducts] = useState<Option[]>([]);
    const [capsule, setCapsule] = useState<Option>({ label: "", value: "" });

    const products = useFetchAllProducts({
        select: (data: any) => transformToOption(data.products, "title", "_id"),
    });

    const looks = useFetchLooks({
        enabled: isUpdate,
        select: (data: any) => transformToOption(data, "name", "_id"),
        onSuccess: (data: any) => {
            if (data) {
                setCapsule(data[0]);
            }
        },
    });

    const look = useFetchOneLook(
        {
            enabled: !!capsule.value,
            select: (data: any) => transformToOption(data.products, "title", "_id"),
        },
        capsule.value,
    );

    const create = useCreateCapsule();

    const update = useUpdeateCapsule();

    const remove = useDeleteCapsule();

    const onRemove = () => {
        if (capsule.value) {
            remove.mutateAsync(capsule.value);
        }
    };

    React.useEffect(() => {
        isUpdate &&
            look.refetch().then(({ data }) => {
                setSelectedProducts(data);
                CapsuleAdminForm.setFieldValue("name", capsule.label);
            });
    }, [capsule]);

    React.useEffect(() => {
        looks.refetch();
    }, [update.isSuccess, remove.isSuccess, create.isSuccess]);

    const CapsuleAdminForm = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
        }),

        onSubmit: (values) => {
            if (!isUpdate) {
                create.mutateAsync({ name: values.name, products: selectedProducts.map((item) => item.value) });
            }

            if (isUpdate) {
                update.mutateAsync({
                    name: values.name,
                    products: selectedProducts.map((item) => item.value),
                    _id: capsule.value,
                });
            }

            CapsuleAdminForm.resetForm();
        },
    });

    return (
        <form onSubmit={CapsuleAdminForm.handleSubmit}>
            <Title variant="h2">{title}</Title>

            {isUpdate && (
                <CustomSelect
                    id="cupsule"
                    instanceId="capsule"
                    onChange={setCapsule}
                    value={capsule}
                    options={looks.data}
                />
            )}
            <br />
            <CustomSelect
                id="products"
                instanceId="products"
                onChange={setSelectedProducts}
                value={selectedProducts}
                options={products.data}
                isMulti
            />
            <br />

            <FormControl
                placeholder="Введіть назву"
                id="name"
                type="text"
                name="name"
                value={CapsuleAdminForm.values.name}
                onChange={CapsuleAdminForm.handleChange}
                onBlur={CapsuleAdminForm.handleBlur}
                error={CapsuleAdminForm.errors.name}
                touched={CapsuleAdminForm.touched.name}
            />
            {isUpdate ? (
                <div className="grid grid-cols-2 gap-6">
                    <Button type="submit" variant="black" className="mt-4 w-full py-2">
                        Далі
                    </Button>
                    <Button type="button" variant="remove" className="mt-4 w-full py-2" onClick={onRemove}>
                        Видалити
                    </Button>
                </div>
            ) : (
                <Button type="submit" variant="black" className="mt-4 w-full py-2">
                    Далі
                </Button>
            )}
        </form>
    );
};

export default CapsuleForm;
