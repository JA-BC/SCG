import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private readonly tokenService: TokenService = new TokenService();

  constructor(private readonly router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const isOutOfDate = await this.tokenService.isOutOfDate();

      if (isOutOfDate) {
        this.redirectToLogin(state);
        return false;
      }
    } catch {
      this.redirectToLogin(state);
    }

    return true;
  }

  private redirectToLogin(state: RouterStateSnapshot) {
    this.tokenService.removeToken();
    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
  }

}
