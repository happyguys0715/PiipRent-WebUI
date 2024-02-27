import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';

import { isClient } from '@webui/utilities';
import { AuthService } from '../services';

@Injectable()
export class ClientGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate() {
    const active = isClient();

    if (active) {
      return active;
    }

    this.router.navigate([this.authService.getRedirectUrl()]);
    return isClient();
  }

  public canLoad() {
    const active = isClient();

    if (active) {
      return active;
    }

    this.router.navigate([this.authService.getRedirectUrl()]);
    return isClient();
  }
}
