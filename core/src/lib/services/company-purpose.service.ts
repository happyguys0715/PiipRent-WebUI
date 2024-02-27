import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';

import { of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Purpose, DashboardWidget } from '@webui/data';
import { ErrorsService } from './errors.service';
import { ToastService, MessageType } from './toast.service';
import { Endpoints } from '@webui/models';

@Injectable({
  providedIn: 'root',
})
export class CompanyPurposeService {
  public purpose?: Purpose;

  // hideListColumns = {
  //   [Endpoints.SkillName]: {
  //     [Purpose.SelfUse]: ['price_list_default_rate'],
  //     [Purpose.Recruitment]: ['price_list_default_rate']
  //   }
  // };

  constructor(
    private http: HttpClient,
    private errors: ErrorsService,
    private toastr: ToastService
  ) {}

  public filterModules(widgets?: DashboardWidget[]) {
    if (!widgets) {
      return;
    }

    switch (this.purpose) {
      case Purpose.Recruitment:
        return this.filterByEndpoint([Endpoints.CandidateContact], widgets);
      case Purpose.SelfUse:
        return this.filterByEndpoint(
          [Endpoints.CompanyContact, Endpoints.Job, Endpoints.CandidateContact],
          widgets
        );
      case Purpose.Hire:
        return this.filterByEndpoint(
          [
            Endpoints.Company,
            Endpoints.Job,
            Endpoints.CompanyContact,
            Endpoints.CandidateContact,
          ],
          widgets
        );
    }

    return;
  }

  public filterNavigationByPurpose(purpose: Purpose, navigation: any[]) {
    switch (purpose) {
      case Purpose.Recruitment:
        return this.filterByName(['allocations', 'accounts'], navigation);
      case Purpose.SelfUse:
        return this.filterByName(['clients'], navigation);
      default:
        return navigation;
    }
  }

  // public filterListColumns(endpoint: string, columns: any[]) {
  //   const hideColumns: string[] = this.hideListColumns[endpoint];

  //   if (hideColumns && hideColumns[this.purpose]) {
  //     return columns.filter(column => {
  //       return !hideColumns[this.purpose].includes(column.name);
  //     });
  //   }

  //   return columns;
  // }

  getPurpose(id: string) {
    const query = { fields: ['purpose'] };
    const params = new HttpParams({ fromObject: query });

    if (this.purpose) {
      return of(this.purpose);
    }

    return this.http
      .get<{ id: string; purpose: Purpose }>(Endpoints.Company + id + '/', {
        params,
      })
      .pipe(
        tap(res => {
          this.purpose = res.purpose;
        }),
        map(res => res.purpose),
        catchError((err: HttpErrorResponse) => {
          this.errors.handleError(err);
          return of(null);
        })
      );
  }

  changePurpose(id: string, purpose: Purpose) {
    return this.http
      .put(Endpoints.Company + id + '/change_purpose/', { purpose, id })
      .pipe(
        tap((res: any) => {
          this.purpose = purpose;
          this.toastr.sendMessage(res.message, MessageType.Success);
        })
      );
  }

  private filterByName(keys: string[], navigation: any[]) {
    return navigation.filter(el => {
      let result = true;

      if (keys.includes(el.name.toLowerCase())) {
        result = false;
      }

      if (el.children && result) {
        el.children = this.filterByName(keys, el.children);
      }

      return result;
    });
  }

  private filterByEndpoint(
    endpoints: string[],
    widgets: DashboardWidget[]
  ): DashboardWidget[] {
    return widgets.map(el => {
      return {
        ...el,
        is_active: endpoints.includes(el.link),
      };
    });
  }
}
