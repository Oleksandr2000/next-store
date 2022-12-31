import { useFormik } from "formik";
import React from "react";

import * as Yup from "yup";

import Button from "../../atoms/Button";
import Title from "../../atoms/Title";
import FormControl from "../../molecules/FormControl";

const FeedbackForm = () => {
    const FeedbackForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            email: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
            number: Yup.string().min(2, "Мінумум 2 символи").required("Обов'язкове поле"),
        }),

        onSubmit: (values: any): void => {
            if (values) {
                console.log(values);
            }
            FeedbackForm.resetForm();
        },
    });

    return (
        <div className="my-10 flex items-center justify-center">
            <form onSubmit={FeedbackForm.handleSubmit} className="w-full">
                <Title variant="h2" className="sm:text-center">
                    Дізнайтесь перші
                </Title>
                <div className="my-5 text-sm font-normal sm:my-10 sm:text-center">
                    Закриті розпродажі, акції та підбірки образів для тебе
                </div>
                <div className="sm:flex sm:w-full sm:flex-row sm:items-center sm:justify-around">
                    <FormControl
                        placeholder="Ваше ім'я"
                        id="name"
                        type="text"
                        name="name"
                        value={FeedbackForm.values.name}
                        onChange={FeedbackForm.handleChange}
                        onBlur={FeedbackForm.handleBlur}
                        error={FeedbackForm.errors.name}
                        touched={FeedbackForm.touched.name}
                    />
                    <FormControl
                        placeholder="Ваш E-mail"
                        id="email"
                        type="text"
                        name="email"
                        value={FeedbackForm.values.email}
                        onChange={FeedbackForm.handleChange}
                        onBlur={FeedbackForm.handleBlur}
                        error={FeedbackForm.errors.email}
                        touched={FeedbackForm.touched.email}
                    />
                    <FormControl
                        placeholder="Ваш номер телефону"
                        id="number"
                        type="text"
                        name="number"
                        value={FeedbackForm.values.number}
                        onChange={FeedbackForm.handleChange}
                        onBlur={FeedbackForm.handleBlur}
                        error={FeedbackForm.errors.number}
                        touched={FeedbackForm.touched.number}
                    />

                    <Button type="submit" variant="black" className="mt-4 w-full py-2 sm:m-0 sm:w-1/5">
                        Підписатися
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FeedbackForm;
