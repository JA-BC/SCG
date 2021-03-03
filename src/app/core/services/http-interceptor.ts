import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class JWTAuthInterceptor implements HttpInterceptor {

  private readonly tokenService: TokenService = new TokenService();

  constructor() {}

  intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.tokenService.getToken())
      .pipe(
        switchMap(token => {
          if (token) {
            req = req.clone({
              headers: req.headers.set(
                this.tokenService.HEADER_TYPE,
                `${this.tokenService.HEADER_PREFIX} ${token}`
              )
            });
          }

          return next.handle(req);
        })
      );
  }
}

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  private readonly auth: AuthService;

  constructor(auth: AuthService) {
    if (!auth) {
      throw new Error('[AuthErrorInterceptor]: AuthService must be provided');
    }

    this.auth = auth;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {

      if (err instanceof HttpErrorResponse) {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.auth.logout();
          /* location.reload(); */
        }
      }

      return throwError(err);
    }));
  }

}
