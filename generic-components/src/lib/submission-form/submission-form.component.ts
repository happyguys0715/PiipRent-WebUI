import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GenericFormService, UserService } from '@webui/core';
import { Field } from '@webui/metadata';
import { Endpoints } from '@webui/models';
import {
  createAddAction,
  FormatString,
  getElementFromMetadata,
  getPropValue,
} from '@webui/utilities';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import {
  details,
  skillActivities,
  times,
  notes,
  workType,
  timesFilled,
} from './submission-form.config';
import { NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent, SpinnerComponent } from '@webui/ui';
import { DynamicFormComponent } from '@webui/dynamic-form';
// import { DynamicFormComponent } from '../../../containers';

enum TimesheetType {
  Times = 'times',
  Activity = 'activity',
  Activities = 'activitites',
}

@Component({
  standalone: true,
  selector: 'webui-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.scss'],
  imports: [
    DynamicFormComponent,
    NgForOf,
    NgIf,
    TranslateModule,
    SpinnerComponent,
    FaIconComponent,
  ],
})
export class SubmissionFormComponent implements OnInit {
  @Input() config: any;
  @Output() event: EventEmitter<{ type: string; status: string }> =
    new EventEmitter();

  typeControl!: FormControl;
  timesheetType = TimesheetType;
  formData = new BehaviorSubject<any>({ data: {} });
  formGroup = new FormGroup({});

  skillActivityData!: any[];
  timesData: any;
  eventData: Map<any, any> = new Map();

  details = details();
  times = times();
  timesFilled = timesFilled();
  skillActivity = workType();
  skillActivities = skillActivities();
  notes = notes();

  saveProcess!: boolean;
  formFilled!: boolean;

  errors!: { [key: string]: any };
  mode = new BehaviorSubject('edit');
  isEditTimesheet!: boolean;

  hiddenFields = {
    elements: <any[]>[],
    keys: <any[]>[],
    observers: <any[]>[],
  };

  types = [
    {
      key: TimesheetType.Times,
      label: 'Time only',
      translateKey: 'times_only',
    },
    {
      key: TimesheetType.Activity,
      label: 'Piecework or combined',
      translateKey: 'piecework_or_combined',
    },
  ];

  get type(): TimesheetType {
    return this.typeControl.value;
  }

  constructor(
    private gfs: GenericFormService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.typeControl = new FormControl('');
    this.parseMetadata(this.details, this.config.data);

    this.formData.next({
      data: this.config.extendData,
    });

    if (this.config.extendData.status === 5) {
      const type = TimesheetType.Activities;

      if (type === TimesheetType.Activities) {
        this.isEditTimesheet = true;
        this.typeControl.patchValue(type);

        this.updateMetadata(this.getMetadataConfig(this.skillActivities));
        this.updateMetadata(this.getMetadataConfig(this.notes));
        this.formFilled = true;
      }
    }
  }

  public formEvent(e: any) {
    if (e.type === 'saveStart') {
      this.saveProcess = true;
    }

    if (e.type === 'sendForm' && e.status === 'success') {
      this.event.emit(e);
    }
  }

  public errorEvent() {
    this.saveProcess = false;
  }

  setTimesheetType(type: TimesheetType) {
    this.typeControl.patchValue(type);
    this.formFilled = false;
    this.timesData = null;
    this.skillActivityData = [];

    if (type === TimesheetType.Times) {
      this.mode.next('edit');
      this.parseMetadata(this.times, this.config.data);
      this.updateDatepickerByTimezone(this.times, this.config.data);
      this.updateMetadata(this.getMetadataConfig(this.times));
    }

    if (type === TimesheetType.Activity) {
      this.parseMetadata(this.skillActivity, this.config.data);
      this.updateMetadata(this.getMetadataConfig(this.skillActivity));
    }
  }

  eventHandler(event: any) {
    if (event.type === 'change' || event.type === 'blur') {
      if (event.el.key === 'worktype') {
        this.eventData.set(event.value, {
          ...(event.additionalData || {}),
        });
      }
    }
  }

  public getWorkTypeDetails(id: string, key: string): unknown {
    const el = this.eventData.get(id);

    if (!el) {
      return '';
    }

    return getPropValue(el, key);
  }

  saveTimes(data: any) {
    this.timesData = { ...data };
    this.formFilled = true;
    Object.keys(this.timesData).forEach(key => {
      this.config.data[key] = createAddAction({
        value: this.timesData[key],
        hide: !this.timesData[key],
      });
    });
    this.parseMetadata(this.timesFilled, this.config.data);
    this.updateDatepickerByTimezone(this.timesFilled, this.config.data);
    this.updateMetadata(this.getMetadataConfig(this.timesFilled));
    this.parseMetadata(this.timesFilled, this.config.data);
    this.mode.next('view');
    this.updateMetadata(this.getMetadataConfig(this.notes));
  }

  saveSkillActivity(data: any) {
    this.skillActivityData = [...this.skillActivityData, data];
    this.typeControl.patchValue(TimesheetType.Activities);
    this.formFilled = true;
    this.updateMetadata(this.getMetadataConfig(this.notes));
  }

  saveTimesheet() {
    let request: any;
    const { status } = this.config.extendData;

    if (this.type === TimesheetType.Activities) {
      request = forkJoin([
        this.createSkillActivity(),
        this.gfs.editForm(
          this.config.endpoint,
          status === 5 ? {} : { hours: false }
        ),
      ]);
    }

    if (this.type === TimesheetType.Times) {
      request = this.gfs.editForm(this.config.endpoint, {
        ...this.timesData,
        hours: true,
      });
    }

    this.saveProcess = true;
    request
      ?.pipe(
        finalize(() => (this.saveProcess = false)),
        catchError(err => {
          this.errors = err.errors;
          return err;
        })
      )
      .subscribe(() => {
        this.close();
      });
  }

  close() {
    this.event.emit({
      type: 'sendForm',
      status: 'success',
    });
  }

  public showSkillActivityForm() {
    this.formFilled = false;
    this.typeControl.patchValue(TimesheetType.Activity);
    this.parseMetadata(this.skillActivity, this.config.data);
    this.updateMetadata(this.getMetadataConfig(this.skillActivity));
  }

  public deleteSkillActivity(activity: unknown): void {
    this.skillActivityData.splice(this.skillActivityData.indexOf(activity), 1);
  }

  private getMetadataConfig(metadata: any[]) {
    return {
      metadata,
      formData: this.formData,
      data: this.config.extendData,
      mode: this.type === TimesheetType.Times ? this.mode : null,
    };
  }

  private parseMetadata(metadata: any[], params: any) {
    metadata.forEach(el => {
      if (el && el.key && params && !!params[el.key]) {
        if (params[el.key].action === 'add') {
          let elem = getElementFromMetadata(metadata, el.key) as Field;
          elem = Object.assign(elem, params[elem.key as keyof Field].data);
        }
      } else if (el && el.children) {
        this.parseMetadata(el.children, params);
      }
    });
  }

  private updateMetadata(config: any) {
    const { metadata, formData, data, mode } = config;

    metadata.forEach((el: any) => {
      this.parseParams(el.prefilled, data);
      this.parseParams(el.query, data);

      if (el.showIf && el.showIf.length) {
        if (this.hiddenFields.keys.indexOf(el.key) === -1) {
          this.hiddenFields.keys.push(el.key);
          this.hiddenFields.elements.push(el);
          this.hiddenFields.observers = this.observeFields(
            el.showIf,
            this.hiddenFields.observers
          );
          el.hidden = new BehaviorSubject(true);
        }
      }

      if (el.key) {
        el.formData = formData;
        el.mode = mode;
      } else if (el.children) {
        this.updateMetadata({ metadata: el.children, formData, data, mode });
      }
    });
  }

  private parseParams(
    params: { [key: string]: any },
    data: any
  ): { [key: string]: any } | undefined {
    if (!params) {
      return;
    }

    const format = new FormatString();
    const fullData = {
      ...data,
      session: this.userService.user,
    };

    Object.keys(params).forEach(elem => {
      if (typeof params[elem] === 'string') {
        params[elem] = format.format(params[elem], fullData);
      }
    });

    return params;
  }

  private observeFields(fields: any[], observers: any[]) {
    fields.forEach((field: any) => {
      if (field instanceof Object) {
        const keys = Object.keys(field);
        keys.forEach(key => {
          if (observers.indexOf(key) === -1) {
            observers.push(key);
          }
        });
      } else {
        if (observers.indexOf(field) === -1) {
          observers.push(field);
        }
      }
    });
    return observers;
  }

  private updateDatepickerByTimezone(metadata: any[], data: any) {
    metadata.forEach(el => {
      if (el.type === 'datepicker') {
        if (data && (data.time_zone || data.timezone)) {
          el.time_zone = data.time_zone || data.timezone;
        }
      } else if (el.children) {
        this.updateDatepickerByTimezone(el.children, data);
      }
    });
  }

  private createSkillActivity() {
    if (this.config.extendData.status === 5) {
      return of(null);
    }

    return forkJoin(
      this.skillActivityData.map(activity =>
        this.gfs.submitForm(Endpoints.TimesheetRates, activity)
      )
    );
  }
}
