import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorsService } from '@webui/core';
import { Endpoints } from '@webui/models';

export enum TimelineAction {
  Reset,
  Update,
}

@Injectable()
export class TimelineService {
  get action$() {
    return this._action.asObservable();
  }

  get buttonAction$() {
    return this._buttonAction.asObservable();
  }

  private _action: Subject<TimelineAction> = new Subject();
  private _buttonAction = new Subject();

  constructor(private http: HttpClient, private errorsService: ErrorsService) {}

  emit(action: TimelineAction | any) {
    this._action.next(action);
  }

  getTimeline(params: { [key: string]: string }): Observable<any> {
    const options = {
      params: new HttpParams({ fromObject: params }),
    };

    return this.http
      .get(Endpoints.Timeline, options)
      .pipe(catchError(error => this.errorsService.handleError(error)));
  }

  activateState(
    objectId: string,
    stateId: string,
    active = false
  ): Observable<any> {
    const body = {
      object_id: objectId,
      state: {
        id: stateId,
      },
      comment: null,
      active,
    };

    return this.http
      .post(Endpoints.WorkflowObject, body)
      .pipe(
        catchError(error =>
          this.errorsService.handleError(error, { showMessage: true })
        )
      );
  }

  passTests(tests: any[]): Observable<any> {
    return this.http
      .post(Endpoints.AcceptanceTestPassAnswers, tests)
      .pipe(
        catchError(error =>
          this.errorsService.handleError(error, { showMessage: true })
        )
      );
  }

  editContact(action: any) {
    this._buttonAction.next(action);
  }
}
