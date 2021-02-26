import { Router } from "@angular/router";
import { EPushModel, EServiceState, APIRequest, IEntity } from "@core/interfaces/service.model";
import { AppInjector } from "@core/utils/injector";
import { AlertController } from "@ionic/angular";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { APIService } from "./base.service";

export class BaseList<TModel extends IEntity, TService extends APIService<TModel>> {
    
    private readonly destroy$ = new Subject<void>();
    protected readonly router: Router = AppInjector.getInstance(Router);
    protected readonly alert: AlertController = AppInjector.getInstance(AlertController);

    constructor(
        public readonly service: TService
    ) { }

    ngOnInit() {
        this.service.load();

        this.service.onDeleted.pipe(takeUntil(this.destroy$))
            .subscribe((model: TModel) => this.onDeleted(model));

        this.service.onLoaded.pipe(takeUntil(this.destroy$))
            .subscribe((data: TModel[]) => this.onLoaded(data));
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

        return await alert.present();
    }

    // Infinite Scroll
    onLoad(e: any) {
        // When all data is loaded, dont make more requests to load
        if (this.service.requestOptions.Pagination.TotalCount
            === this.service.data.length) {
            e.target.disabled = true;
            return;
        }

        ++this.service.requestOptions.Pagination.Page;
        this.service.load().then(() => e.target.complete());
    }

    onRefresh() {
        // Instance to initial value
        this.service.requestOptions = new APIRequest();
        this.service.load();
    }

    onDeleted(model?: TModel) {
        this.service.push(model, EPushModel.SoftDelete);
    }

    onLoaded(data: TModel[]) {
        console.log('LOADED');
    }

    gotoForm() {
        this.router.navigate([`/app/${this.service.endpoint}-form`]);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
