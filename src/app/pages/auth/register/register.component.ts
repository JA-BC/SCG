import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/auth.model';
import { AccountService } from '@providers/account.service';
import { INPUT_PATTERNS } from '@core/constants/pattern';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    PATTERNS = INPUT_PATTERNS;
    model: IUser = { };

    constructor(
        public readonly service: AccountService
    ) { }

    ngOnInit(): void { }
}
