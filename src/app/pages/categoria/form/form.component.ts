import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'categoria-form',
    templateUrl: './form.component.html'
})
export class CategoriaFormComponent implements OnInit {

    tipoCategoria = [
        {
           key: "Ingreso",
           value: 1
        },
        {
           key: "Gasto",
           value: 2
        }
    ];

    model: any = {};

    constructor() { }

    ngOnInit() { }
}
