import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/auth.model';
import { AccountService } from '@providers/account.service';
 
@Component({
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

    model: IUser = {
        UserName: this.service.claims.email
    };

    constructor(
        public readonly service: AccountService
    ) {}

    ngOnInit() {}

}

