import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFillForm } from "../../../app/hooks/useFillForm";
import { useAuthContext } from "../../../app/providers/userProvider";
import { IUserBasket } from "../../../app/services/BasketService/Basket.types";
import { useConfirm, useFetchUserBasket } from "../../../app/services/BasketService/hooks";
import Button from "../../atoms/Button";
import CustomSelect from "../../atoms/Select";
import { Option } from "../../atoms/Select/Select.props";
import Title from "../../atoms/Title";
import Error from "../../molecules/Action/Error";
import Success from "../../molecules/Action/Success";
import FormControl from "../../molecules/FormControl";
import { deliveryOptions, paymentOptions } from "./constants";
import { IOrderFormProps } from "./OrderForm.props";

const OrderForm = ({ updateBasket }: IOrderFormProps) => {
    const [delivery, setDelivery] = useState<Option>(deliveryOptions[0]);
    const [payment, setPayment] = useState<Option>(paymentOptions[0]);

    const { user } = useAuthContext();

    const basket = useFetchUserBasket(String(user._id), {
        enabled: !!user._id,
        select(data: any) {
            return data.basket.map((item: IUserBasket) => item._id);
        },
    });

    const confirm = useConfirm();

    useEffect(() => {
        useFillForm(user, OrderForm);
    }, []);

    useEffect(() => {
        if (confirm.isSuccess) {
            updateBasket();
        }
    }, [confirm.isSuccess]);

    const OrderForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            city: "",
            adress: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            email: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            number: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            city: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            adress: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
        }),

        onSubmit: (values): void => {
            if (user._id) {
                confirm.mutateAsync({
                    userId: user._id,
                    ...values,
                    payment: payment.value,
                    delivery: delivery.value,
                    basket: basket.data,
                });
            }
        },
    });

    if (confirm.isSuccess) {
        return <Success />;
    }

    if (confirm.isError) {
        return <Error />;
    }

    return (
        <form onSubmit={OrderForm.handleSubmit} className="bg-white p-5">
            <Title variant="h2" className="sm:text-center">
                Підтвердити замовлення
            </Title>
            <div className="row-auto mt-3 grid grid-cols-2 gap-x-10 gap-y-3">
                <FormControl
                    placeholder="Ваше ім'я"
                    id="name"
                    type="text"
                    name="name"
                    value={OrderForm.values.name}
                    onChange={OrderForm.handleChange}
                    onBlur={OrderForm.handleBlur}
                    error={OrderForm.errors.name}
                    touched={OrderForm.touched.name}
                />
                <FormControl
                    placeholder="Ваш E-mail"
                    id="email"
                    type="text"
                    name="email"
                    value={OrderForm.values.email}
                    onChange={OrderForm.handleChange}
                    onBlur={OrderForm.handleBlur}
                    error={OrderForm.errors.email}
                    touched={OrderForm.touched.email}
                />
                <FormControl
                    placeholder="Ваш номер телефону"
                    id="number"
                    type="text"
                    name="number"
                    value={OrderForm.values.number}
                    onChange={OrderForm.handleChange}
                    onBlur={OrderForm.handleBlur}
                    error={OrderForm.errors.number}
                    touched={OrderForm.touched.number}
                />
                <FormControl
                    placeholder="Місто"
                    id="city"
                    type="text"
                    name="city"
                    value={OrderForm.values.city}
                    onChange={OrderForm.handleChange}
                    onBlur={OrderForm.handleBlur}
                    error={OrderForm.errors.city}
                    touched={OrderForm.touched.city}
                />
                <FormControl
                    placeholder="Номер або адреса віділення "
                    id="adress"
                    type="text"
                    name="adress"
                    value={OrderForm.values.adress}
                    onChange={OrderForm.handleChange}
                    onBlur={OrderForm.handleBlur}
                    error={OrderForm.errors.adress}
                    touched={OrderForm.touched.adress}
                />
                <CustomSelect
                    onChange={setDelivery}
                    value={delivery}
                    options={deliveryOptions}
                    id="delivery"
                    instanceId="deliveryOptions"
                />
                <CustomSelect
                    onChange={setPayment}
                    value={payment}
                    options={paymentOptions}
                    id="payment"
                    instanceId="setPayment"
                />
                <Button type="submit" variant="black" className="w-full px-5 py-2 align-top ">
                    Підтвердити
                </Button>
            </div>
        </form>
    );
};

export default OrderForm;
