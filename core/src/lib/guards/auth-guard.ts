import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate() {
    return this.checkAuth();
  }

  public canLoad() {
    return this.checkAuth();
  }

  private checkAuth() {
    const isAuthorized = this.authService.isAuthorized;

    if (isAuthorized) {
      return isAuthorized;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
