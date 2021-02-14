import { OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EPushModel, EServiceState, IEntity } from '@core/interfaces/service.model';
import { AppInjector } from '@core/utils/injector';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { APIService } from './base.service';

export class BaseForm<TModel extends IEntity, TService extends APIService<TModel>> {

    private readonly destroy$ = new Subject<void>();

    @ViewChild('form', { static: true }) form: NgForm;

    constructor(
        public readonly service: TService
    ) { }

    ngOnInit() {
        this.service.onAdded.pipe(takeUntil(this.destroy$))
            .subscribe((model: TModel) => this.onAdded(model));

        this.service.onUpdated.pipe(takeUntil(this.destroy$))
            .subscribe((model: TModel) => this.onUpdated(model));
    }

    async onAdd(model?: TModel) {
        const res = await this.service.add(model);
        return res;
    }

    async onUpdate(model?: TModel) {
        // Model hasn't changed
        if (this.service.shadowModel === this.service.model) {
            return;
        }

        const res = await this.service.update(model);
        return res;
    }

    onAdded(model?: TModel) {
        this.service.push(model, EPushModel.Insert);
        this.clearForm();
    }

    onUpdated(model?: TModel) {
        this.service.push(model, EPushModel.Replace);
        this.clearForm();
    }

    clearForm() {
        for (const control in this.form.controls) {
            if (this.form.controls.hasOwnProperty(control)) {
                this.form.controls[control].reset();
                this.form.controls[control].setErrors(null);
                this.form.controls[control].markAsUntouched();
            }
        }

        this.form.reset();
    }

    cancel() {
        
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
