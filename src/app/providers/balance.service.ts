import { Injectable } from '@angular/core';
import { APIService } from '@core/class/base.service';
import { IServicio } from '../models/servicio.model';

@Injectable({ providedIn: 'root' })
export class BalanceService extends APIService<IServicio>{

    constructor() {
        super('balance');
    }
    
}
