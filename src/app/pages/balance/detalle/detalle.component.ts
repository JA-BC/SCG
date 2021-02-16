import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '@core/class/base-list';
import { IonBackButton } from '@ionic/angular';
import { BalanceService } from '@providers/balance.service';
import { IBalance } from 'src/app/models/balance.model';

@Component({
    templateUrl: './detalle.component.html'
})
export class DetalleComponent extends BaseList<IBalance, BalanceService>
 implements OnInit, OnDestroy {

    constructor(
        public readonly service: BalanceService
    ) {
        super(service);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onDeleted(model?: IBalance) {
        super.onDeleted(model);
        this.router.navigate(['/app/balance']);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.service.model = {};
    }

}
