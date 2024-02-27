import { Injectable, Inject, Optional } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ENV } from '../services';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(ENV) private env: any) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let api: string = this.env.api;
    if (req.url.includes('/assets')) {
      api = location.origin;
    }
    // if (!this.env.production && req.url.includes('/assets')) {
    //   api = api.replace('/api', '');
    // }

    const apiReq = req.clone({ url: `${api}${req.url}` });
    return next.handle(apiReq);
  }
}
