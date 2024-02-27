import {
  BasicFormElement,
  BasicElementTemplateOptions,
} from './basic-form-element';

export const Checkbox = 'checkbox';

export enum CheckboxType {
  Checkbox = 'checkbox',
  Icon = 'icon',
  Button = 'button',
  Text = 'text',
}

export interface CheckboxElementTemplateOptions
  extends BasicElementTemplateOptions {
  type: CheckboxType;
  values: { [key: string]: string };
}

export class CheckboxElement extends BasicFormElement {
  override templateOptions!: CheckboxElementTemplateOptions;

  constructor(key: string, label: string, type: CheckboxType) {
    super(key, label, Checkbox);

    this.templateOptions.type = type;
  }

  setValues(values: { [key: string]: string }) {
    this.templateOptions.values = { ...values };

    return this;
  }
}
