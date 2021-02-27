import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { RecordatorioFormComponent } from './form.component';

const routes: Routes = [
    {
        path: '',
        component: RecordatorioFormComponent
    }
];

@NgModule({
    declarations: [RecordatorioFormComponent],
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
export class RecordatorioFormModule { }
