import { IEntity } from "@core/interfaces/service.model";

export interface ICategoria extends IEntity {
    Nombre?: string;
    TipoCategoriaId?: number;
    TipoCategoriaDescripcion?: string;
}

export enum ETipoCategoria {
    Ingreso = 1,
    Gasto
}
