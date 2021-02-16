import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseForm } from '@core/class/base-form';
import { RecordatorioService } from '@providers/recordatorio.service';
import { IRecordatorio } from 'src/app/models/recordatorio.model';

@Component({
    templateUrl: './form.component.html'
})
export class RecordatorioFormComponent extends BaseForm<IRecordatorio, RecordatorioService>
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
