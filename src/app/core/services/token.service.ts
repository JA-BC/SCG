import { Injectable } from '@angular/core';
import { IToken } from '@core/interfaces/auth.model';
import { parseJwt } from '../utils/functions';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class TokenService {

    readonly TOKEN_NAME = 'token';
    readonly HEADER_PREFIX = 'Bearer';
    readonly HEADER_TYPE = 'Authorization';

    constructor(private readonly storage: StorageService) { }

    async getToken(): Promise<string> {
        const token = await this.storage.get(this.TOKEN_NAME) as string;
        return token;
    }

    async setToken(token: string): Promise<string> {
        await this.storage.set(this.TOKEN_NAME, token);
        return token;
    }

    async isOutOfDate(): Promise<boolean> {
        const encodeToken = await this.getToken();

        if (encodeToken.trim().length < 1) {
            return true;
        }

        const token = parseJwt(encodeToken) as IToken;

        return Date.now() >= (token.exp * 1000) || token === null;
    }

    async removeToken(): Promise<string> {
        const token = await this.storage.get(this.TOKEN_NAME) as string;

        if (!token) {
            return;
        }

        await this.storage.remove(this.TOKEN_NAME);
        return token;
    }

}
