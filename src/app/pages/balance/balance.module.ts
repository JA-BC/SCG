import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceComponent } from './balance.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '@core/core.module';

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
        IonicModule,
        CoreModule,
        NgApexchartsModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class BalanceModule { }
