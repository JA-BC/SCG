import { IEntity } from "./service.model";

export interface IToken {
    exp: number;
}

export interface IUser {
    UserName?: string;
    Email?: string;
    Password?: string;
    RememberMe?: boolean;
}
