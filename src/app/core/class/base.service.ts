import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { EHttpMethod, IEntity, EServiceState, EPushModel, APIRequest, APIResponse } from "@core/interfaces/service.model";
import { API_URL_TOKEN } from "@core/interfaces/type";
import { AppInjector } from "@core/helpers/injector";
import { throwError, Subject, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorHandler } from "@angular/core";

export abstract class BaseService<TModel> {

    private readonly API_URL = AppInjector.getInstance(API_URL_TOKEN);
    private readonly http = AppInjector.getInstance(HttpClient);
    private readonly errorService = AppInjector.getInstance(ErrorHandler);

    constructor(
        public readonly endpoint: string
    ) { }
    
    async getMethod(apiMethod: string, params?: { [key: string]: string }): Promise<any> {
        const queryParams = params ? this.queryString(params) : '';
        const url = `${this.API_URL}/${this.endpoint}/${apiMethod}${queryParams}`;

        return new Promise<any>((resolve, reject)=> {
            const req = this.sendRequest(EHttpMethod.GET, url).subscribe(
                (result) => {
                    resolve(result);
                    req.unsubscribe();
                },
                error => reject(error)
            );
        });
    }

    postMethod(apiMethod: string, body: TModel | any): Promise<any> {
        const url = `${this.API_URL}/${this.endpoint}/${apiMethod}`;

        return new Promise<any>((resolve, reject) => {
            const req = this.sendRequest(EHttpMethod.POST, url, body).subscribe(
                (result: any) => {
                    resolve(result);
                    req.unsubscribe();
                },
                error => reject(error)
            );
        })
    }

    putMethod(apiMethod: string, body: TModel | any): Promise<any> {
        const url = `${this.API_URL}/${this.endpoint}/${apiMethod}`;

        return new Promise<any>((resolve, reject) => {
            const req = this.sendRequest(EHttpMethod.PUT, url, body).subscribe(
                (result: any) => {
                    resolve(result);
                    req.unsubscribe();
                },
                error => reject(error)
            );
        })
    }

    deleteMethod(apiMethod: string, body: TModel | any): Promise<any> {
        const url = `${this.API_URL}/${this.endpoint}/${apiMethod}`;

        return new Promise<any>((resolve, reject) => {
            const req = this.sendRequest(EHttpMethod.DELETE, url, body).subscribe(
                (result: any) => {
                    resolve(result);
                    req.unsubscribe();
                },
                error => reject(error)
            );
        })
    }

    queryString(data: { [key: string]: string }): string{
        let queryString: string = '';

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            !queryString 
                ? queryString = `?${key}=${data[key]}`
                : queryString += `&${key}=${data[key]}`;
          }
        }

        return queryString;
    }

    sendRequest(method: EHttpMethod, url: string, body?: TModel | any) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.request(method, url, {
            headers,
            body
        })
        .pipe(
            catchError(error => {
                this.errorService.handleError(error);
                return throwError(error);
            })
        );
    }

}

export class APIService<TModel extends IEntity> extends BaseService<TModel> {

    private readonly _onState$ = new Subject<EServiceState>();
    private readonly _onError$ = new Subject<Error | HttpErrorResponse>();

    readonly onError: Observable<Error | HttpErrorResponse> = this._onError$.asObservable();
    readonly SERVICE_STATE = EServiceState;

    state: EServiceState = EServiceState.Browse;

    get loading() {
        return this.state === this.SERVICE_STATE.Load;
    }

    get editing() {
        return this.state === this.SERVICE_STATE.Update;
    }

    onAdded = new Subject<TModel>();
    onUpdated = new Subject<TModel>();
    onDeleted = new Subject<TModel>();
    onLoaded = new Subject<TModel | TModel[]>();

    shadowModel: TModel;
    model: TModel | any = { };
    data = new Array<TModel>();

    constructor(endpoint: string) {
        super(endpoint);
    }

    async add(model?: TModel): Promise<TModel> {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({}, this.model, model);
            console.log("Service Add: ", item);
            const res = await this.postMethod('add', item);
            this.onAdded.next(res as TModel);
            return res as TModel;
        } catch(e) {
            this._onError$.next(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }

    async update(model?: TModel) {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({}, this.model, model);
            console.log("Service Update: ", item);
            const res = await this.postMethod(`update`, item);
            this.onUpdated.next(res as TModel);
            return res as TModel;
        } catch(e) {
            this._onError$.next(e);
        } finally {
            this.onStateChange(EServiceState.Update);
        }
    }

    async requery(model?: TModel): Promise<TModel> {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({}, this.model, model);
            console.log("Service Requery: ", item);
            const res = await this.postMethod(`requery`, item);
            return res as TModel;
        } catch(e) {
            this._onError$.next(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }

    async load(options?: { [key: string]: string }) {
        try {
            this.onStateChange(EServiceState.Load);
            const res = await this.getMethod('select', options);
            console.log('Service Load: ', res);
            this.data = res;
            this.onLoaded.next(res);
            return res;
        } catch(e) {
            this._onError$.next(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }

    async delete(model?: TModel) {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({}, this.model, model);
            console.log("Service Delete: ", item);
            const res = await this.postMethod(`delete`, item);
            this.onDeleted.next(res as TModel);
            return res as TModel;
        } catch(e) {
            this._onError$.next(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }

    // Keep current value and without modifications at shadowModel
    async setShadowModel(model?: TModel) {
        const item: TModel = Object.assign({}, this.model, model);
        const res = await this.requery(item);
        this.shadowModel = res;
        this.model = Object.assign({}, res);
        return res;
    }

    onStateChange(state: EServiceState) {
        if (state === this.state) {
            return;
        }

        this._onState$.next(state);
        this.state = state;
    }

    push(model: TModel, mode: EPushModel) {
        const index = this.data.findIndex(x => x.Id === model.Id);

        switch(mode) {
            case EPushModel.Insert:
                this.data.unshift(model);
                break;

            case EPushModel.Replace:
                this.data.splice(index, 1, model);
                break;

            case EPushModel.SoftDelete:
                this.data.splice(index, 1);
                break;

            case EPushModel.Append:
                this.data.push(model);
                break;

            default:
                break;
        }
    }

}
