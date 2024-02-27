import { FilterModel } from './filter.model';

export interface TextFilterOptions {
  key: string;
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
}

export const Text = 'text';

export class TextFilter implements FilterModel {
  public type = Text;

  public default: any;
  public key: string;
  public label: string;
  public min: number | null;
  public max: number | null;
  public query: string;

  constructor(options: TextFilterOptions) {
    const { key, label, defaultValue = 0, min = null, max = null } = options;

    this.key = key;
    this.label = label;
    this.min = min;
    this.max = max;
    this.query = key.replace('.', '__');
    this.default = defaultValue;
  }
}
