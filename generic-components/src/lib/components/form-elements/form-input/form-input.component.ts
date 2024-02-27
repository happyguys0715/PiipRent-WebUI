import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FormatString, getPropValue, getTotalTime } from '@webui/utilities';

import { BasicElementComponent } from '../basic-element/basic-element.component';
import { SiteSettingsService } from '@webui/core';
import {
  CommonModule,
  formatCurrency,
  getCurrencySymbol,
} from '@angular/common';
import { Time } from '@webui/time';
import { Field, ITemplateOptions } from '@webui/metadata';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { FaIconComponent, InfoComponent, TooltipDirective } from '@webui/ui';
import {
  InputFocusDirective,
  IntlTelInputDirective,
  PlaceAutocompleteDirective,
} from '@webui/shared';
import { ControlErrorComponent } from '../control-error/control-error.component';
import { isAddressField, isPhoneField } from '@webui/utilities';
import { FormEvent } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    InfoComponent,
    FaIconComponent,
    NgbRating,
    InputFocusDirective,
    FormsModule,
    PlaceAutocompleteDirective,
    IntlTelInputDirective,
    ControlErrorComponent,
    TooltipDirective,
  ],
})
export class FormInputComponent
  extends BasicElementComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private _destroy = new Subject<void>();

  public override config!: Field;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;

  public label!: boolean;
  public filteredList!: any[] | null;
  public displayValue!: string;
  public viewMode!: boolean;
  public formData: any;
  public autocompleteValue: any;
  public editMode: boolean;
  public hovered?: number;

  public query = '';
  public list: any[] | null = [];
  public limit = 10;
  public lastElement = 0;
  public hideAutocomplete = true;
  public modalScrollDistance = 2;
  public modalScrollThrottle = 50;
  public address = '';
  dataListMap!: any[];

  public intl!: any;

  public colors: Record<number, string> = {
    0: '#FA5C46',
    1: '#FA5C46',
    2: '#fc9183',
    3: '#FFA236',
    4: '#ffbf00',
    5: '#FFD042',
  };

  public requiredField?: boolean;

  get isAddressField() {
    return isAddressField(this.config);
  }

  get isPhoneField() {
    const { key, intl } = this.config;

    return isPhoneField(key as string) && intl;
  }

  get formControl(): FormControl {
    return this.group.get(this.key) as FormControl;
  }

  get addonIcon(): IconName | string | undefined {
    const addon = this.config.templateOptions?.addon;

    return addon ? addon : undefined;
  }

  @ViewChild('input') public input!: ElementRef;
  @ViewChild('inputPhone') public inputPhone!: ElementRef;

  @Output()
  public override event: EventEmitter<any> = new EventEmitter();

  private subscriptions: Subscription[];

  constructor(
    private fb: FormBuilder,
    public elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private siteSettings: SiteSettingsService
  ) {
    super();
    this.subscriptions = [];

    this.editMode = true;
  }

  public ngOnInit() {
    if (
      this.config.type !== 'static' ||
      this.config.type === 'static' ||
      !this.config.read_only
    ) {
      this.requiredField =
        (this.config.key === 'score' || this.config.key === 'hourly_rate') &&
        this.config.templateOptions?.required;
      this.requiredField =
        this.requiredField ||
        (this.config.templateOptions?.required &&
          !(this.config.hide || this.config.send === false));

      if (this.config.templateOptions?.type === 'number') {
        const { min, max, pattern } = this.config.templateOptions;

        this.addControl(
          this.config,
          this.fb,
          this.requiredField,
          min,
          max,
          pattern
        );
      } else {
        this.addControl(this.config, this.fb, this.requiredField);
      }
    }

    const control = this.group.get(this.key);
    if (control) {
      control.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          takeUntil(this._destroy)
        )
        .subscribe(() => {
          this.eventHandler({ type: FormEvent.Change });

          if (this.config.intl) {
            this.errors[this.config.key as string] =
              control.invalid && 'error.invalid_phone';
          }
        });
    }

    this.setInitValue();
    this.checkModeProperty();
    this.checkHiddenProperty();
    this.checkAutocomplete();
    this.checkFormData();
    if (
      this.config.type !== 'static' ||
      (this.config.type === 'static' && !this.config.read_only)
    ) {
      this.createEvent();
    }

    this.updateIcon();
  }

  updateIcon() {
    if (this.config.templateOptions?.icon) {
      const currency = getCurrencySymbol(
        this.siteSettings.settings.currency,
        'wide'
      );

      this.config.templateOptions.iconParsed = FormatString.format(
        this.config.templateOptions.icon,
        { currency, ...this.formData }
      );
    }
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();

    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  public checkFormData() {
    if (this.config.formData) {
      const subscription = this.config.formData.subscribe(value => {
        const { data, key } = value;

        this.formData = data;
        this.checkTimesheetTime(value);
        this.checkTotalTime(data);
        this.checkIfExistDefaultValue(key);
        this.checkAttributes();
        this.updateIcon();
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkTotalTime(data: any) {
    if (this.config.key === 'total_time') {
      const formatString = new FormatString();
      const newData = { ...data };

      if (newData.noBreak) {
        newData['break_started_at'] = null;
        newData['break_ended_at'] = null;
      }

      this.displayValue = formatString.format('{totalTime}', {
        ...newData,
        totalTime: getTotalTime(newData),
      });
    }
  }

  public checkAttributes() {
    if (this.config.attributes) {
      const formatString = new FormatString();
      const attributes = this.config.attributes;

      for (const prop in attributes) {
        if (this.config.templateOptions) {
          this.config.templateOptions[prop as keyof ITemplateOptions] =
            formatString.format(
              this.config.attributes[prop as keyof ITemplateOptions],
              this.formData
            );
        }
      }

      if (!this.config.read_only) {
        if (this.input) {
          this.addFlags(
            this.input,
            this.config,
            this.group.get(this.key) as FormControl
          );
        }
      }
    }
  }

  public checkTimesheetTime(payload: { key: string; data: any }) {
    const { data } = payload;

    if (this.config.key === 'total_worked') {
      const timezone = data.time_zone;

      this.displayValue = getTotalTime(data, timezone);
    }
  }

  public checkIfExistDefaultValue(field: string) {
    if (
      this.config.default &&
      typeof this.config.default === 'string' &&
      this.config.default.includes('{') &&
      this.config.default.includes('}')
    ) {
      if (!this.isAddressField) {
        if (this.config.updated && !this.config.updated.includes(field)) {
          return;
        }
        this.setInitValue(true);
      }
    }
  }

  public checkHiddenProperty() {
    const { hidden, type, read_only, templateOptions, formData } = this.config;

    if (hidden && (type !== 'static' || (type === 'static' && !read_only))) {
      const subscription = hidden.subscribe(hide => {
        if (hide) {
          this.config.hide = hide;
          this.group.get(this.key)?.patchValue(undefined);
          this.setInitValue();
        } else {
          this.config.hide = hide;

          if (this.config.templateOptions?.pattern) {
            const pattern: string = getPropValue(
              formData?.value.data,
              templateOptions?.pattern as string
            ) as string;
            const control = this.group.get(this.key);

            if (control) {
              control.setValidators(Validators.pattern(pattern));
              control.updateValueAndValidity({ onlySelf: true });
            }
          }
        }

        if (!(<any>this.cd).destroyed) {
          this.cd.detectChanges();
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkModeProperty() {
    if (this.config && this.config.mode) {
      const subscription = this.config.mode.subscribe(mode => {
        if (mode === 'view') {
          this.viewMode = true;
          this.editMode = false;

          if (this.group.get(this.key) && !this.config.hide) {
            this.group.get(this.key)?.patchValue(undefined);
          }
        } else {
          this.viewMode = this.config.read_only || false;

          this.editMode = true;

          setTimeout(() => {
            if (!this.config.read_only) {
              if (this.input) {
                this.addFlags(this.input, this.config);
              }
            }
          }, 200);
        }
        this.autocompleteValue = undefined;
        this.setInitValue();
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkAutocomplete() {
    if (this.config.autocompleteData) {
      const subscription = this.config.autocompleteData.subscribe(data => {
        const key = this.propertyMatches(
          Object.keys(data),
          this.config.key as string
        );
        if (
          key &&
          this.config.type !== 'address' &&
          this.config.key !== 'address' &&
          !this.config.key?.includes('street_address')
        ) {
          this.viewMode = true;
          this.autocompleteValue = data[key] || '-';
          this.setInitValue();
        }

        if (!(<any>this.cd).destroyed) {
          this.cd.detectChanges();
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  public propertyMatches(keys: string[], key: string): string | undefined {
    return keys.find(el => key.includes(el));
  }

  public setInitValue(update?: boolean) {
    const format = new FormatString();
    const initValue = this.config.value;

    if (initValue && this.config.templateOptions?.round) {
      this.config.value = parseInt(initValue, 10);
    }

    const control = this.group.get(this.key);

    if (control) {
      const controlValue = control.value;

      if (controlValue) {
        if (this.key === 'street_address') {
          this.address = controlValue.formatted_address;
        }

        if (this.key === 'postal_code') {
          this.config.value = controlValue;
          this.displayValue = controlValue;
        }
      }
    }

    if (
      this.config.type !== 'static' ||
      (this.config.type === 'static' && !this.config.read_only)
    ) {
      if (this.autocompleteValue) {
        this.displayValue = this.autocompleteValue;

        if (control) {
          control.patchValue(this.autocompleteValue);
        }
      } else if (
        this.config.value === 0 ||
        this.config.value ||
        this.config.default ||
        this.config.default === 0
      ) {
        const defaultValue =
          typeof this.config.default === 'string'
            ? format.format(this.config.default, this.formData)
            : this.config.default;

        const value =
          (this.config.value === 0 || this.config.value) &&
          !(
            update &&
            defaultValue !== this.config.value &&
            !this.config.useValue
          )
            ? this.config.value
            : defaultValue;

        if (value && this.isPhoneField) {
          this.intl = value;
        }

        if (control) {
          control.patchValue(value);
        }

        if (this.isAddressField) {
          this.address = value;
        }
        const currency = getCurrencySymbol(
          this.siteSettings.settings.currency,
          'wide'
        );
        const text = format.format(
          this.config.templateOptions?.text as string,
          {
            [this.config.key as string]: value,
            currency,
          }
        );
        this.displayValue = text || (value || value === 0 ? value : '-');

        if (this.config.templateOptions?.display) {
          if (this.config.templateOptions.currency) {
            this.displayValue = formatCurrency(
              parseFloat(this.displayValue),
              'en',
              getCurrencySymbol(this.siteSettings.settings.currency, 'wide') ||
                'USD'
            );
          } else {
            this.displayValue = format.format(
              this.config.templateOptions.display.replace(
                /{field}/gi,
                `{${this.config.key}}`
              ),
              { [this.key]: this.displayValue, currency }
            );
          }
        }
      }
    } else {
      if (this.config.value instanceof Object) {
        const displayFormat = this.config.templateOptions?.display;
        this.displayValue = displayFormat
          ? format.format(displayFormat, this.config.value)
          : this.config.value.__str__ || '-';
      } else {
        const text = format.format(
          this.config.templateOptions?.text as string,
          {
            [this.config.key as string]: this.config.value,
          }
        );

        this.displayValue = text || this.config.value || '-';
      }
    }

    setTimeout(() => {
      if (!(<any>this.cd).destroyed) {
        this.cd.detectChanges();
      }
    }, 200);
  }

  public ngAfterViewInit() {
    if (!this.config.read_only) {
      if (this.input) {
        this.addFlags(this.input, this.config);
      }
    }
  }

  public eventHandler(e: any) {
    setTimeout(() => {
      this.event.emit({
        type: e.type,
        el: this.config,
        value: this.group.get(this.key)?.value,
      });
    }, 100);
  }

  public switchType(type?: string) {
    if (!type) {
      return;
    }

    if (this.config.templateOptions) {
      switch (type) {
        case 'text':
          this.config.templateOptions.type = 'password';
          break;
        case 'password':
          this.config.templateOptions.type = 'text';
          break;
        default:
          break;
      }
    }
  }

  // Address field

  public getAddress(address: any) {
    this.formControl.markAsTouched();
    this.formControl.patchValue(address);

    this.event.emit({
      type: 'change',
      el: this.config,
      value: address,
    });

    this.event.emit({
      type: 'address',
      el: this.config,
      value: address,
    });
  }

  public parseScore(score: string) {
    if (!score) {
      return 0;
    }

    return parseFloat(score);
  }

  getTranslationKey(type: string) {
    return `${this.config.translateKey || this.config.key}.${type}`;
  }

  isIconName(val?: string): val is IconName {
    return val ? val.indexOf('.') === -1 : false;
  }

  getError() {
    if (!this.config.key) {
      return '';
    }

    const error = this.errors[this.config.key];

    if (typeof error === 'string') {
      return error;
    }

    if (Array.isArray(error)) {
      return error.join(', ');
    }

    return error;
  }
}
