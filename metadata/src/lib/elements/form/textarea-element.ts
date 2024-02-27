import {
  BasicFormElement,
  BasicElementTemplateOptions,
} from './basic-form-element';

export const Textarea = 'textarea';

type TextareaTemplateOptions = {
  full?: boolean;
  rows?: number;
  autofocus?: boolean;
};

export class TextareaElement extends BasicFormElement {
  override templateOptions!: BasicElementTemplateOptions &
    TextareaTemplateOptions;

  constructor(key: string, label: string) {
    super(key, label, Textarea);
  }

  setFullWidth() {
    this.templateOptions.full = true;

    return this;
  }

  setRows(rows: number) {
    this.templateOptions.rows = rows;

    return this;
  }

  setAutofocus() {
    this.templateOptions.autofocus = true;

    return this;
  }
}
