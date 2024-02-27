import { BehaviorSubject } from 'rxjs';
import { Field } from '../../models';

export interface BasicElementTemplateOptions {
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export class BasicFormElement {
  key: string;
  type: string;

  mode?: BehaviorSubject<string>;
  hidden?: BehaviorSubject<boolean>;
  formData?: BehaviorSubject<{ data: any }>;

  default?: any;
  read_only?: boolean;
  value?: any;
  hide?: boolean;
  send?: boolean;
  setNull?: string[];
  width?: number;
  showIf?: Array<string | { [key: string]: any }>;
  saveField?: boolean;
  updateFromForm?: boolean;
  translateKey?: string;
  intl?: boolean;

  templateOptions: BasicElementTemplateOptions;

  constructor(key: string, label: string, type: string) {
    this.key = key;
    this.type = type;
    this.templateOptions = {
      label,
      description: '',
    };
  }

  updateModel(config: Field) {
    Object.assign(this, config);

    return this;
  }

  updateTemplate(config: BasicElementTemplateOptions) {
    Object.assign(this.templateOptions, config);

    return this;
  }

  required() {
    this.templateOptions.required = true;

    return this;
  }

  readOnly() {
    this.read_only = true;

    return this;
  }

  updateByNull(fields: string[]) {
    this.setNull = [...fields];

    return this;
  }

  setWidth(width: number) {
    this.width = width;

    return this;
  }

  doNotSend() {
    this.send = false;

    return this;
  }

  setShowIfRule(showIf: Array<string | { [key: string]: any }>) {
    this.showIf = [...showIf];

    return this;
  }

  saveValue() {
    this.saveField = true;

    return this;
  }

  setDefaultValue(value: any) {
    this.default = value;

    return this;
  }

  hideField() {
    this.hide = true;

    return this;
  }

  setUpdateFromForm() {
    this.updateFromForm = true;

    return this;
  }

  setTranslateKey(key: string) {
    this.translateKey = key;

    return this;
  }

  setIntl() {
    this.intl = true;

    return this;
  }
}
