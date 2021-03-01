import { Injectable } from '@angular/core';
import { APIService } from '@core/class/base.service';
import { EServiceState } from '@core/interfaces/service.model';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UploadService extends APIService<any> {

    readonly resources = environment.api.split('api')[0];

    constructor() {
        super('upload');
    }

    async add(model?: any): Promise<any> {
        try {
            this.onStateChange(EServiceState.Load);
            const res = await this.postMethod('add', model);
            this.onAdded.next(res);
            this.onStateChange(EServiceState.Browse);
            return res;
        } catch {
            this.onStateChange(EServiceState.Browse);
        }
    }

}
