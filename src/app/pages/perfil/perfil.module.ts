import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { PerfilComponent } from './perfil.component';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: PerfilComponent
    }
];

@NgModule({
    declarations: [PerfilComponent],
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
export class PerfilModule { }
