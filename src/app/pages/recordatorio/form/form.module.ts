import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class RecordatorioFormModule { }
