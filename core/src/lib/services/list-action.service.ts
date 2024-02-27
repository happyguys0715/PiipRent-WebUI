import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { ApiService } from './api.service';
import { DialogRef, DialogType, Endpoints, Status } from '@webui/models';
import { EventService, EventType } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class ListActionService {
  constructor(
    private apiService: ApiService,
    private eventService: EventService
  ) {}

  public submitTimesheet(id: string): Observable<Status> {
    const result$ = new Subject<Status>();

    this.apiService
      .get<{ status: number }>(
        Endpoints.TimesheetCandidate + id + '/submit/',
        {}
      )
      .subscribe(timesheet => {
        if (timesheet.status !== 4) {
          result$.next(Status.Error);
          return;
        }

        this.eventService.emit(EventType.OpenDialog, {
          type: DialogType.Submission,
          onInit: (dialogRef: DialogRef) => {
            dialogRef.closed.subscribe((result: any) => {
              if (result?.status === Status.Success) {
                result$.next(result.status);
              }

              result$.next(Status.Error);
              result$.complete();
            });
          },
          options: {
            data: timesheet,
            size: 'md',
          },
        });
      });

    return result$.asObservable();
  }
}
