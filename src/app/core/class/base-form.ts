import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EPushModel, IEntity } from '@core/interfaces/service.model';
import { AppInjector } from '@core/utils/injector';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { APIService } from './base.service';

export class BaseForm<TModel extends IEntity, TService extends APIService<TModel>> {

    private readonly destroy$ = new Subject<void>();
    private readonly toast: ToastController = AppInjector.getInstance(ToastController);

    @ViewChild('form') form: NgForm;

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
        if (JSON.stringify(this.service.shadowModel) === JSON.stringify(this.service.model)) {
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

        this.toast.create({
            message: "Registro actualizado",
            duration: 2500,
            position: 'bottom',
            color: 'success'
        }).then(toast => toast.present());
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

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.service.cancel();
    }

}
