import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {Injectable} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private _authService : AuthService) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this._authService.isAdmin().then(isAdmin => {
      if (isAdmin) {
        return true;
      }
      this.router.navigate(['/tickets']);
      return false;
    });
  }
}
