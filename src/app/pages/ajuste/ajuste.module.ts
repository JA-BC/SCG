import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class AjusteModule { }
