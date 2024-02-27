import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';

import { isManager } from '@webui/utilities';
import { AuthService } from '../services';

@Injectable()
export class ManagerGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate() {
    const active = isManager();

    if (active) {
      return active;
    }

    this.router.navigate([this.authService.getRedirectUrl()]);
    return isManager();
  }

  public canLoad() {
    const active = isManager();

    if (active) {
      return active;
    }

    this.router.navigate([this.authService.getRedirectUrl()]);
    return isManager();
  }
}
