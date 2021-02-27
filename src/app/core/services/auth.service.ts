import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseService } from "@core/class/base.service";
import { IUser } from "@core/interfaces/auth.model";
import { EServiceState } from "@core/interfaces/service.model";
import { ToastController } from "@ionic/angular";
import { Subject } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<IUser> {

  private readonly _onState$ = new Subject<EServiceState>();

  readonly SERVICE_STATE = EServiceState;

  state: EServiceState = EServiceState.Browse;

  get loading() {
      return this.state === this.SERVICE_STATE.Load;
  }

  model: IUser = { };

  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private readonly toast: ToastController
  ) {
    super('account');
  }

  async login(model?: IUser) {
    try {
      this.onStateChange(EServiceState.Load);
      const item = Object.assign(this.model, model);
      const res = await this.postMethod('login', item);
      await this.tokenService.setToken(res?.Token);
      this.router.navigate(['/app']);
      this.onStateChange(EServiceState.Browse);
    } catch {
      this.onStateChange(EServiceState.Browse);
    }
  }

  async register(model?: IUser) {
    try {
      this.onStateChange(EServiceState.Load);
      const item = Object.assign(this.model, model);
      await this.postMethod('register', item);

      const toast = await this.toast.create({
        message: 'Se registro correctamente, Inicie sesion',
        duration: 2500
      });

      await toast.present();
      this.router.navigate(['/auth']);
      this.onStateChange(EServiceState.Browse);
    } catch {
      this.onStateChange(EServiceState.Browse);
    }
  }

  async forgotPassword(model?: IUser) {
    throw new Error("Method not implemented.");
  }

  onStateChange(state: EServiceState) {
    if (state === this.state) {
        return;
    }

    this._onState$.next(state);
    this.state = state;
  }

  async logout() {
    await this.postMethod('logout', this.model);
    this.tokenService.removeToken();
    this.router.navigate(['/auth']);
  }

}
