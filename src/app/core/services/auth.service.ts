import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseService } from "@core/class/base.service";
import { AppInjector } from "@core/helpers/injector";
import { IToken, IUser } from "@core/interfaces/auth.model";
import { EServiceState } from "@core/interfaces/service.model";
import { parseJwt } from "@core/utils/functions";
import { ToastController } from "@ionic/angular";
import { Observable, Subject } from "rxjs";
import { TokenService } from "./token.service";

export class AuthService extends BaseService<IUser> {

  private readonly _onState$ = new Subject<EServiceState>();
  private readonly _onError$ = new Subject<Error | HttpErrorResponse>();
  private readonly tokenService: TokenService = new TokenService();
  private readonly router: Router = AppInjector.getInstance(Router);
  private readonly toast: ToastController = AppInjector.getInstance(ToastController);

  readonly onError: Observable<Error | HttpErrorResponse> = this._onError$.asObservable();
  readonly SERVICE_STATE = EServiceState;
  readonly rootUrl: string = '/app';
  readonly loginUrl: string = '/auth/login';
  readonly changePasswordRedirectTo: string = '/app/ajuste';

  state: EServiceState = EServiceState.Browse;

  get loading() {
    return this.state === this.SERVICE_STATE.Load;
  } 

  model: IUser = { };
  claims: IToken;
  userThumbnail: string;

  constructor(endpoint: string) {
    super(endpoint);
  }

  async login(model?: IUser) {
    try {
      this.onStateChange(EServiceState.Load);
      const item = Object.assign(this.model, model);
      const res = await this.postMethod('login', item);
      const token = await this.tokenService.setToken(res?.Token);
      this.claims = parseJwt(token);
      this.router.navigate([this.rootUrl]);
    } catch (e) {
      this._onError$.next(e);
    } finally {
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
      this.router.navigate([this.loginUrl]);
    } catch (e) {
      this._onError$.next(e);
    } finally {
      this.onStateChange(EServiceState.Browse);
    }
  }

  async changePassword(model?: IUser) {
    try {
      this.onStateChange(EServiceState.Load);
      const item = Object.assign(this.model, model);
      const res = await this.postMethod('changePassword', item);
      await this.tokenService.removeToken();
      const token = await this.tokenService.setToken(res?.Token);
      this.claims = parseJwt(token);

      const toast = await this.toast.create({
        message: 'Operacion satisfactoria',
        duration: 2500
      });

      await toast.present();
      this.router.navigate([this.changePasswordRedirectTo]);
      return res;
    } catch (e) {
      this._onError$.next(e);
    } finally {
      this.onStateChange(EServiceState.Browse);
    }

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
    this.claims = null;
    this.userThumbnail = null;
    this.router.navigate([this.loginUrl]);
  }

}
