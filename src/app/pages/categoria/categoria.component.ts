import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseList } from '@core/class/base-list';
import { CategoriaService } from '@providers/categoria.service';
import { ICategoria } from 'src/app/models/categoria.model';
import { TPairs } from '@core/interfaces/type';

@Component({
    templateUrl: './categoria.component.html'
})
export class CategoriaComponent extends BaseList<ICategoria, CategoriaService>
 implements OnInit, OnDestroy {
    
     filter: TPairs<string> = {
         key: 'TipoCategoriaId',
         value: '1'
     }

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
