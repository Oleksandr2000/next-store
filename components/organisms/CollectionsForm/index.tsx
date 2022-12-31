import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { transformToOption } from "../../../app/helpers";
import { useFillForm } from "../../../app/hooks/useFillForm";
import {
    useFetchOneCollection,
    useCreateCollection,
    useUpdeateCollection,
    useDeleteCollection,
    useFetchCollections,
} from "../../../app/services/CollectionService/hooks";
import { useFetchAllProducts } from "../../../app/services/ProductService/hooks";
import Button from "../../atoms/Button";
import CustomSelect from "../../atoms/Select";
import { Option } from "../../atoms/Select/Select.props";
import Title from "../../atoms/Title";
import FormControl from "../../molecules/FormControl";
import { ICollectionFormProps } from "./CollectionForm.props";

const CollectionForm = ({ title, isUpdate = false }: ICollectionFormProps) => {
    const [selectedProducts, setSelectedProducts] = useState<Option[]>([]);
    const [selectedCollection, setSelectedCollection] = useState<Option>({ label: "", value: "" });

    const products = useFetchAllProducts({
        select: (data: any) => transformToOption(data.products, "title", "_id"),
    });

    const collections = useFetchCollections({
        enabled: isUpdate,
        select: (data: any) => transformToOption(data, "name", "_id"),
        onSuccess: (data: any) => {
            if (typeof data[0] === "object") {
                setSelectedCollection(data[0]);
            }
        },
    });

    const collection = useFetchOneCollection(
        {
            enabled: !!selectedCollection,
        },
        selectedCollection.value,
    );

    const create = useCreateCollection();

    const update = useUpdeateCollection(selectedCollection.value);

    const remove = useDeleteCollection();

    const onRemove = () => {
        if (selectedCollection.value) {
            remove.mutateAsync(selectedCollection.value);
        }
    };

    React.useEffect(() => {
        isUpdate &&
            collection.refetch().then(({ data }) => {
                if (typeof data !== "undefined") {
                    setSelectedProducts(transformToOption(data.products, "title", "_id") || []);

                    useFillForm(data, CollectionAdminForm);
                }
            });
    }, [selectedCollection]);

    React.useEffect(() => {
        collections.refetch();
    }, [update.isSuccess, remove.isSuccess, create.isSuccess]);

    const CollectionAdminForm = useFormik({
        initialValues: {
            name: "",
            img: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            img: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
        }),

        onSubmit: (values) => {
            if (!isUpdate) {
                create.mutateAsync({
                    ...values,
                    products: selectedProducts.map((item) => item.value),
                });
            }

            if (isUpdate) {
                update.mutateAsync({
                    ...values,
                    products: selectedProducts.map((item) => item.value),
                });
            }

            CollectionAdminForm.resetForm();
        },
    });

    return (
        <form onSubmit={CollectionAdminForm.handleSubmit}>
            <Title variant="h2">{title}</Title>

            {isUpdate && (
                <CustomSelect
                    id="cupsule"
                    instanceId="capsule"
                    onChange={setSelectedCollection}
                    value={selectedCollection}
                    options={collections.data}
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
                value={CollectionAdminForm.values.name}
                onChange={CollectionAdminForm.handleChange}
                onBlur={CollectionAdminForm.handleBlur}
                error={CollectionAdminForm.errors.name}
                touched={CollectionAdminForm.touched.name}
            />
            <FormControl
                placeholder="Додайте прев'ю"
                id="img"
                type="text"
                name="img"
                value={CollectionAdminForm.values.img}
                onChange={CollectionAdminForm.handleChange}
                onBlur={CollectionAdminForm.handleBlur}
                error={CollectionAdminForm.errors.img}
                touched={CollectionAdminForm.touched.img}
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

export default CollectionForm;
