import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';

import { isCandidate } from '@webui/utilities';
import { AuthService } from '../services';

@Injectable()
export class CandidateGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate() {
    const active = isCandidate();

    if (active) {
      return active;
    }

    this.router.navigate([this.authService.getRedirectUrl()]);
    return isCandidate();
  }

  public canLoad() {
    const active = isCandidate();

    if (active) {
      return active;
    }

    this.router.navigate([this.authService.getRedirectUrl()]);
    return isCandidate();
  }
}
