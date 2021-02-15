import { Injectable } from '@angular/core';
import { APIService } from '@core/class/base.service';
import { ICategoria } from '../models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService extends APIService<ICategoria> {
    
    constructor() {
        super('categoria');
    }

}
