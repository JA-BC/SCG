import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/auth.model';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

    model: IUser = { };

    constructor(
        public readonly service: AuthService
    ) { }

    ngOnInit(): void { }
}
