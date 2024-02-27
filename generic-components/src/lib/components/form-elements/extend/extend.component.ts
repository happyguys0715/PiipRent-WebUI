import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// import { CustomEvent } from '../../../models';
import { BasicElementComponent } from '../basic-element/basic-element.component';
// import { GenericFormService, FormService } from '../../../services';

import { Time } from '@webui/time';
import { Field } from '@webui/metadata';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent, InfoComponent, SpinnerComponent } from '@webui/ui';
import { DateFormatPipe } from '@webui/shared';
// import { InfoComponent } from '../../info/info.component';
import { FormElementDirective } from '../../../directives';
import { CustomEvent } from '@webui/models';
import { FormService, GenericFormService } from '@webui/core';

const extendConfig = {
  shiftsDates: {
    key: 'shifts',
    type: 'jobdates',
    removeDate: <BehaviorSubject<any> | null>null,
    value: [],
  },
  extendDates: {
    key: 'extendDates',
    type: 'checkbox',
    templateOptions: {
      label: 'Dates',
      disabled: false,
    },
  },
  extendCandidates: {
    key: 'extendCandidates',
    type: 'checkbox',
    templateOptions: {
      label: 'Candidates',
      disabled: false,
    },
  },
};

@Component({
  standalone: true,
  selector: 'webui-extend',
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.scss'],
  imports: [
    TranslateModule,
    forwardRef(() => FormElementDirective),
    CommonModule,
    InfoComponent,
    SpinnerComponent,
    FaIconComponent,
    DateFormatPipe,
  ],
})
export class ExtendComponent
  extends BasicElementComponent
  implements OnInit, OnDestroy
{
  private _destroy = new Subject<void>();
  private _shifts = new Map<string, any>();

  public override config!: Field;
  public override group!: FormGroup;
  public viewData!: FormGroup;
  public shifts: any[] = [];
  public viewConfig: any;
  public formData: any;
  public autoFillData: any;
  public override key: any;
  public extendDates!: boolean;
  public extendCandidates!: boolean;
  public autofill!: any[];
  public removeDate: BehaviorSubject<string> = new BehaviorSubject('');
  public availabilityCandidates: any[] = [];
  public autocompleteProcess!: boolean;
  public showAvailability!: boolean;

  constructor(
    private fb: FormBuilder,
    private gfs: GenericFormService,
    private formService: FormService
  ) {
    super();
  }

  public ngOnInit() {
    this.formService.getForm(this.config.formId as number).disableSaveButton =
      true;
    this.viewData = this.fb.group({});
    this.addControl(this.config, this.fb);
    extendConfig.shiftsDates.removeDate = this.removeDate;
    this.checkFormData();
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  public generateAutofill(data: any[]) {
    if (data && data.length) {
      this.autofill = [];
      data.forEach(date => {
        this.autofill.push({
          time: Time.parse(date.shift_datetime).format('HH:mm:ss'),
          candidates: date.candidates,
        });
      });
    }
  }

  public eventHandler() {
    const form = this.formService.getForm(this.config.formId as number);

    this.viewData.value.shifts.forEach((date: any) => {
      if (!this.shifts.find(el => el.date === date)) {
        this.shifts.push(this.generateShift(date));
      }
    });

    this.shifts.forEach((el, i, array) => {
      if (this.viewData.value.shifts.indexOf(el.date) === -1) {
        array.splice(i, 1);
      }
    });

    form.disableSaveButton = !this.shifts.length;
    this.checkDates();
  }

  public checkFormData() {
    if (this.config.formData) {
      this.config.formData.pipe(takeUntil(this._destroy)).subscribe(data => {
        this.formData = data.data;
        const { last_fullfilled } = this.formData;
        if (last_fullfilled) {
          this.autoFillData = last_fullfilled.length
            ? [last_fullfilled[0]]
            : last_fullfilled;
        }

        if (this.autoFillData) {
          this.availabilityCandidates = this.getAvailabilityCandidates(
            this.formData.available,
            this.autoFillData[0].candidates
          );
        }

        if (!this.viewConfig) {
          if (!this.autoFillData) {
            extendConfig.extendDates.templateOptions.disabled = true;
            extendConfig.extendCandidates.templateOptions.disabled = true;
          }

          this.viewConfig = extendConfig;
        }

        this.generateAutofill(this.autoFillData);
      });
    }
  }

  public getAvailabilityCandidates(data: any, candidates: any[]): any {
    const lastCandidates = this.getCandidatesFromLastShift(data, candidates);
    const result = [];

    for (const candidate in lastCandidates) {
      if (candidate in data) {
        const shifts: any[] = [];
        data[candidate].forEach((el: any) => {
          if (el && el.text.toLowerCase().includes('unavailable')) {
            shifts.push(...el.shifts);
          }
        });

        result.push({
          candidateName: candidate,
          shifts,
        });
      }
    }

    return result;
  }

  public getCandidatesFromLastShift(availability: any, candidates: any[]): any {
    const result: Record<string, any> = {};
    candidates.forEach(el => {
      result[el.__str__] = availability[el.__str__];
    });

    return result;
  }

  public generateShift(date: string) {
    const shift = {
      date,
      config: <Record<number, any>>{
        0: this.generateConfig(
          this.getJobId(),
          date,
          this.formData['default_shift_starting_time']
        ),
      },
      data: this.fb.array([this.fb.group({})]),
    };

    if (this.extendDates) {
      shift['config'] = <any>{};
      shift['data'] = this.fb.array<FormGroup<{}>>([]);

      this.autofill.forEach((el, i) => {
        shift['config'][i] = this.generateConfig(
          this.getJobId(),
          date,
          el.time,
          null,
          true
        );
        shift['data'].insert(i, this.fb.group({}));
      });
    }

    if (this.extendCandidates) {
      shift['config'] = <any>{};
      shift['data'] = this.fb.array<FormGroup<{}>>([]);

      this.autofill.forEach((el, i) => {
        shift['config'][i] = this.generateConfig(
          this.getJobId(),
          date,
          el.time,
          el.candidates,
          this.extendDates,
          true
        );
        shift['data'].insert(i, this.fb.group({}));

        setTimeout(() => {
          this.getAvailableCandidate(
            el.candidates,
            date,
            el.time,
            shift['config'],
            i
          );
        }, 100);
      });
    }

    shift.data.valueChanges.pipe(takeUntil(this._destroy)).subscribe(v => {
      const value = {
        data: v,
        date,
      };

      this._shifts.set(date, value);

      this.updateValue();
    });

    return shift;
  }

  public updateValue() {
    const result = this.shifts.map(shift => this._shifts.get(shift.date));

    this.group.get(this.key)?.patchValue(result);
  }

  public getJobId() {
    if (this.formData.id instanceof Object) {
      return this.formData.id.id;
    } else {
      return this.formData.id;
    }
  }

  public getAvailableCandidate(
    candidates: any[],
    date: string,
    time: string,
    config: any,
    index: number
  ) {
    const availableCandidates = [];
    candidates.forEach(candidate => {
      if (
        this.checkCandidateAvailability(
          candidate.__str__,
          this.availabilityCandidates,
          date
        )
      ) {
        availableCandidates.push(candidate);
      }
    });

    if (availableCandidates.length < candidates.length) {
      const workers = candidates.length - availableCandidates.length;

      this.getCandidates(date, { time, workers })?.subscribe(candidateList => {
        this.updateShift(
          { time, workers: candidates.length },
          config,
          index,
          candidateList.slice(0, workers)
        );
      });
    }
  }

  public checkCandidateAvailability(
    candidate: string,
    available: any[],
    date: string
  ): boolean | undefined {
    const candidateInfo = available.find(el => el.candidateName === candidate);

    if (candidateInfo) {
      if (!candidateInfo.shifts.length) {
        return true;
      }

      return !candidateInfo.shifts.some((el: any) => {
        const shiftDate = Time.parse(el.datetime).format('YYYY-MM-DD');

        return shiftDate === date;
      });
    }

    return;
  }

  public addTime(shift: any) {
    shift.config[shift.data.length] = this.generateConfig(
      this.getJobId(),
      shift.date
    );
    shift.data.insert(shift.data.length, this.fb.group({}));
  }

  public generateConfig(
    id: string,
    date: any,
    time?: any,
    candidates?: any,
    timeReadOnly?: any,
    candidateReadOnly?: any
  ) {
    const formData = new BehaviorSubject({ data: { shift: date } });

    return {
      time: {
        key: 'time',
        formData,
        value: time,
        mode: new BehaviorSubject(timeReadOnly ? 'view' : 'edit'),
        rightPosition: false,
        templateOptions: {
          required: true,
          label: 'Select time',
          type: 'time',
        },
        read_only: timeReadOnly,
        type: 'datepicker',
      },
      workers: {
        default: 1,
        key: 'workers',
        formData,
        mode: new BehaviorSubject(candidateReadOnly ? 'view' : 'edit'),
        value: candidates ? candidates.length : 1,
        templateOptions: {
          min: 1,
          required: false,
          label: 'Number of workers',
          max: 32767,
          type: 'number',
        },
        read_only: candidateReadOnly,
        type: 'input',
      },
      candidates: {
        type: 'related',
        endpoint: `/hr/jobs/${id}/extend_fillin/`,
        key: 'candidates',
        many: true,
        formData,
        value: candidates,
        hidden: new BehaviorSubject(true),
        doNotChoice: candidateReadOnly,
        hideSelect: candidateReadOnly,
        unique: true,
        templateOptions: {
          label: 'Select workers',
          info: {
            score: '{candidate_scores.average_score}',
            distance: '{distance}',
          },
          values: ['__str__'],
          dontSendFields: true,
        },
        query: {
          shift: `{shift}T{time}%2B${Time.now().format('Z').slice(1)}`,
        },
        read_only: candidateReadOnly,
      },
    };
  }

  public timeChange(e: any, config: any) {
    if (e.type === 'change') {
      config.candidates.hidden.next(!e.value);
    }

    const newData = this.generateData(
      e.el.key,
      e.el.formData.getValue().data,
      e
    );

    config.candidates.formData.next({
      key: e.el.key,
      data: newData,
    });
  }

  public generateData(
    key: string,
    data: Record<string, any> = {},
    event: CustomEvent
  ): any {
    const keys = key.split('.');
    const firstKey: string = keys.shift() as string;

    if (keys.length === 0) {
      if (event.el.type === 'related' && firstKey !== 'id') {
        if (data[firstKey]) {
          data[firstKey] = {
            ...data[firstKey],
            ...event.additionalData,
          };
        } else {
          data[firstKey] = {
            id: event.value,
            ...event.additionalData,
          };
        }
      } else {
        data[firstKey] = event.value;
      }
    } else {
      if (data[firstKey]) {
        this.generateData(keys.join('.'), data[firstKey], event);
      } else {
        data[firstKey] = {};
        this.generateData(keys.join('.'), data[firstKey], event);
      }
    }

    return data;
  }

  public removeTime(target: FormArray, index: number, parentIndex: number) {
    target.removeAt(index);

    if (!target.length) {
      const date = this.shifts[parentIndex].date;

      this.shifts.splice(parentIndex, 1);
      this.removeDate.next(date);
    }
  }

  public autofillDates(event: any) {
    this.extendDates = event.value;
  }

  public autofillCandidates(event: any) {
    this.extendCandidates = event.value;
  }

  public autocompleteCandidates() {
    this.autocompleteProcess = true;
    this.shifts.forEach(shift => {
      shift.data.controls.forEach(
        (control: FormControl, i: number, arr: FormControl[]) => {
          const data = control.value;
          const config = shift.config;
          const candidatesConfig = config[i].candidates;
          data.time = data.time + ':00';

          if (!candidatesConfig.doNotChoice) {
            this.getCandidates(shift.date, data)?.subscribe(candidates => {
              this.updateShift(
                data,
                config,
                i,
                candidates.slice(0, data.workers)
              );

              if (i === arr.length - 1) {
                this.autocompleteProcess = false;
              }
            });
          }
        }
      );
    });
  }

  public checkDates() {
    this.showAvailability = false;
    const selectedDates = this.shifts.map(el => el.date);

    this.availabilityCandidates.forEach(candidate => {
      candidate.shifts.forEach((shift: any) => {
        const date = Time.parse(shift.datetime).format('YYYY-MM-DD');

        shift.show = selectedDates.includes(date);
      });

      candidate.show = candidate.shifts.some((shift: any) => shift.show);
      this.showAvailability = this.showAvailability || candidate.show;
    });
  }

  public getCandidates(date: string, data: any) {
    if (data.time && data.workers) {
      const endpoint = `/hr/jobs/${this.getJobId()}/extend_fillin/`;
      const query = {
        shift: Time.utc(date + ' ' + data.time).toISOString(),
        limit: -1,
      };

      return this.gfs.get(endpoint, query).pipe(
        map((res: any) => {
          this.sortCandidate(res.results);

          return res.results;
        })
      );
    }

    return;
  }

  public updateShift(data: any, config: any, index: number, candidates: any[]) {
    const newConfig = {
      ...config[index],
      candidates: {
        ...config[index].candidates,
        value: candidates,
      },
      workers: {
        ...config[index].workers,
        value: data.workers,
      },
      time: {
        ...config[index].time,
        value: data.time,
      },
    };

    setTimeout(() => {
      config[index] = { ...newConfig };
    }, 0);

    config[index] = null;
  }

  public sortCandidate(candidates: any[]) {
    candidates.sort((prevCandidate, nextCandidate) => {
      const prevCandidateScore = parseFloat(
        prevCandidate.candidate_scores.average_score
      );
      const nextCandidateScore = parseFloat(
        nextCandidate.candidate_scores.average_score
      );

      if (prevCandidateScore < nextCandidateScore) {
        return 1;
      } else if (prevCandidateScore === nextCandidateScore) {
        if (prevCandidate.distance > nextCandidate.distance) {
          return 1;
        } else if (prevCandidate.distance === nextCandidate.distance) {
          if (
            prevCandidate.latest_activity_at > nextCandidate.latest_activity_at
          ) {
            return 1;
          }
          return -1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
  }
}
