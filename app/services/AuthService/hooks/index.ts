import { useMutation } from "react-query";
import { toast } from "react-toastify";
import AuthService from "..";
import { IUser } from "../Auth.types";

export const useRegistration = () =>
    useMutation((dto: Omit<IUser, "_id">) => AuthService.registration(dto), {
        onSuccess: () => {
            toast.success(`Вітаю ви створили акаунт`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });

export const useLogin = () =>
    useMutation((dto: Omit<IUser, "_id">) => AuthService.login(dto), {
        onSuccess: () => {
            toast.success(`Вітаю ви успішно авторизованні`, {
                theme: "colored",
            });
        },
        onError: (data: any) => {
            toast.error(data.response.data.message, {
                theme: "colored",
            });
        },
    });
