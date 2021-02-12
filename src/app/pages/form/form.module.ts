import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormComponent } from './form.component';
import { CoreModule } from '@core/core.module';

const routes: Routes = [
    {
        path: '',
        component: FormComponent
    }
];

@NgModule({
    declarations: [FormComponent],
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
export class FormModule { }
