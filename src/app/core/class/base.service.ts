import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EHttpMethod, IEntity, EServiceState, EPushModel } from "@core/interfaces/service.model";
import { API_URL_TOKEN } from "@core/interfaces/type";
import { AppInjector } from "@core/utils/injector";
import { throwError, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

export abstract class BaseService<TModel> {

    private readonly API_URL = AppInjector.getInstance(API_URL_TOKEN);
    private readonly http = AppInjector.getInstance(HttpClient);

    constructor(
        public readonly endpoint: string
    ) { }
    
    async getMethod(params?: { [key: string]: string }): Promise<any> {
        const queryParams = params ? this.queryString(params) : '';
        const url = `${this.API_URL}/${this.endpoint}/select${queryParams}`;

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
        headers.append('Content-type', 'application/json');

        return this.http.request(method, url, {
            headers,
            body
        })
        .pipe(
            catchError((error: Response) => {
                this.handlerError(error);
                return throwError(error);
            })
        );
    }

    handlerError(error: Response) {
        console.error(error);
    }

}

export class APIService<TModel extends IEntity> extends BaseService<TModel> {

    private readonly _onState$ = new Subject<EServiceState>();

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
            this.onStateChange(EServiceState.Browse);
            return res as TModel;
        } catch {
            this.onStateChange(EServiceState.Browse);
        }
    }

    async update(model?: TModel) {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({}, this.model, model);
            console.log("Service Update: ", item);
            const res = await this.putMethod(`update/${item.id}`, item);
            this.onUpdated.next(res as TModel);
            this.onStateChange(EServiceState.Browse);
            return res as TModel;
        } catch {
            this.onStateChange(EServiceState.Browse);
        }
    }

    async requery(model?: TModel): Promise<TModel> {
        /* try { */
        /*     this.onStateChange(EServiceState.Load); */
        /*     const item: TModel = Object.assign({}, this.model, model); */
        /*     console.log("Service Requery: ", item); */
        /*     const res = await this.getMethod(`selectId/${item.id}`); */
        /*     this.onStateChange(EServiceState.Browse); */
        /*     return res as TModel; */
        /* } catch { */
        /*     this.onStateChange(EServiceState.Browse); */
        /* } */
        return {} as TModel;
    }

    async load(params?: { [key: string]: string }) {
        try {
            this.onStateChange(EServiceState.Load);
            const res = await this.getMethod(params);
            console.log('Service Load', res);
            this.data = res as TModel[];
            this.onLoaded.next(res as TModel[]);
            this.onStateChange(EServiceState.Browse);
            return res as TModel[];
        } catch {
            this.onStateChange(EServiceState.Browse);
        }
    }

    async delete(model?: TModel) {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({}, this.model, model);
            console.log("Service Delete: ", item);
            const res = await this.deleteMethod(`delete/${item.id}`, item);
            this.onDeleted.next(res as TModel);
            this.onStateChange(EServiceState.Browse);
            return res as TModel;
        } catch {
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
        switch(mode) {
            case EPushModel.Insert:
                this.data.unshift(model);
                break;

            case EPushModel.Replace:
                const index = this.data.findIndex(x => x.id === model.id);
                this.data.splice(index, 1, model);
                break;

            case EPushModel.Append:
                this.data.push(model);
                break;

            default:
                break;
        }
    }

}
