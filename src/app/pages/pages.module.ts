import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    { path: '', redirectTo: 'balance', pathMatch: 'full' },
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'balance',
                loadChildren: () => import('./balance/balance.module').then(m => m.BalanceModule)
            },
            {
                path: 'categoria',
                loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)
            },
            {
                path: 'recordatorio',
                loadChildren: () => import('./recordatorio/recordatorio.module').then(m => m.RecordatorioModule)
            },
            {
                path: 'ajuste',
                loadChildren: () => import('./ajuste/ajuste.module').then(m => m.AjusteModule)
            }
        ]
    },
    //
    // Routes without tabs here
    //
    {
        path: 'form',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    },
    {
        path: 'categoria-form',
        loadChildren: () => import('./categoria/form/form.module').then(m => m.CategoriaFormModule)
    }
];

@NgModule({
    declarations: [
        PagesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class PagesModule { }
