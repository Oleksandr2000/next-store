import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import * as Yup from "yup";

import { setFilterOption } from "./helpers";
import { IProductFormProps } from "./ProductForm.props";

import { transformToOption } from "../../../app/helpers";
import { useFillForm } from "../../../app/hooks/useFillForm";
import { useFetchCategories } from "../../../app/services/CategoryService/hooks";
import { useFetchCategoryFilters } from "../../../app/services/FilterService/hooks";
import {
    useCreateProduct,
    useDeleteProduct,
    useFetchAllProducts,
    useFetchOneProduct,
    useUpdateProduct,
} from "../../../app/services/ProductService/hooks";
import { ProductImage, ProductMaterial, Size } from "../../../app/services/ProductService/Product.types";
import Button from "../../atoms/Button";
import Checkbox from "../../atoms/Checkbox";
import CustomSelect from "../../atoms/Select";
import { Option } from "../../atoms/Select/Select.props";
import FormControl from "../../molecules/FormControl";
import MultiFieldSelect from "../../molecules/MultiFieldSelect";
import MultiFormControl from "../../molecules/MultiFormControl";
import Title from "../../atoms/Title";

const ProductForm = ({ title, isUpdate = false }: IProductFormProps) => {
    const [selectedProduct, setSelectedProduct] = useState<Option>({ label: "", value: "" });
    const [selectedCategory, setSelectedCategory] = useState<Option>({ label: "", value: "" });
    const [material, setMaterial] = useState<ProductMaterial[]>([{ name: "", value: 0, id: Date.now() }]);
    const [size, setSize] = useState<Size[]>([{ name: "", count: 0, id: Date.now() }]);
    const [image, setImage] = useState<ProductImage[]>([{ src: "", id: Date.now() }]);
    const [color, setColor] = useState<Option>({ label: "", value: "" });
    const [colorsOption, setColorsOption] = useState<Option[]>([{ label: "", value: "" }]);
    const [materialsOption, setMaterialsOption] = useState<Option[]>([{ label: "", value: "" }]);
    const [sizesOption, setSizesOption] = useState<Option[]>([{ label: "", value: "" }]);
    const [freeSizesOption, setFreeSizesOption] = useState<Option[]>([{ label: "", value: "" }]);
    const [freeMaterialsOption, setFreeMaterialsOption] = useState<Option[]>([{ label: "", value: "" }]);
    const [selectedProducts, setSelectedProducts] = useState<Option[]>([]);

    const categories = useFetchCategories({
        select: (data: any) => transformToOption(data, "name", "slug"),
        onSuccess: (data: any) => setSelectedCategory(data[0]),
    });

    const products = useFetchAllProducts({
        select: (data: any) => transformToOption(data.products, "title", "_id"),
    });

    const filters = useFetchCategoryFilters(selectedCategory.value, {
        enabled: !!selectedCategory.value,
        select: (data: any) => {
            const newData = {};

            Object.keys(data).map((key: string) => {
                newData[key] = transformToOption(data[key], "name", "name");
            });

            return newData;
        },
        onSuccess: (data: any) => {
            setColorsOption(data.colors);
            setMaterialsOption(data?.materials);
            setSizesOption(data?.sizes);
            if (!isUpdate) {
                setFreeMaterialsOption(data?.materials);
                setFreeSizesOption(data?.sizes);
            }
        },
    });

    const product = useFetchOneProduct(selectedProduct.value, {
        enabled: selectedProduct.value !== undefined && !!materialsOption && !!sizesOption,
        onSuccess: (data: any) => {
            if (isUpdate && data.product) {
                useFillForm(data.product, ProductAdminForm);
                setColor({ label: data.product.color.name, value: data.product.color.name });
                setMaterial(data.product.material);
                setSize(data.product.sizes);
                setImage(data.product.images);
                setSelectedCategory(categories.data.find((item: Option) => item.value === data.product.category));
                setSelectedProducts(transformToOption(data.product.recomendation, "title", "_id") || []);
            }
        },
    });

    const create = useCreateProduct();
    const update = useUpdateProduct();
    const destroy = useDeleteProduct();

    const handleChangeCategory = (value: any) => {
        if (size[0].name !== "" || material[0].name !== "" || color.label !== "") {
            const access: boolean = confirm("Зміна категорії знищить вказанні фільтри");

            if (access) {
                setSize([{ name: "", count: 0, id: Date.now() }]);
                setMaterial([{ name: "", value: 0, id: Date.now() }]);
                setColor({ label: "", value: "" });
                setSelectedCategory(value);
            }
        } else {
            setSelectedCategory(value);
        }
    };

    useEffect(() => {
        product.refetch();
    }, [selectedProduct]);

    useEffect(() => {
        filters.refetch();
    }, [selectedCategory]);

    useEffect(() => {
        setFilterOption(size, setFreeSizesOption, sizesOption);
    }, [size]);

    useEffect(() => {
        setFilterOption(material, setFreeMaterialsOption, materialsOption);
    }, [material]);

    useEffect(() => {
        products.refetch();
    }, [update.isSuccess, create.isSuccess, destroy.isSuccess]);

    const ProductAdminForm = useFormik({
        initialValues: {
            title: "",
            price: 0,
            sale: 0,
            hit: false,
            description: "",
            colorValue: "",
            code: "",
            category: "",
            disabled: false,
        },
        validationSchema: Yup.object({
            title: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            price: Yup.number().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            description: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            colorValue: Yup.string().min(4, "Мінумум 4 символи").required("Обов'язкове поле"),
        }),

        onSubmit: (values): any => {
            const body = {
                ...values,
                color: {
                    name: color.value,
                    value: values.colorValue,
                },
                sizes: size,
                material,
                images: image,
                category: selectedCategory.value,
                recomendation: selectedProducts.map((item) => item.value),
            };

            if (isUpdate) {
                update.mutateAsync({ data: body, id: selectedProduct.value });
            }

            if (!isUpdate) {
                create.mutateAsync(body);
            }
        },
    });

    return (
        <div className="mb-20">
            <form onSubmit={ProductAdminForm.handleSubmit}>
                <Title variant="h2">{title}</Title>
                {isUpdate && (
                    <CustomSelect
                        instanceId="maintain_products"
                        id="maintain_products"
                        value={selectedProduct}
                        options={products.data}
                        onChange={setSelectedProduct}
                        isLoading={products.isLoading}
                    />
                )}
                <FormControl
                    placeholder="Введіть назву"
                    id="title"
                    type="text"
                    name="title"
                    value={ProductAdminForm.values.title}
                    onChange={ProductAdminForm.handleChange}
                    onBlur={ProductAdminForm.handleBlur}
                    error={ProductAdminForm.errors.title}
                    touched={ProductAdminForm.touched.title}
                />
                <FormControl
                    placeholder="Введіть ціну"
                    id="price"
                    type="number"
                    name="price"
                    value={ProductAdminForm.values.price}
                    onChange={ProductAdminForm.handleChange}
                    onBlur={ProductAdminForm.handleBlur}
                    error={ProductAdminForm.errors.price}
                    touched={ProductAdminForm.touched.price}
                />
                <FormControl
                    placeholder="Введіть знижку"
                    id="sale"
                    type="number"
                    name="sale"
                    value={ProductAdminForm.values.sale}
                    onChange={ProductAdminForm.handleChange}
                    onBlur={ProductAdminForm.handleBlur}
                    error={ProductAdminForm.errors.sale}
                    touched={ProductAdminForm.touched.sale}
                />
                <FormControl
                    placeholder=""
                    id="code"
                    type="text"
                    name="code"
                    value={ProductAdminForm.values.code}
                    onChange={ProductAdminForm.handleChange}
                    onBlur={ProductAdminForm.handleBlur}
                    error={ProductAdminForm.errors.code}
                    touched={ProductAdminForm.touched.code}
                />
                <CustomSelect
                    instanceId="product_category"
                    id="product_category"
                    value={selectedCategory}
                    options={categories.data}
                    onChange={(value) => handleChangeCategory(value)}
                    isLoading={categories.isLoading}
                />
                <MultiFieldSelect
                    placeholder="Вкажіть відсоток матеріалу"
                    keys={["name", "value"]}
                    title="Додати Матеріал"
                    values={material}
                    onChange={(newValue: any) => setMaterial(newValue)}
                    options={freeMaterialsOption}
                />
                <MultiFieldSelect
                    placeholder="Вкажіть кількість товарів"
                    keys={["name", "count"]}
                    title="Додати Розмір"
                    values={size}
                    onChange={(newValue: any) => setSize(newValue)}
                    options={freeSizesOption}
                />
                <div className="grid grid-cols-2 gap-4">
                    <CustomSelect
                        onChange={setColor}
                        value={color}
                        options={colorsOption}
                        id="color name"
                        instanceId="color name"
                    />
                    <FormControl
                        placeholder="Додайте відтінок в hex форматі"
                        id="colorValue"
                        type="text"
                        name="colorValue"
                        value={ProductAdminForm.values.colorValue}
                        onChange={ProductAdminForm.handleChange}
                        onBlur={ProductAdminForm.handleBlur}
                        error={ProductAdminForm.errors.colorValue}
                        touched={ProductAdminForm.touched.colorValue}
                    />
                </div>
                <MultiFormControl title="Додати Фото" values={image} setValues={setImage} keys={["src"]} />
                <FormControl
                    placeholder="Додайте короткий опис"
                    id="description"
                    type="text"
                    name="description"
                    value={ProductAdminForm.values.description}
                    onChange={ProductAdminForm.handleChange}
                    onBlur={ProductAdminForm.handleBlur}
                    error={ProductAdminForm.errors.description}
                    touched={ProductAdminForm.touched.description}
                />
                <CustomSelect
                    id="products"
                    instanceId="products"
                    onChange={setSelectedProducts}
                    value={selectedProducts}
                    options={products.data}
                    isMulti
                />
                <br />
                <div className="my-5 flex flex-row items-center">
                    <div className="mr-10">
                        <Checkbox
                            value="Хіт"
                            values={ProductAdminForm.values.hit}
                            name="hit"
                            onChange={ProductAdminForm.handleChange}
                        />
                    </div>
                    <div className="mr-10">
                        <Checkbox
                            value="Немає в наявності"
                            values={ProductAdminForm.values.disabled}
                            name="disabled"
                            onChange={ProductAdminForm.handleChange}
                        />
                    </div>
                </div>
                {isUpdate ? (
                    <div className="grid grid-cols-2 gap-6">
                        <Button type="submit" variant="black" className="mt-4 w-full py-2">
                            Далі
                        </Button>
                        <Button
                            type="button"
                            variant="black"
                            className="mt-4 w-full bg-red-900 py-2"
                            onClick={() => destroy.mutateAsync(selectedProduct.value)}
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

export default ProductForm;
