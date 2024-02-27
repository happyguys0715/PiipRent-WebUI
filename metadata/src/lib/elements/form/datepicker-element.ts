import {
  BasicFormElement,
  BasicElementTemplateOptions,
} from './basic-form-element';

export const Datepicker = 'datepicker';

export enum DatepickerType {
  Date = 'date',
  Time = 'time',
  Datetime = 'datetime',
}

interface DatepickerElementTemplateOptions extends BasicElementTemplateOptions {
  type: DatepickerType;
  showTime?: boolean;
  hidePreviewError?: boolean;
}

export class DatepickerElement extends BasicFormElement {
  override templateOptions!: DatepickerElementTemplateOptions;

  inline?: boolean;
  rightPosition: boolean;

  constructor(key: string, label: string, type: DatepickerType) {
    super(key, label, Datepicker);

    this.templateOptions.type = type;
    this.rightPosition = true;
  }

  setInline() {
    this.inline = true;

    return this;
  }

  setShowTime() {
    this.templateOptions.showTime = true;

    return this;
  }

  setDropdownLeft() {
    this.rightPosition = false;

    return this;
  }

  override updateTemplate(
    config: Partial<DatepickerElementTemplateOptions>
  ): this {
    return super.updateTemplate(config);
  }
}
