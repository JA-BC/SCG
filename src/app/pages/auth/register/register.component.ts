import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/auth.model';
import { AccountService } from '@providers/account.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    model: IUser = { };

    constructor(
        public readonly service: AccountService
    ) { }

    ngOnInit(): void { }
}
