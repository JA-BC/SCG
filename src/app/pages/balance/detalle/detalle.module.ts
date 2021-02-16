import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DetalleComponent } from './detalle.component';

const routes: Routes = [
    {
        path: '',
        component: DetalleComponent
    }
];

@NgModule({
    declarations: [DetalleComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class DetalleModule { }
