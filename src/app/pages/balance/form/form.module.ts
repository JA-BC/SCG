import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BalanceFormComponent } from './form.component';
import { CoreModule } from '@core/core.module';

const routes: Routes = [
    {
        path: '',
        component: BalanceFormComponent
    }
];

@NgModule({
    declarations: [BalanceFormComponent],
    imports: [
        CommonModule,
        IonicModule,
        CoreModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class BalanceFormModule { }
