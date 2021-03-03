import { Injectable } from "@angular/core";
import { AuthService } from "@core/services/auth.service";

@Injectable({ providedIn: 'root' })
export class AccountService extends AuthService {

    constructor() {
        super('account');
    }
}
