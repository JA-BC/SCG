import { IEntity } from "@core/interfaces/service.model";

export interface IBalance extends IEntity {
    Descripcion?: string;
    Costo?: number;
    CategoriaId?: number;
    CategoriaNombre: string;
    CategoriaTipoCategoriaId: number;
    CategoriaColor?: string;
    Fecha?: string;
}

