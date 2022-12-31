import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

import { useRouter } from "next/router";
import { IAuthFormProps } from "./AuthForm.props";

import { useAuthContext } from "../../../app/providers/userProvider";
import Button from "../../atoms/Button";
import FormControl from "../../molecules/FormControl";
import { CATALOG_ROUTE } from "../../../utils/route.constant";
import { FAuth } from "../../../app/services/AuthService/Auth.types";
import Title from "../../atoms/Title";

const AuthForm = ({ onCreate, isRegistration, setIsRegistration }: IAuthFormProps) => {
    const { setUser, setToken } = useAuthContext();

    const router = useRouter();

    const create = onCreate;

    const UserForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            password: "",
            passwordConfirmation: "",
        },
        validationSchema: isRegistration
            ? Yup.object({
                  name: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
                  email: Yup.string()
                      .min(2, "Мінумум 2 символи")
                      .required("Обов'язкове поле")
                      .email("Данні некоректні"),
                  number: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
                  password: Yup.string().min(8, "Мінумум 8 символів").required("Обов'язкове поле"),
                  passwordConfirmation: Yup.string()
                      .oneOf([Yup.ref("password"), null], "Пароль не співпадає")
                      .required("Обов'язкове поле"),
              })
            : Yup.object({
                  email: Yup.string()
                      .min(2, "Мінумум 2 символи")
                      .required("Обов'язкове поле")
                      .email("Данні некоректні"),
                  password: Yup.string().min(8, "Мінумум 8 символів").required("Обов'язкове поле"),
              }),

        onSubmit: (values) => {
            create.mutateAsync(values).then((data: FAuth) => {
                setUser(data.user);
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("user", JSON.stringify(data.user));
                router.push(CATALOG_ROUTE);
            });

            UserForm.resetForm();
        },
    });

    return (
        <div>
            <form onSubmit={UserForm.handleSubmit} className="w-full">
                <Title variant="h3" className="my-3 text-center">
                    {isRegistration ? "Регістрація" : "Авторизація"}
                </Title>
                {isRegistration && (
                    <FormControl
                        placeholder="Введіть ім'я"
                        id="name"
                        type="text"
                        name="name"
                        value={UserForm.values.name}
                        onChange={UserForm.handleChange}
                        onBlur={UserForm.handleBlur}
                        error={UserForm.errors.name}
                        touched={UserForm.touched.name}
                    />
                )}

                <FormControl
                    placeholder="Введіть E-mail"
                    id="email"
                    type="text"
                    name="email"
                    value={UserForm.values.email}
                    onChange={UserForm.handleChange}
                    onBlur={UserForm.handleBlur}
                    error={UserForm.errors.email}
                    touched={UserForm.touched.email}
                />
                {isRegistration && (
                    <FormControl
                        placeholder="Введіть номер телефону"
                        id="number"
                        type="text"
                        name="number"
                        value={UserForm.values.number}
                        onChange={UserForm.handleChange}
                        onBlur={UserForm.handleBlur}
                        error={UserForm.errors.number}
                        touched={UserForm.touched.number}
                    />
                )}

                <FormControl
                    placeholder="Введіть пароль"
                    id="password"
                    type="password"
                    name="password"
                    value={UserForm.values.password}
                    onChange={UserForm.handleChange}
                    onBlur={UserForm.handleBlur}
                    error={UserForm.errors.password}
                    touched={UserForm.touched.password}
                />
                {isRegistration && (
                    <FormControl
                        placeholder="Підтвердіть пароль"
                        id="passwordConfirmation"
                        type="password"
                        name="passwordConfirmation"
                        value={UserForm.values.passwordConfirmation}
                        onChange={UserForm.handleChange}
                        onBlur={UserForm.handleBlur}
                        error={UserForm.errors.passwordConfirmation}
                        touched={UserForm.touched.passwordConfirmation}
                    />
                )}

                <Button type="submit" variant="black" className="mt-4 w-full py-2">
                    {isRegistration ? "Зареєструватись" : "Увійти"}
                </Button>
            </form>
            <div
                className="mt-3 cursor-pointer text-sm text-gray-600"
                onClick={() => setIsRegistration(!isRegistration)}
            >
                {isRegistration ? "Вже зареєстровані? Увійти в акаунт." : "Ще не зареєстровані? Створити акаунт."}
            </div>
        </div>
    );
};

export default AuthForm;
