import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(public modal: ModalController) { }

    ngOnInit(): void { }

    async presentRegister() {
        const modal = await this.modal.create({
            component: RegisterComponent
        });

        await modal.present();
    }

    async presentForgotPassword() {
        const modal = await this.modal.create({
            component: ForgotPasswordComponent
        });

        return await modal.present();
    }

}
