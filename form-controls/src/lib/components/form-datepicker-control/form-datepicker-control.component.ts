import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Icon, IconComponent, IconSize, TimePickerComponent } from '@webui/ui';
import { DatepickerType } from '../../enums/datepicker.enum';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { CdkOverlayOrigin, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { Dropdown } from '../../helpers';
import { takeUntil } from 'rxjs/operators';
import { API_DATE_FORMAT, Time, TIME_FORMAT } from '@webui/time';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-form-datepicker-control',
  templateUrl: './form-datepicker-control.component.html',
  styleUrls: ['./form-datepicker-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDatepickerControlComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    OverlayModule,
    ReactiveFormsModule,
    TranslateModule,
    IconComponent,
    TimePickerComponent,
  ],
})
export class FormDatepickerControlComponent
  implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy
{
  private onChange?: (value: string | undefined | null) => void;
  private onTouched?: () => void;
  private timerDropdown!: Dropdown;
  private destroy: Subject<void> = new Subject<void>();

  @Input() label!: string;
  @Input() type?: DatepickerType;
  @Input() initialValue?: string | null;
  @Input() timezone?: string;

  @Input() timerFrom?: string | null;
  @Input() timerTo?: string | null;

  @ViewChild(CdkOverlayOrigin) overlayOrigin?: CdkOverlayOrigin;
  @ViewChild('content') content?: TemplateRef<unknown>;

  public Icon = Icon;
  public IconSize = IconSize;
  public value?: string;

  public dateControl = new FormControl('');
  public timeControl = new FormControl('');
  public durationControl = new FormControl('00h 00min');
  public hoursControl = new FormControl('00');
  public minutesControl = new FormControl('00');
  public destroy$: Observable<void> = this.destroy.asObservable();

  public get isTimer(): boolean {
    return this.type === DatepickerType.Timer;
  }

  public get isDate(): boolean {
    return this.type === DatepickerType.Date;
  }

  public get isTime(): boolean {
    return this.type === DatepickerType.Time;
  }

  public get isDateTime(): boolean {
    return this.type === DatepickerType.DateTime;
  }

  public hasIcon(type: string): boolean {
    return this.platform.FIREFOX && type === 'time';
  }

  public get formatedTime(): string {
    return this.timeControl.value || '';
  }

  constructor(
    private platform: Platform,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(
    fn: (value: string | undefined | null) => void
  ): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.dateControl.disable();
      this.timeControl.disable();
      this.durationControl.disable();
    } else {
      this.dateControl.enable();
      this.timeControl.enable();
      this.durationControl.enable();
    }
  }

  ngOnInit(): void {
    this.parseInitialValue();
    this.parseTimerInitialValue();
    this.subscribeOnChanges();
    this.subscribeOnDurationChange();
  }

  public ngAfterViewInit(): void {
    if (this.overlayOrigin && this.content) {
      this.timerDropdown = new Dropdown(this.overlayOrigin, this.content);
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public showDurationDropdown(): void {
    this.timerDropdown.openDropdown(this.overlay, this.viewContainerRef, {});
  }

  public plus(control: FormControl): void {
    control.patchValue(parseInt(control.value, 10) + 1);

    this.updateDuration();
  }

  public minus(control: FormControl): void {
    control.patchValue(parseInt(control.value, 10) - 1);

    this.updateDuration();
  }

  onTimeChange(value: string) {
    this.timeControl.patchValue(value);
  }

  private updateDuration(): void {
    const hours = this.hoursControl.value;
    const minutes = this.minutesControl.value;
    const duration = `${hours || '00'}h ${minutes || '00'}min`;

    this.durationControl.patchValue(duration);
  }

  private parseInitialValue(): void {
    if (!this.initialValue) {
      return;
    }

    const date = Time.parse(this.initialValue, {
      timezone: this.timezone,
    });

    this.dateControl.patchValue(date.format(API_DATE_FORMAT), {
      emitEvent: false,
    });
    this.timeControl.patchValue(date.format(TIME_FORMAT), {
      emitEvent: false,
    });
  }

  private parseTimerInitialValue(): void {
    if (!this.timerFrom || !this.timerTo) {
      return;
    }

    const from = Time.parse(this.timerFrom, {
      timezone: this.timezone,
    });
    const to = Time.parse(this.timerTo, {
      timezone: this.timezone,
    });
    const hours = to.diff(from, 'hours');
    const minutes = to.clone().add(-hours, 'hours').diff(from, 'minutes');

    this.durationControl.patchValue(`${hours}h ${minutes}min`);
    this.hoursControl.patchValue(hours.toString());
    this.minutesControl.patchValue(minutes.toString());

    // Duration update
    setTimeout(() => {
      this.onChanges();
    });
  }

  private subscribeOnChanges(): void {
    merge(
      this.dateControl.valueChanges,
      this.timeControl.valueChanges,
      this.durationControl.valueChanges
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onChanges());
  }

  private onChanges(): void {
    const date = this.dateControl.value;
    const time = this.timeControl.value;

    if (!this.onChange) {
      return;
    }

    if (this.isDate) {
      this.onChange(date);
    } else if (this.isTime) {
      this.onChange(time);
    } else if (this.isDateTime) {
      const datetime =
        date && time
          ? Time.parse(`${date}T${time}`, {
              timezone: this.timezone,
            })
          : undefined;

      this.onChange(datetime ? datetime.utc().format() : undefined);
    } else if (this.isTimer) {
      const hours = parseInt(this.hoursControl.value || '', 10);
      const minutes = parseInt(this.minutesControl.value || '', 10);

      if (!hours && !minutes) {
        this.onChange(null);
        return;
      }

      this.onChange(`${hours}:${minutes}`);
    }
  }

  private subscribeOnDurationChange() {
    this.validateDuration(this.hoursControl, (value: number) =>
      this.inRange(value, 0, 24)
    );
    this.validateDuration(this.minutesControl, (value: number) =>
      this.inRange(value, 0, 59)
    );
  }

  private validateDuration(
    control: FormControl,
    validator: (value: number) => number
  ) {
    control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(duration => {
      if (!duration) {
        this.updateDuration();
        return;
      }

      const parsedValue = parseInt(duration, 10);
      const nextValue = isNaN(parsedValue)
        ? duration.replace(/\D/g, '')
        : validator(parsedValue);
      control.patchValue(nextValue, { emitEvent: false });
      this.updateDuration();
    });
  }

  private inRange(value: number, from: number, to: number) {
    if (value > to) {
      return to;
    } else if (value < from) {
      return from;
    } else {
      return value;
    }
  }
}
