import { FilterModel } from './filter.model';

export interface RangeFilterOptions {
  key: string;
  label: string;
  min?: number;
  max?: number;
  defaultValue?: any;
  from?: string;
  to?: string;
}

export const Range = 'range';

export class RangeFilter implements FilterModel {
  public type = Range;

  public default: any;
  public key: string;
  public label: string;
  public min: number | null;
  public max: number | null;
  public input: { label: string; query: string; key: string }[];

  constructor(options: RangeFilterOptions) {
    const {
      key,
      label,
      min = null,
      max = null,
      defaultValue = null,
      from = 'From',
      to = 'To',
    } = options;

    this.key = key;
    this.label = label;
    this.min = min;
    this.max = max;
    this.default = defaultValue;
    this.input = [
      {
        label: from || 'From',
        query: `${key.replace('.', '__')}_0`,
        key: 'from',
      },
      {
        label: to || 'To',
        query: `${key.replace('.', '__')}_1`,
        key: 'to',
      },
    ];
  }
}
