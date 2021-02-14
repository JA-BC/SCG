import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseList } from '@core/class/base-list';
import { BalanceService } from '@providers/balance.service';
import { IServicio } from 'src/app/models/servicio.model';
import { CHART_OPTIONS } from './chats-options';

@Component({
  templateUrl: './balance.component.html'
})
export class BalanceComponent extends BaseList<IServicio, BalanceService>
 implements OnInit, OnDestroy {

  chartOptions = CHART_OPTIONS;

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
