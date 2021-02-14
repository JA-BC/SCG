import { Router } from "@angular/router";
import { EServiceState, IEntity } from "@core/interfaces/service.model";
import { AppInjector } from "@core/utils/injector";
import { AlertController } from "@ionic/angular";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { APIService } from "./base.service";

export class BaseList<TModel extends IEntity, TService extends APIService<TModel>> {
    
    private readonly destroy$ = new Subject<void>();
    private readonly router: Router = AppInjector.getInstance(Router);
    private readonly alert: AlertController = AppInjector.getInstance(AlertController);

    constructor(
        public readonly service: TService
    ) { }

    ngOnInit() {
        this.service.load();

        this.service.onDeleted.pipe(takeUntil(this.destroy$))
            .subscribe((model: TModel) => this.onDeleted(model));

        this.service.onLoaded.pipe(takeUntil(this.destroy$))
            .subscribe(() => this.onLoaded());
    }

    onAdd() {
        this.gotoForm();
    }

    async onUpdate(model?: TModel) {
        await this.service.setShadowModel(model);
        this.service.onStateChange(EServiceState.Update);
        this.gotoForm();
    }

    async onDelete(model?: TModel) {
        const alert = await this.alert.create({
            header: "Eliminar Registro",
            message: "¿Deseas eliminarlo?",
            buttons: [
                {
                    text: "Aceptar",
                    handler: () => {
                        this.service.delete(model);
                    }
                },
                {
                    text: "Cancelar",
                    role: 'cancel'
                }
            ]
        });

        await alert.present();
    }

    onDeleted(model?: TModel) {
        const index = this.service.data.findIndex(x => x.id === model.id);
        this.service.data.splice(index, 1);
    }

    onLoaded() {
        console.log('LOADED');
    }

    gotoForm() {
        this.router.navigate([`/app/${this.service.endpoint}-form`, this.service.model.id]);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
