import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  Inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GenericFormService, UserService } from '@webui/core';
import {
  ENoteContentType,
  INote,
  Note,
  TimeSheet,
  TimesheetRate,
} from '@webui/data';
import {
  DatepickerType,
  DropdownOption,
  FormDatepickerControlComponent,
  FormDropdownControlComponent,
  FormImageUploadControlComponent,
  FormInputControlComponent,
  FormTextareaComponent,
} from '@webui/form-controls';
import { Icon, IconSize } from '@webui/ui';
import {
  DIALOG_DATA,
  DialogRef,
  Endpoints,
  Modal,
  Status,
} from '@webui/models';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import {
  EntityListComponent,
  IRow,
  ITable,
} from './entity-list/entity-list.component';
import { CommonModule } from '@angular/common';
import { IconComponent, SpinnerComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../dialog/dialog.component';
import { TimesheetDetailsPreviewComponent } from '../timesheet-details-preview/timesheet-details-preview.component';
import { MetadataService } from '@webui/metadata';

type ViewType = 'list' | 'form' | undefined;

const isHourlyWork = (name: string): boolean => {
  return name.toLocaleLowerCase().replace(/ /g, '_').includes('hourly_work');
};

@Component({
  standalone: true,
  selector: 'webui-approve-worksheet-modal',
  templateUrl: './approve-worksheet-modal.component.html',
  styleUrls: ['./approve-worksheet-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconComponent,
    TranslateModule,
    FormDatepickerControlComponent,
    EntityListComponent,
    FormDropdownControlComponent,
    FormInputControlComponent,
    FormTextareaComponent,
    FormImageUploadControlComponent,
    SpinnerComponent,
    DialogComponent,
    TimesheetDetailsPreviewComponent,
  ],
  providers: [GenericFormService, MetadataService],
})
export class ApproveWorksheetModalComponent
  extends Modal
  implements OnInit, OnDestroy
{
  private destroy: Subject<void> = new Subject<void>();
  private hasTimeForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private timeViewType: BehaviorSubject<ViewType | undefined> =
    new BehaviorSubject<ViewType | undefined>(undefined);
  private activityViewType: BehaviorSubject<ViewType | undefined> =
    new BehaviorSubject<ViewType | undefined>(undefined);
  private activities: BehaviorSubject<TimesheetRate[] | null> =
    new BehaviorSubject<TimesheetRate[] | null>(null);
  private removedActivities: TimesheetRate[] = [];
  private editingActivity?: TimesheetRate | null;

  public activityEndpoint = Endpoints.SkillWorkTypes;
  public activityParams?: { [key: string]: any };

  // public data: any;
  public timeSheet!: TimeSheet;
  public formGroup!: FormGroup;
  public Icon = Icon;
  public IconSize = IconSize;
  public timeForm!: FormGroup;
  public DatepickerType = DatepickerType;
  public processing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public timeViewType$ = this.timeViewType.asObservable();
  public activityViewType$ = this.activityViewType.asObservable();
  public activities$ = this.activities.asObservable();

  public get formInvalid(): boolean {
    return this.formGroup.invalid;
  }

  public get timeInvalid(): boolean {
    return !!this.formGroup.get('times')?.invalid;
  }

  public get activityInvalid(): boolean {
    return !!this.formGroup.get('activity')?.invalid;
  }

  public get destroy$(): Observable<void> {
    return this.destroy.asObservable();
  }

  public get hasTimeForm$(): Observable<boolean> {
    return this.hasTimeForm.asObservable();
  }

  public get timeTable(): ITable | undefined {
    if (this.timeSheet) {
      return {
        head: ['start_time', 'end_time', 'break_time'],
        rows: [
          {
            cells: [
              { content: this.timeSheet.format['startedAt'] },
              { content: this.timeSheet.format['endedAt'] },
              { content: this.timeSheet.format['breakTime'] },
            ],
          },
        ],
      };
    }

    return;
  }

  public get activityTable(): ITable | undefined {
    const activities = this.activities.value;

    if (activities) {
      return {
        head: ['activity', 'amount'],
        rows: activities.map(activity => {
          return {
            entity: activity,
            cells: [
              { content: activity.worktype.__str__ },
              { content: activity.value + '' },
            ],
          };
        }),
      };
    }

    return;
  }

  public get activityGroup(): FormGroup {
    return this.formGroup.get('activity') as FormGroup;
  }

  public get timesGroup(): FormGroup {
    return this.formGroup.get('times') as FormGroup;
  }

  constructor(
    private apiService: GenericFormService,
    private userService: UserService,
    @Inject(DIALOG_DATA) public modalData: any,
    modal: DialogRef
  ) {
    super(modal);
  }

  public ngOnInit(): void {
    this.timeSheet = new TimeSheet({
      endpoint: Endpoints.Timesheet,
      ...this.modalData,
    });

    if (this.timeSheet.endedAt) {
      this.timeViewType.next('list');
    }

    this.formGroup = new FormGroup({
      pictures: new FormControl(''),
      note: new FormControl(''),
    });

    this.activityParams = this.getActivityParams();
    this.getActivities();
  }

  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public addTime(): void {
    this.formGroup.addControl('times', this.initTimeForm(this.timeSheet));
    this.timeViewType.next('form');
  }

  public editTime(): void {
    this.formGroup.addControl('times', this.initTimeForm(this.timeSheet));
    this.timeViewType.next('form');
  }

  public deleteTime(): void {
    this.timeSheet.endedAt = null;
    this.timeSheet.breakStartedAt = null;
    this.timeSheet.breakEndedAt = null;
    this.timeViewType.next(undefined);
  }

  public addActivity(): void {
    this.formGroup.addControl(
      'activity',
      this.getActivityForm(undefined, this.timeSheet.id)
    );

    this.activityViewType.next('form');
  }

  public saveTime(): void {
    const value = this.formGroup.get('times')?.value;
    this.updateTimeSheet(value);
    this.formGroup.removeControl('times');

    this.timeViewType.next('list');
  }

  public saveActivity(): void {
    const newActivity = new TimesheetRate(
      this.formGroup.get('activity')?.value
    );
    this.formGroup.removeControl('activity');
    this.activityViewType.next('list');

    if (this.editingActivity) {
      const activities = [...(this.activities.value || [])];
      const activityIndex = activities.indexOf(this.editingActivity);
      activities.splice(activityIndex, 1, newActivity);

      this.activities.next(activities);
    } else {
      this.activities.next([...(this.activities.value || []), newActivity]);
    }
  }

  public cancelTimeEditing() {
    this.timeViewType.next(this.timeSheet.endedAt ? 'list' : undefined);
    this.formGroup.removeControl('times');
  }

  public cancelActivityEditing() {
    this.activityViewType.next(
      this.activities.value?.length ? 'list' : undefined
    );
    this.formGroup.removeControl('activity');
  }

  public getAmountPrefix(): string {
    const worktype: DropdownOption = this.formGroup
      .get('activity')
      ?.get('worktype')?.value;

    if (worktype instanceof DropdownOption) {
      if (worktype.getField('uom')) {
        return worktype.getField('uom').short_name;
      }
    }

    return '';
  }

  public activityOptionFilter(option: DropdownOption) {
    return !isHourlyWork(option.label);
  }

  public editActivity(row: IRow): void {
    const activity = this.activities?.value?.find(el => el === row.entity);
    this.formGroup.addControl(
      'activity',
      this.getActivityForm(activity, this.timeSheet.id)
    );
    this.editingActivity = activity;

    this.activityViewType.next('form');
  }

  public deleteActivity(row: IRow) {
    const activity = this.activities?.value?.find(
      activity => activity === row.entity
    );
    const newActivities =
      this.activities?.value?.filter(activity => activity !== row.entity) ||
      null;
    this.activities.next(newActivities);

    // if (!newActivities?.length) {
    //   this.activityViewType.next(undefined);
    // }

    if (!activity?.id) {
      return;
    }

    this.removedActivities.push(activity);
  }

  public submitForm(): void {
    const formValue = this.formGroup.value;

    const creationRequests: any[] = this.activities?.value?.map(activity => {
      const timesheetRate = new TimesheetRate(activity);

      return timesheetRate.id
        ? this.apiService.updateForm(
            timesheetRate.editApiEndpoint,
            timesheetRate.requestBody
          )
        : this.apiService.submitForm(
            timesheetRate.apiEndpoint,
            timesheetRate.requestBody
          );
    }) as any[];

    creationRequests.push(
      ...this.removedActivities.map(activity =>
        this.apiService.delete(activity.apiEndpoint, activity.id as string)
      )
    );

    if (formValue.note || formValue.pictures) {
      const note = new Note({
        object_id: this.timeSheet.id as string,
        note: formValue.note,
        contact: { id: this.userService.user?.data.contact.id as string },
        content_type: {
          id: ENoteContentType.TimeSheet.toString(),
        },
      });

      const request = this.apiService.submitForm(Endpoints.Note, note).pipe(
        switchMap((response: INote) => {
          if (formValue.pictures && formValue.pictures.length) {
            const requests = formValue.pictures.map((picture: any) => {
              const body = new FormData();
              body.append('note', response.id as string);
              body.append('file', picture);

              return this.apiService.uploadFile(Endpoints.NoteFile, body);
            });

            return forkJoin(requests);
          }

          return of(response);
        })
      );

      creationRequests.push(request);
    }

    const submitRequest = this.apiService.editForm(
      this.timeSheet.editApiEndpoint + 'not_agree/',
      this.timeSheet.getRequestBody(creationRequests.length > 0)
    );

    creationRequests.push(submitRequest);

    this.processing$.next(true);

    forkJoin(creationRequests)
      .pipe(finalize(() => this.processing$.next(false)))
      .subscribe(() => {
        this.close(Status.Success);
      });
  }

  private initTimeForm(timeSheet: TimeSheet): FormGroup {
    const timesForm = new FormGroup({
      shiftStartedAt: new FormControl(timeSheet.startedAt, Validators.required),
      shiftEndedAt: new FormControl(timeSheet.endedAt, Validators.required),
      break: new FormControl(''),
    });

    return timesForm;
  }

  private updateTimeSheet(value: any) {
    this.timeSheet.startedAt = value.shiftStartedAt || null;
    this.timeSheet.endedAt = value.shiftEndedAt || null;
    this.timeSheet.updateBreak(value.break ? value.break.split(':') : null);
  }

  private getActivityParams(): { [key: string]: any } {
    return {
      fields: ['__str__', 'id', 'translations', 'uom', 'skill_rate', 'amount'],
      timesheet: this.timeSheet.id,
      skill: this.timeSheet.position.id,
      company: this.timeSheet.company.id,
      candidate_contact: this.timeSheet.contact_id,
      priced: true,
    };
  }

  private getActivities(): void {
    this.apiService
      .get(Endpoints.TimesheetRates, {
        timesheet: this.timeSheet.id,
        limit: -1,
      })
      .subscribe((response: any) => {
        const activities = response.results
          .map((activity: any) => new TimesheetRate(activity))
          .filter((rate: any) => !isHourlyWork(rate.worktype.__str__));

        if (activities.length) {
          this.activityViewType.next('list');
        }

        this.activities.next(activities);
      });
  }

  private getActivityForm(
    activity: TimesheetRate | undefined,
    timesheet?: string
  ): FormGroup {
    const form = new FormGroup({
      id: new FormControl(activity?.id),
      value: new FormControl(activity?.value, Validators.required),
      rate: new FormControl(activity?.rate),
      timesheet: new FormControl(activity?.timesheet || { id: timesheet }),
      worktype: new FormControl(activity?.worktype, Validators.required),
    });

    form
      .get('worktype')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(worktype => {
        if (worktype instanceof DropdownOption) {
          const rate = worktype?.getField('skill_rate');
          const maxAmount = worktype.getField('amount');

          form.get('rate')?.patchValue(rate, { emitEvent: false });

          if (maxAmount) {
            form.get('value')?.addValidators(Validators.max(maxAmount));
          } else {
            form.get('value')?.removeValidators(Validators.max(maxAmount));
          }
        }
      });

    return form;
  }
}
