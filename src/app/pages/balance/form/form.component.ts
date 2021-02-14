import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseForm } from '@core/class/base-form';
import { BalanceService } from '@providers/balance.service';
import { IServicio } from 'src/app/models/servicio.model';

@Component({
    templateUrl: './form.component.html'
})
export class BalanceFormComponent extends BaseForm<IServicio, BalanceService>
 implements OnInit, OnDestroy {

    constructor(
        public readonly service: BalanceService
    ) {
        super(service);
    }

    ngOnInit() {
        super.ngOnInit();
    }
    
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
