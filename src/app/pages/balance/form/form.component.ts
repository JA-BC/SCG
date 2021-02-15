import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseForm } from '@core/class/base-form';
import { BalanceService } from '@providers/balance.service';
import { IBalance } from 'src/app/models/balance.model';

@Component({
    templateUrl: './form.component.html'
})
export class BalanceFormComponent extends BaseForm<IBalance, BalanceService>
 implements OnInit, OnDestroy {

    constructor(
        public readonly service: BalanceService
    ) {
        super(service);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    setToday(prop: string) {
        const date = new Date().toISOString().split('T')[0];
        this.service.model[prop] = date;
    }
    
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
