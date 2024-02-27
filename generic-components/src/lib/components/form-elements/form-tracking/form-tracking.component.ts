import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  EventService,
  EventType,
  GenericFormService,
  MessageType,
} from '@webui/core';
import { DialogRef, DialogType } from '@webui/models';
import { SpinnerComponent } from '@webui/ui';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  standalone: true,
  selector: 'webui-form-tracking',
  templateUrl: './form-tracking.component.html',
  styleUrls: ['./form-tracking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, SpinnerComponent],
})
export class FormTrackingComponent implements OnInit, OnDestroy {
  private _fetchingData = new BehaviorSubject<boolean>(false);

  public config: any;
  public modalRef!: DialogRef;
  public label = '';
  public buttonLabel = '';

  public fetching$ = this._fetchingData.asObservable();

  constructor(
    private genericFormService: GenericFormService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const { translateKey } = this.config;
    const label = this.config.templateOptions.label;

    this.label = translateKey ? translateKey + '.label' : label;
    this.buttonLabel = translateKey + '.show';
  }

  public ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  public showTracking() {
    const timesheet = this.config.formData.value.data;

    this.fetchTrackingData(timesheet).subscribe(
      (data: { count: number; results: any[] }) => {
        if (data.count === 0) {
          this.eventService.emit(EventType.ShowMessage, {
            text: 'Tracking information is not exist',
            type: MessageType.Info,
          });
        } else {
          this.eventService.emit(EventType.OpenDialog, {
            type: DialogType.Tracking,
            onInit: (dialogRef: DialogRef) => (this.modalRef = dialogRef),
            options: {
              data: {
                results: data.results,
                timesheet,
              },
            },
          });
        }
      }
    );
  }

  private fetchTrackingData(timesheet: any) {
    const endpoint = `/candidate/location/${timesheet.job_offer.candidate_contact.id}/history/`;
    const params = {
      timesheet: timesheet.id,
      limit: -1,
    };

    this._fetchingData.next(true);

    return this.genericFormService
      .get(endpoint, params)
      .pipe(finalize(() => this._fetchingData.next(false)));
  }
}
