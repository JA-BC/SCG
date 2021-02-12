import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CategoriaComponent } from './categoria.component';

const routes: Routes = [
    { path: '', redirectTo: 'ingreso', pathMatch: 'full' },
    {
        path: '',
        component: CategoriaComponent,
    }
];

@NgModule({
    declarations: [CategoriaComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class CategoriaModule { }
