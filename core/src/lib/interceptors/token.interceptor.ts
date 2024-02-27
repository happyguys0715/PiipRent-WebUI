import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { LocalStorageService } from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private storage: LocalStorageService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.storage.retrieve('user');

    if (user && !this.isRefresh(req.url) && !this.isLoginByToken(req.url)) {
      const helper = new JwtHelperService();
      const tokenIsExpired = helper.isTokenExpired(user.access_token_jwt);

      if (tokenIsExpired && user.rememberMe) {
        return this.authService.refreshJWTToken(user).pipe(
          switchMap(() => {
            return next.handle(
              this.createRequest(req, this.storage.retrieve('user'))
            );
          }),
          catchError(() => {
            this.authService.logout();
            return of();
          })
        );
      } else if (user) {
        return next.handle(this.createRequest(req, user));
      } else {
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }

  createRequest(request: HttpRequest<any>, user: any) {
    if (!user) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `JWT ${user.access_token_jwt}`,
      },
    });
  }

  isRefresh(url: string) {
    return url.includes('/oauth2/token/');
  }

  isLoginByToken(url: string) {
    return url.includes('/login_by_token');
  }
}
