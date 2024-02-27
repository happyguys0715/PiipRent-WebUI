import { FilterModel } from './filter.model';

export interface CheckboxFilterOptions {
  key: string;
  label: string;
  query: string;
  multiple?: boolean;
  defaultValue?: any;
  values: { value: string | boolean; label: string; key?: string }[];
}

export const Checkbox = 'checkbox';

export class CheckboxFilter implements FilterModel {
  public type = Checkbox;

  public default: any;
  public key: string;
  public label: string;
  public query: string;
  public multiple: boolean;
  public options: { value: string | boolean; label: string; key?: string }[];

  constructor(options: CheckboxFilterOptions) {
    const {
      key,
      label,
      multiple = false,
      defaultValue = null,
      values = [],
    } = options;

    this.key = key;
    this.label = label;
    this.default = defaultValue;
    this.multiple = multiple;
    this.query = key.replace('.', '__');
    this.options = [...values];
  }
}
