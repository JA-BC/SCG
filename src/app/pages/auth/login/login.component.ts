import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '@core/interfaces/auth.model';
import { clearForm } from '@core/utils/functions';
import { AccountService } from '@providers/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    @ViewChild('form', { static: true }) form: NgForm;
    model: IUser = { };

    constructor(
        public readonly service: AccountService
    ) { }

    ngOnInit(): void { }

    ionViewDidLeave() {
        clearForm(this.form);
    }

}
