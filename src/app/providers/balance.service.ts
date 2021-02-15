import { Injectable } from '@angular/core';
import { APIService } from '@core/class/base.service';
import { IBalance } from '../models/balance.model';

@Injectable({ providedIn: 'root' })
export class BalanceService extends APIService<IBalance>{

    constructor() {
        super('balance');
    }
    
}
