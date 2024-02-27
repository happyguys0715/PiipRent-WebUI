import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { ErrorsService } from './errors.service';

@Injectable()
export class FormBuilderService {
  public formEndpoint = '/core/forms/';
  public parseAddressEndpoint = '/core/addresses/parse/';
  public contactEndpoint = '/core/contacts/validate/';

  constructor(private http: HttpClient, private errorsService: ErrorsService) {}

  public getRenderData(id: string) {
    return this.http
      .get(this.formEndpoint + id + '/render/')
      .pipe(catchError((error: any) => this.errorsService.handleError(error)));
  }

  public sendFormData(id: string, data: any) {
    return this.http
      .post(this.formEndpoint + id + '/submit/', data)
      .pipe(catchError((error: any) => this.errorsService.handleError(error)));
  }

  public parseAddress(data: any) {
    return this.http
      .post(this.parseAddressEndpoint, data)
      .pipe(catchError((error: any) => this.errorsService.handleError(error)));
  }

  public validate(key: string, value: any) {
    return this.http
      .get(this.contactEndpoint + `?${key}=${value}`)
      .pipe(catchError((error: any) => this.errorsService.handleError(error)));
  }
}
