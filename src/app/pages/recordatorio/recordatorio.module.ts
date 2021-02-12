import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RecordatorioComponent } from './recordatorio.component';

const routes: Routes = [
    {
        path: '',
        component: RecordatorioComponent
    }
];

@NgModule({
    declarations: [RecordatorioComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class RecordatorioModule { }
