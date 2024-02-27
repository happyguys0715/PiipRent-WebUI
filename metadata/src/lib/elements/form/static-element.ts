import {
  BasicFormElement,
  BasicElementTemplateOptions,
} from './basic-form-element';

export const Static = 'static';

export enum StaticType {
  Score = 'score',
}

export interface StaticElementTemplateOptions
  extends BasicElementTemplateOptions {
  color?: string;
  inline?: boolean;
  type?: StaticType;
  danger?: string;
}

export class StaticElement extends BasicFormElement {
  override templateOptions!: StaticElementTemplateOptions;

  constructor(key: string, label: string, type?: StaticType) {
    super(key, label, Static);

    this.templateOptions.type = type;
  }

  setColor(color: string) {
    this.templateOptions.color = color;

    return this;
  }

  inlineValue() {
    this.templateOptions.inline = true;

    return this;
  }

  setDanger(value: string) {
    this.templateOptions.danger = value;

    return this;
  }
}
