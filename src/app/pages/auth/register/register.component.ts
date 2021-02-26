import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/auth.model';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    model: IUser = { };

    constructor(public readonly service: AuthService) { }

    ngOnInit(): void { }
}
