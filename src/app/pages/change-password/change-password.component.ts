import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core/services/token.service';
import { IUser } from '@core/interfaces/auth.model';
import { parseJwt } from '@core/utils/functions';
 
@Component({
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

    model: IUser = {};

    constructor(
        public readonly service: AuthService,
        private readonly tokenService: TokenService
    ) {}

    ngOnInit() {}

    ionViewWillEnter() {
        this.tokenService.getToken().then(v => {
            this.model.UserName = parseJwt(v)?.email; // Is unique
        })
    }

}

