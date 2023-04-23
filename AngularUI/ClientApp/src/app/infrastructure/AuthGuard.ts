import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {Injectable} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _authService : AuthService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this._authService.isAuthenticated().then(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      this._authService.login();
      return false;
    });
  }
}
