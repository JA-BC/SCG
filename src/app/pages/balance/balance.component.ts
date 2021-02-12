import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit {

    items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    chartOptions = {
    series: [44, 55],
    chart: {
      // width: 300,
      type: "donut"
    },
    labels: ["Ingresos", "Gastos"],
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: {
            width: 250
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  }
    constructor() { }

    ngOnInit() { }
}
