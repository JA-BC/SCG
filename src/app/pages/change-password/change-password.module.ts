import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { ChangePasswordComponent } from './change-password.component';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ChangePasswordComponent
    }
];

@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        CoreModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class ChangePasswordModule { }
