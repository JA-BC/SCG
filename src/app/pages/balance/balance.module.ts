import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { BalanceComponent } from './balance.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
    {
        path: '',
        component: BalanceComponent
    }
];

@NgModule({
    declarations: [BalanceComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgApexchartsModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class BalanceModule { }
