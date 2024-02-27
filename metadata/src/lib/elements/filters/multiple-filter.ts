import { FilterModel } from './filter.model';

export interface MultipleFilterOptions {
  key: string;
  label: string;
  query: string;
  values?: { value: string; label: string; key?: string }[];
  unique?: string[];
  data?: { [key: string]: string };
}

export const Multiple = 'multiple';

export class MultipleFilter implements FilterModel {
  public type = Multiple;

  public key: string;
  public label: string;
  public query: string;
  public param: string;
  public unique: string[];
  public display: string;
  public data?: { [key: string]: string };
  public preset: boolean;

  constructor(options: MultipleFilterOptions) {
    const { key, label, query, unique, data } = options;

    this.key = key;
    this.label = label;
    this.query = query;
    this.unique = unique ? [...unique] : [];
    this.data = data;

    this.display = '__str__';
    this.param = '{id}';
    this.preset = true;
  }
}
