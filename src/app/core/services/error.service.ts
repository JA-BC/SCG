import { Injectable, ErrorHandler, NgZone, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable()
export class ErrorService implements ErrorHandler {

    private readonly ngZone: NgZone;
    private readonly toast: ToastController;

    constructor(private readonly injector: Injector) {
        this.ngZone = this.injector.get(NgZone);
        this.toast = this.injector.get(ToastController);
    }

    handleError(error: any) {
        if (error instanceof Error) {
            this.reportError(error);
        } else if (error instanceof HttpErrorResponse) {
            this.reportHttpError(error);
        } else {
            console.error(error.toString());
        }
    }

    private reportError(error: Error) {
        this.run({
            message: 'Ha ocurrido un error inesperado',
        });

        console.error(error);
    }

    private reportHttpError(error: HttpErrorResponse) {
        if (error.error?.isTrusted) {
            Object.assign(error, {
                status: '',
                error: 'Servidor no disponible',
                url: ''
            });
        }

        this.run({
            message: `${error.error}`
        });

        console.error(error);
    }

    private run(opts: ToastOptions) {
        this.ngZone.run(async () => {
            const toast = await this.toast.create(Object.assign({}, opts, {
                color: 'danger',
                duration: 2500
            }));
            await toast.present();
        });
    }
}


