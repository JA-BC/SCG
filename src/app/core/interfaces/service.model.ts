import { Observable } from "rxjs";

export class ActionEvent<T> {
  constructor(public action: T, public args?: any | any[]) {}
}

export interface IEntity {
  Id: number;
}

export enum EServiceState {
  Browse,
  Update,
  Load,
  Cancel
}

export enum EHttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum EPushModel {
  Insert,
  Replace,
  SoftDelete,
  Append
}

export class Pagination {
    Limit: number;
    Page: number;
    TotalCount: number;

    constructor(limit?: number, total?: number, page?: number) {
        this.Limit = limit || 100;
        this.Page = page || 1;
        this.TotalCount = total || 0;
    }

    get skip(): number {
      return (this.Page - 1) * this.Limit;
    }

    get take(): number {
      return ((this.Page - 1) * this.Limit) + this.Limit;
    }
}

export class Filter {

  constructor(
    public PropertyName: string,
    public Value: string,
    public Operator: EFilterOperator = EFilterOperator.Contains) { }
}

export enum EFilterOperator {
  Contains,
  Equals,
  NotEquals,
  GreaterThan,
  LessThan,
  Between,
  EndWith,
  StartWith
}

export class SortFilter {

  constructor(
    public PropertyName: string,
    public Operator: ESortOperator = ESortOperator.Ascendent) { }
}

export enum ESortOperator {
  Ascendent,
  Descendent
}

export class HttpResponse<TModel> {
  Data: TModel[];
  TotalCount: number;
}

export class HttpRequest {
  Pagination = new Pagination();
  Filters: Filter[] = [];
  Sorts: SortFilter[] = [];
}
