import { IEntity } from "@core/interfaces/service.model";

export interface IServicio extends IEntity {
    Nombre?: string;
    Costo?: number;
    CategoriaId?: number;
    CategoriaNombre: string;
    CategoriaColor?: string;
    Fecha?: string;
}

