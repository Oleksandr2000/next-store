import { createContext, Dispatch, ReactNode, useContext, useState, SetStateAction } from "react";
import { IUser } from "../services/AuthService/Auth.types";

type useDispatchType<T> = Dispatch<SetStateAction<T>>;

interface IUserContext {
    token: string;
    user: IUser;
    setUser: useDispatchType<IUser>;
    setToken: useDispatchType<string>;
    logout: () => void;
}

interface IUserProvider {
    children: ReactNode;
}

const initialValues: IUserContext = {
    token: typeof window !== "undefined" ? String(localStorage.getItem("token")) : "",
    user:
        typeof window !== "undefined"
            ? JSON.parse(String(localStorage.getItem("user")))
            : {
                  _id: "",
                  name: "",
                  email: "",
                  number: "",
                  role: "",
                  password: "",
              },
    setUser: () => {},
    setToken: () => {},
    logout: () => {},
};

export const UserContext = createContext<IUserContext>(initialValues);

export const useAuthContext = () => useContext(UserContext);

export const UserProvider = ({ children }: IUserProvider) => {
    const [user, setUser] = useState<IUser>(initialValues.user);
    const [token, setToken] = useState<string>(initialValues.token);

    const logout = () => {
        setUser({
            _id: "",
            name: "",
            email: "",
            number: "",
            role: "",
            password: "",
        });

        setToken("");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const value = {
        token,
        user,
        setUser,
        setToken,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
