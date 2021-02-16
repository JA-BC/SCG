import { IEntity } from "@core/interfaces/service.model";

export interface IRecordatorio extends IEntity {
    Costo: number;
    CategoriaId: number;
    Activo: boolean;
    RecordarCada: number;
}

