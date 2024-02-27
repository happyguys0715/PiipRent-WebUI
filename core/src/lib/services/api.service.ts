import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorsService, ParseErrorOptions } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private errorService: ErrorsService) {}

  post<R, B = Record<string, unknown>>(
    endpoint: string,
    body: B,
    options?: ParseErrorOptions
  ) {
    return this.http
      .post<R>(endpoint, body)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleError(error, options)
        )
      );
  }

  put<R, B = Record<string, unknown>>(
    endpoint: string,
    body: B,
    options?: ParseErrorOptions
  ) {
    return this.http
      .put<R>(endpoint, body)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleError(error, options)
        )
      );
  }

  get<R>(
    endpoint: string,
    params: {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    },
    options?: ParseErrorOptions
  ) {
    const query = new HttpParams({ fromObject: params });

    return this.http
      .get<R>(endpoint, { params: query })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleError(error, options)
        )
      );
  }
}
