import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseList } from '@core/class/base-list';
import { RecordatorioService } from '@providers/recordatorio.service';
import { IRecordatorio } from 'src/app/models/recordatorio.model';

@Component({
    templateUrl: './recordatorio.component.html'
})
export class RecordatorioComponent extends BaseList<IRecordatorio, RecordatorioService>
 implements OnInit, OnDestroy {
    
    constructor(
        public readonly service: RecordatorioService
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
