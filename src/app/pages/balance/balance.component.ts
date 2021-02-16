import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseList } from '@core/class/base-list';
import { BalanceService } from '@providers/balance.service';
import { IBalance } from 'src/app/models/balance.model';
import { CHART_OPTIONS } from './chats-options';

@Component({
  templateUrl: './balance.component.html'
})
export class BalanceComponent extends BaseList<IBalance, BalanceService>
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

  // override super.onLoaded()
  onLoaded(data: IBalance[]) {
    console.log('BalanceComponent Data Loaded');
    this.chartOptions.series = [this.ingresoTotal, this.gastoTotal];
  }

  onItemClick(model: IBalance) {
    this.service.model = model;
    this.router.navigate(['/app/balance-detalle']);
  }

  get balanceDiffer() {
    return Math.max(this.ingresoTotal - this.gastoTotal, 0);
  }

  get ingresoTotal() {
    if (this.service.data.length < 1) {
      return 0;
    }

    const ingresos = this.service.data.filter(x => {
      // 1 is equals to ingreso
      return x.CategoriaTipoCategoriaId === 1
    }) || [];

    let total = 0;
    ingresos.forEach(item => {
      total += item?.Costo;
    });

    return total;
  }

  get gastoTotal() {
    if (this.service.data.length < 1) {
      return 0;
    }

    const gastos = this.service.data.filter(x => {
      // 1 is equals to gasto
      return x.CategoriaTipoCategoriaId === 2
    }) || [];

    let total = 0;
    gastos.forEach(item => {
      total += item?.Costo;
    });

    return total;
  }

  get ingresoPercent() {
    return (this.ingresoTotal / (this.ingresoTotal + this.gastoTotal)) * 100;
  }

  get gastoPercent() {
    return (this.gastoTotal / (this.ingresoTotal + this.gastoTotal)) * 100;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
