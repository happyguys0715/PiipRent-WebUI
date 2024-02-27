import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { is } from 'ramda';

// import { CustomEvent } from '../../models';
import { FormService, InputService, SiteSettingsService } from '@webui/core';
// import { FormMode, FormService } from '../../services';
// import { convertPhoneNumber } from '../../helpers';
import { Field } from '@webui/metadata';
// import { InputService } from '../../services/input.service';
// import { FormEvent } from '../../interfaces';
import { CommonModule } from '@angular/common';
// import { FormElementDirective } from '@webui/dynamic-elements';
import { FormErrorsComponent } from '@webui/ui';
import { CustomEvent, FormEvent, FormMode } from '@webui/models';
import { convertPhoneNumber } from '@webui/utilities';
import { FormElementDirective } from '../directives';
// import { FormElementDirective } from '../../directives';
// import { FormErrorsComponent } from '../../components';

@Component({
  standalone: true,
  selector: 'webui-dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [InputService],
  imports: [
    CommonModule,
    forwardRef(() => FormElementDirective),
    ReactiveFormsModule,
    FormErrorsComponent,
  ],
})
export class DynamicFormComponent implements OnInit {
  @Input()
  public config: Field[] = [];
  @Input()
  public errors: any = {};
  @Input()
  public message: any = {};
  @Input()
  public data: any;
  @Input()
  public hiddenFields: any;
  @Input()
  public formId!: number;
  @Input()
  public form!: FormGroup;
  @Input()
  public formBuilder!: boolean;
  @Input()
  public mode!: FormMode | null;

  @Output()
  public submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public event: EventEmitter<any> = new EventEmitter();
  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();
  @Output()
  public changeValue: EventEmitter<any> = new EventEmitter();
  @Output()
  public formGroup: EventEmitter<FormGroup> = new EventEmitter();

  public currentForm: any;
  public fullData: any;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private siteSettings: SiteSettingsService,
    private formService: FormService
  ) {}

  public ngOnInit() {
    this.form = this.form || this.fb.group({});
    this.formGroup.emit(this.form);
    this.currentForm = this.config;
    this.addFormBuilderStatus(this.config);
  }

  addFormBuilderStatus(config: any[]) {
    if (config) {
      config.forEach(el => {
        el.formBuilder = this.formBuilder;

        if (el.children) {
          this.addFormBuilderStatus(el.children);
        }
      });
    }
  }

  public getValues(data: any, list: any[]) {
    const values: Record<string, any> = {};
    if (list) {
      list.forEach(el => {
        values[el] = this.getValue(data, el);
      });
    }
    return values;
  }

  public getValue(data: any, key: string): any {
    if (data) {
      if (key.indexOf('.') > -1) {
        const keys = key.split('.');
        return this.getValue(data.get(keys.shift()), keys.join('.'));
      } else {
        return data.get(key).value;
      }
    }
  }

  public handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.invalid) {
      return;
    }
    let data = this.form.value;

    this.trimWhiteSpace(data);

    if (this.formService && this.formId) {
      data = this.updateIfTimeCollapsed(
        data,
        this.formService.getForm(this.formId).additionalData
      );
    }

    if (this.hiddenFields) {
      this.removeValuesOfHiddenFields(this.hiddenFields.elements, data);
    }
    this.setNullFields(this.config, data);
    this.replaceByData(this.config, data);
    this.filterSendData(this.config, data);

    if ('skill_name' in data && data.skill_name === null) {
      data.skill_name = '';
    }

    convertPhoneNumber(data);

    this.submitForm.emit(data);
  }

  public setNullFields(metadata: any[], data: any) {
    metadata.forEach(el => {
      if (el.setNull && data[el.key]) {
        el.setNull.forEach((field: any) => {
          data[field] = null;
        });
      } else if (el.children) {
        this.setNullFields(el.children, data);
      }
    });
  }

  public eventHandler(e: CustomEvent): void {
    this.event.emit(e);

    if (
      e.type === 'change' ||
      e.type === 'reset' ||
      e.type === FormEvent.Change
    ) {
      this.changeValue.emit(this.form.value);
    }
    let key: string;
    if (e.el) {
      key = (e.el.type === 'related' ? e.el.key + '.id' : e.el.key) as string;
    }
    setTimeout(() => {
      if (e.el && e.el.formData) {
        if (
          (e.type === 'change' ||
            e.type === 'reset' ||
            e.type === 'create' ||
            e.type === 'blur') &&
          e.el &&
          e.el.key &&
          (e.el.key !== 'address' || e.el.updateFormData)
        ) {
          const newData = this.generateData(
            e.el.key,
            e.el.formData.getValue().data,
            e
          );
          this.fullData = newData;
          if (
            this.hiddenFields &&
            this.hiddenFields.observers.indexOf(key) > -1
          ) {
            this.parseConfig(this.hiddenFields.elements);
          }
          if (e.type !== 'reset') {
            e.el.formData.next({
              key: e.el.key,
              data: this.fullData,
              reset: e.manual && e.el.reset,
              manual: e.manual,
            });
          }
        }

        setTimeout(() => {
          if (!(<any>this.cd).destroyed) {
            this.cd.detectChanges();
          }
        }, 1000);
      }
    }, 50);
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

  public parseConfig(metadata: Field[]) {
    metadata.forEach((el: Field) => {
      this.checkHiddenFields(el);
      if (el.children) {
        this.parseConfig(el.children);
      }
    });
  }

  public buttonActionHandler(e: any) {
    this.buttonAction.emit({ ...e, data: this.form.value });
  }

  public checkHiddenFields(field: Field): void {
    const rule = field.showIf;
    const show = this.checkShowRules(rule as any[]);
    field.hidden?.next(!show);
  }

  public checkShowRules(rule: any[]): boolean {
    let approvedRules = 0;
    const rulesNumber = rule.length;
    const data = this.fullData;

    rule.forEach((el: any) => {
      if (typeof el === 'string') {
        const value = this.getValueByKey(el, data);

        if (value && value !== '0') {
          approvedRules += 1;
        } else {
          return;
        }
      } else if (el instanceof Object) {
        const key = Object.keys(el)[0];
        const targetValue = el[key];

        let value = this.getValueByKey(key, data);

        if (typeof targetValue === 'number') {
          value = parseFloat(value);
        }

        if (typeof targetValue === 'string' && targetValue[0] === '^') {
          if (value && value.includes(targetValue.slice(1))) {
            approvedRules += 1;
          }
        } else if (key === 'country_code') {
          const country_code = this.siteSettings.settings.country_code;
          if (country_code === targetValue) {
            approvedRules += 1;
          }
        } else if (value == targetValue) {
          approvedRules += 1;
        } else if (
          Array.isArray(targetValue) &&
          targetValue.some(el => el.toString() === value.toString())
        ) {
          approvedRules += 1;
        } else {
          return;
        }
      }
    });

    return approvedRules === rulesNumber;
  }

  public getValueByKey(key: string, data: any): any {
    const keysArray = key.split('.');
    const firstKey: string = keysArray.shift() as string;
    if (keysArray.length === 0) {
      return data && data[firstKey];
    } else if (keysArray.length > 0) {
      if (data[firstKey]) {
        return this.getValueByKey(keysArray.join('.'), data[firstKey]);
      }

      return null;
    }
  }

  public removeValuesOfHiddenFields(metadata: Field[], data: any): void {
    metadata.forEach((el: Field) => {
      if (el.hide && el.key && !el.saveField) {
        this.removeValue(el.key, data);
      }
    });
  }

  public removeValue(key: string, data: any): void {
    const keysArray = key.split('.');
    const firstKey: string = keysArray.shift() as string;
    if (keysArray.length === 0) {
      if (data) {
        delete data[firstKey];
      }
    } else if (keysArray.length > 0) {
      const combineKeys = keysArray.join('.');
      this.removeValue(combineKeys, data[firstKey]);
    }
  }

  public filterSendData(metadata: Field[], data: any) {
    metadata.forEach(el => {
      if (el.send === false && !el.saveField) {
        this.removeValue(el.key as string, data);
      } else if (el.children) {
        this.filterSendData(el.children, data);
      }
    });
  }

  public replaceByData(metadata: Field[], data: any) {
    metadata.forEach(el => {
      if (el.replaceByData) {
        const value = this.getValueByKey(el.key as string, data);

        if (value.id) {
          if (el.key === 'language') {
            data['language_id'] = value.id;
          }

          if (el.key === 'country') {
            data['country'] = value.id;
          }

          if (el.key === 'translations') {
            data['translations'] = value.id;
          }
        }
      } else if (el.children) {
        this.replaceByData(el.children, data);
      }
    });
  }

  keys(obj: any): string[] {
    return Object.keys(obj);
  }

  private trimWhiteSpace(data: Record<string, any>) {
    Object.keys(data).forEach(key => {
      const value = data[key];

      if (typeof value === 'string') {
        data[key] = value.trim();
      }

      if (is(Object, value)) {
        this.trimWhiteSpace(value);
      }
    });
  }

  private updateIfTimeCollapsed(
    formData: Record<string, any>,
    additionalData: Record<string, any>
  ) {
    if (additionalData && additionalData['times_collapsed']) {
      formData['break_ended_at'] = null;
      formData['break_started_at'] = null;
      formData['shift_ended_at'] = null;
      formData['shift_started_at'] = null;
    }

    return {
      ...formData,
    };
  }
}
