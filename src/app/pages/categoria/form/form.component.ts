import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseForm } from '@core/class/base-form';
import { CategoriaService } from '@providers/categoria.service';
import { ICategoria } from 'src/app/models/categoria.model';

@Component({
    selector: 'categoria-form',
    templateUrl: './form.component.html'
})
export class CategoriaFormComponent extends BaseForm<ICategoria, CategoriaService>
 implements OnInit, OnDestroy {

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

    constructor(
        public readonly service: CategoriaService
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
