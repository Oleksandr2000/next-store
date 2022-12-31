import axios from "../axios";
import { FAuth, IUser } from "./Auth.types";

const AuthService = {
    async registration(dto: IUser) {
        const { data } = await axios.post<FAuth>(`/api/auth/registration`, dto);
        return data;
    },

    async login(dto: IUser) {
        const { data } = await axios.post<FAuth>(`/api/auth/login`, dto);
        return data;
    },
};

export default AuthService;
