import { FilterModel } from './filter.model';

export interface SelectFilterOptions {
  key: string;
  label: string;
  defaultValue?: any;
  values: { value: string | number; label: string; key?: string }[];
}

export const Select = 'select';

export class SelectFilter implements FilterModel {
  public type = Select;

  public default: any;
  public key: string;
  public label: string;
  public query: string;
  public options: { value: string | number; label: string; key?: string }[];

  constructor(options: SelectFilterOptions) {
    const { key, label, defaultValue = null, values = [] } = options;

    this.key = key;
    this.label = label;
    this.default = defaultValue;
    this.query = key.replace('.', '__');
    this.options = [...values];
  }
}
