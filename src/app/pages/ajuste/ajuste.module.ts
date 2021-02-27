import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { AjusteComponent } from './ajuste.component';

const routes: Routes = [
    {
        path: '',
        component: AjusteComponent
    }
]

@NgModule({
    declarations: [AjusteComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class AjusteModule { }
