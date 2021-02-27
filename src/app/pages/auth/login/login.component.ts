import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '@core/interfaces/auth.model';
import { AuthService } from '@core/services/auth.service';
import { clearForm } from '@core/utils/functions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    @ViewChild('form', { static: true }) form: NgForm;
    model: IUser = { };

    constructor(
        public readonly service: AuthService
    ) { }

    ngOnInit(): void { }

    ionViewDidLeave() {
        clearForm(this.form);
    }

}
