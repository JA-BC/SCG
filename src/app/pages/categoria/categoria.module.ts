import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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
        IonicModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class CategoriaModule { }
