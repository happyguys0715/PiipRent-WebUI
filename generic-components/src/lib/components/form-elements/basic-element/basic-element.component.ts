import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ITemplateOptions } from '@webui/metadata';

export class BasicElementComponent {
  public group!: FormGroup;
  public key: any;
  public config: any;
  public event = new EventEmitter();

  get templateOptions(): ITemplateOptions | undefined {
    return this.config.templateOptions;
  }

  public addControl(config: any, fb: FormBuilder, ...validators: any[]) {
    if (config.key) {
      const keys = config.key.split('.');
      if (keys.length > 1) {
        this.addControls(this.group, keys, fb, validators);
      } else {
        if (
          config.type === 'related' &&
          !config.many &&
          !config.withoutIdField
        ) {
          keys.push('id');
          this.addControls(this.group, keys, fb, validators);
        } else if (
          config.type !== 'static' ||
          (config.type === 'static' && !config.read_only)
        ) {
          this.group.addControl(
            config.key,
            fb.control(undefined, this.getValidators(validators))
          ); //tslint:disable-line
          this.key = config.key;
        }
      }
    }
  }

  public addFlags(element: any, config: any, control?: FormControl) {
    const { nativeElement } = element;
    const { type, required, max, min, cols, rows, disabled, step, pattern } =
      config.templateOptions;

    nativeElement.required = config.type !== 'datepicker' && required;

    if (type === 'number') {
      nativeElement.step = step ? step + '' : 1;
    }
    if (max && type !== 'number') {
      nativeElement.maxLength = max;
    }
    if (min && type !== 'number') {
      nativeElement.minLength = min < 0 ? 0 : min;
    }
    if (max && (type === 'number' || type === 'score')) {
      nativeElement.max = max;
      control?.addValidators(Validators.max(max));
    }
    if ((min || min === 0) && (type === 'number' || type === 'score')) {
      nativeElement.min = min;
      control?.addValidators(Validators.min(min));
    }
    if (cols) {
      nativeElement.cols = cols;
    }
    if (disabled) {
      nativeElement.disabled = disabled;
    }
    if (rows) {
      nativeElement.rows = rows;
    }
    if (pattern) {
      control?.addValidators(Validators.pattern(pattern));
    }
  }

  public createEvent() {
    this.event.emit({
      type: 'create',
      el: this.config,
      value:
        this.config.key === 'id'
          ? { id: this.group.get(this.key)?.value }
          : this.group.get(this.key)?.value,
    });
  }

  protected inDefaultValue(key: string) {
    return this.config.default.includes(key);
  }

  private addElement(
    group: FormGroup,
    el: string,
    fb: FormBuilder,
    validators: any[]
  ) {
    group.addControl(el, fb.control('', this.getValidators(validators)));
  }

  private addGroup(group: FormGroup, el: string, fb: FormBuilder) {
    group.addControl(el, fb.group({}));
  }

  private addControls(
    group: FormGroup,
    keys: string[],
    fb: FormBuilder,
    validators: any[]
  ) {
    const el: string = keys.shift() as string;
    if (keys.length === 0) {
      if (!group.get(el)) {
        this.addElement(group, el, fb, validators);
      }
      this.key = el;
      this.group = group;
    } else if (!group.get(el)) {
      this.addGroup(group, el, fb);
      this.addControls(group.get(el) as FormGroup, keys, fb, validators);
    } else {
      this.addControls(group.get(el) as FormGroup, keys, fb, validators);
    }
  }

  private getValidators(options: any[]): ValidatorFn[] {
    const [required, min, max, pattern] = options;

    const result = [];

    if (required) {
      result.push(Validators.required);
    }
    if (typeof min === 'number') {
      result.push(Validators.min(min));
    }
    if (typeof max === 'number') {
      result.push(Validators.max(max));
    }
    if (pattern) {
      result.push(Validators.pattern(pattern));
    }

    return result;
  }
}
