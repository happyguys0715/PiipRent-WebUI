import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { ErrorsService } from '@webui/core';
import { Observable } from 'rxjs';
import { Endpoints } from '@webui/models';
import { IHoliday } from '../models';

export enum Calendar {
  Manager,
  Client,
  Candidate,
}

@Injectable()
export class CalendarDataService {
  private endpoints: Record<Calendar, string> = {
    [Calendar.Manager]: Endpoints.Shift,
    [Calendar.Client]: `${Endpoints.Shift}client_contact_shifts/`,
    [Calendar.Candidate]: '',
  };

  private timesheetEndpoints: Record<Calendar, string> = {
    [Calendar.Manager]: '',
    [Calendar.Client]: '',
    [Calendar.Candidate]: Endpoints.TimesheetCandidate,
  };

  constructor(private http: HttpClient, private errorsService: ErrorsService) {}

  getShiftsByQuery(params: HttpParams, type: Calendar) {
    return this.http.get(this.endpoints[type], { params }).pipe(
      map((response: any) => (response.results ? response.results : response)),
      catchError(errors => this.errorsService.handleError(errors))
    );
  }

  getShiftDate(id: string) {
    return this.http
      .get(`${Endpoints.ShiftDate}${id}/`)
      .pipe(catchError(errors => this.errorsService.handleError(errors)));
  }

  getCandidateAvailability(params: HttpParams) {
    return this.http
      .get(Endpoints.CarrierList, { params })
      .pipe(catchError(errors => this.errorsService.handleError(errors)));
  }

  getTimesheetInformation(params: HttpParams, type: Calendar) {
    return this.http
      .get(this.timesheetEndpoints[type], { params })
      .pipe(catchError(errors => this.errorsService.handleError(errors)));
  }

  getJobOffers(params: HttpParams) {
    return this.http
      .get(Endpoints.JobOfferCandidate, { params })
      .pipe(catchError(errors => this.errorsService.handleError(errors)));
  }

  setAvailability(data: any) {
    return this.http
      .post(Endpoints.CarrierList, data)
      .pipe(catchError(errors => this.errorsService.handleError(errors)));
  }

  declineJobOffer(id: string) {
    return this.http
      .post(`${Endpoints.JobOffer}${id}/cancel/`, {})
      .pipe(catchError(errors => this.errorsService.handleError(errors)));
  }

  acceptJobOffer(id: string) {
    return this.http
      .post(`${Endpoints.JobOffer}${id}/accept/`, {})
      .pipe(catchError(errors => this.errorsService.handleError(errors)));
  }

  updateAvailable(id: boolean, data: any) {
    const endpoint = `${Endpoints.CarrierList}${id}/`;

    return this.http
      .put(endpoint, data)
      .pipe(catchError(errors => this.errorsService.handleError(errors)));
  }

  public getHolidaysForPeriod(
    from: string,
    to: string
  ): Observable<Array<{ name: string; holiday_date: string }>> {
    const params = {
      date_0: from,
      date_1: to,
      limit: -1,
    };

    return this.http
      .get<{ results: IHoliday[] }>('/core/publicholidays/', {
        params: new HttpParams({ fromObject: params }),
      })
      .pipe(
        map(response =>
          response.results.map(el => ({
            holiday_date: el.date,
            name: el.name,
          }))
        )
      );
  }
}
