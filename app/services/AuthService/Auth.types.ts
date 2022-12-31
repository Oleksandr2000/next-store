export interface IUser {
    _id?: string;
    name: string;
    email: string;
    number: string;
    role?: string;
    password: string;
}

export type FAuth = {
    token: string;
    user: IUser;
};
