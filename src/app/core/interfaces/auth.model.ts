import { IEntity } from "./service.model";

export interface IToken {
    nameid: string;
    unique_name: string;
    email: string;
    exp: number;
}

export interface IUser {
    UserName?: string;
    Email?: string;
    Password?: string;
    NewPassword?: string;
    RememberMe?: boolean;
}
