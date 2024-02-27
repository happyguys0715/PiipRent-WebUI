import { BasicListElement } from './basic-list-element';

export const Select = 'select';

export class SelectElement extends BasicListElement {
  override values?: any;
  color?: any;

  constructor(field: string) {
    super(field, Select);
  }

  override setValues(values: any) {
    this.values = { ...values };

    return this;
  }

  setColors(colors: any) {
    this.color = { ...colors };

    return this;
  }

  setTranslateKey(key: string) {
    this.translateKey = key;

    return this;
  }
}
