import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from '../services';

@Injectable()
export class NotAuthorizedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const { token } = route.params;

    if (token) {
      return true;
    }

    const isAuthorized = this.authService.isAuthorized;

    if (!isAuthorized) {
      return true;
    }

    this.router.navigate([this.authService.getRedirectUrl()]);
    return false;
  }
}
