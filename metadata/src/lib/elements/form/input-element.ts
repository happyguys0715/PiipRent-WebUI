import {
  BasicFormElement,
  BasicElementTemplateOptions,
} from './basic-form-element';

export const Input = 'input';

export enum InputType {
  Text = 'text',
  Picture = 'picture',
  Number = 'number',
}

export interface InputElementTemplateOptions
  extends BasicElementTemplateOptions {
  max?: unknown;
  type: InputType;
  step?: number;
  min?: unknown;
  display?: string;
  icon?: string;
  required: boolean;
  pattern?: string | RegExp;
  patternError?: string;
}

export class InputElement extends BasicFormElement {
  override templateOptions!: InputElementTemplateOptions;
  attributes?: Record<string, string>;

  constructor(key: string, label: string, type: InputType) {
    super(key, label, Input);

    this.templateOptions.type = type;
    this.templateOptions.required = false;
  }

  setNumberOptions(step: number, min?: number | string, max?: number | string) {
    this.templateOptions.step = step;
    this.templateOptions.min = min;
    this.templateOptions.max = max;

    return this;
  }

  setFormatOfValue(format: string) {
    this.templateOptions.display = format;

    return this;
  }

  setIcon(icon?: string) {
    this.templateOptions.icon = icon;

    return this;
  }

  setRequired() {
    this.templateOptions.required = true;

    return this;
  }

  setAttributes(attributes: Record<string, string>) {
    this.attributes = attributes;

    return this;
  }

  override updateTemplate(config: Partial<InputElementTemplateOptions>) {
    return super.updateTemplate(config);
  }

  setPattern(pattern: string | RegExp, message?: string) {
    this.templateOptions.pattern = pattern;
    this.templateOptions.patternError = message;

    return this;
  }
}
