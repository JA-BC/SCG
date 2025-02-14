import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { IonicModule } from '@ionic/angular';
import { API_URL_TOKEN } from '@core/interfaces/type';
import { environment } from '@env/environment';
import { BalanceService } from '@providers/balance.service';
import { CategoriaService } from '@providers/categoria.service';
import { SharedModule } from '@shared/shared.module';

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
        path: 'balance-form',
        loadChildren: () => import('./balance/form/form.module').then(m => m.BalanceFormModule)
    },
    {
        path: 'categoria-form',
        loadChildren: () => import('./categoria/form/form.module').then(m => m.CategoriaFormModule)
    },
    {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)
    },
    {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule)
    }
];

@NgModule({
    declarations: [
        PagesComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class PagesModule { }
