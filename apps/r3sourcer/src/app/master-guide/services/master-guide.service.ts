import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { Purpose } from '@webui/data';
import {
  ErrorsService,
  CompanyPurposeService,
  SiteSettingsService,
} from '@webui/core';
import { GuideProps } from '../interfaces';
import { Endpoints } from '@webui/models';

@Injectable()
export class MasterGuideService {
  private endpoint = `${Endpoints.Company}guide/`;

  constructor(
    private http: HttpClient,
    private errors: ErrorsService,
    private purpose: CompanyPurposeService,
    private siteSettings: SiteSettingsService
  ) {}

  getGuide() {
    return this.http.get<GuideProps>(this.endpoint).pipe(
      map((data: GuideProps) =>
        this.removeMYOBFlag(data, this.siteSettings.settings.country_code)
      ),
      catchError((error: any) => this.errors.handleError(error))
    );
  }

  changePurpose(id: string, purpose: Purpose) {
    return this.purpose.changePurpose(id, purpose);
  }

  updateValue(endpoint: string, data: any) {
    return this.http
      .put(endpoint, data)
      .pipe(catchError((error: any) => this.errors.handleError(error)));
  }

  private removeMYOBFlag(data: GuideProps, countryCode: string): GuideProps {
    if (countryCode.toLocaleLowerCase() === 'au') {
      return data;
    }

    const result = { ...data };
    delete result.myob_connected;
    return result;
  }
}
