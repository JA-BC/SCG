import { Injectable } from '@angular/core';
import { APIService } from '@core/class/base.service';
import { IRecordatorio } from '../models/recordatorio.model';

@Injectable({ providedIn: 'root' })
export class RecordatorioService extends APIService<IRecordatorio>{

    constructor() {
        super('recordatorio')
    }    
}
