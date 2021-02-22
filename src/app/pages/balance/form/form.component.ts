import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseForm } from '@core/class/base-form';
import { StorageService } from '@core/services/storage.service';
import { BalanceService } from '@providers/balance.service';
import { CategoriaService } from '@providers/categoria.service';
import { IBalance } from 'src/app/models/balance.model';
import { ICategoria } from 'src/app/models/categoria.model';

@Component({
    templateUrl: './form.component.html',
    providers: [CategoriaService]
})
export class BalanceFormComponent extends BaseForm<IBalance, BalanceService>
 implements OnInit, OnDestroy {

    categorias: ICategoria[] = [];

    constructor(
        public readonly service: BalanceService,
        private readonly categoriaService: CategoriaService
    ) {
        super(service);
    }

    ngOnInit() {
        super.ngOnInit();
        this.fillCategorias();
    }

    setToday(prop: string) {
        const date = new Date().toISOString().split('T')[0];
        this.service.model[prop] = date;
    }

    async fillCategorias() {
        const { Data } = await this.categoriaService.load();
        this.categorias = Data;
    }
    
    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
