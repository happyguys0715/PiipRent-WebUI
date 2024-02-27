import { FilterModel } from './filter.model';

export interface RelatedFilterOptions {
  key: string;
  label: string;
  endpoint: string;

  multiple?: boolean;
  defaultValue?: unknown | null;
  query?: string;
  display?: string | string[];
  parameter?: string;
  property?: string; // For not list response
  queryParams?: Record<string, string>;
  searchParam?: string;
  useValueForLabel?: boolean;
}

export const Related = 'related';

export class RelatedFilter implements FilterModel {
  public type = Related;

  public default: unknown | null;
  public key: string;
  public label: string;
  public query: string;
  public multiple?: boolean;
  public property?: string;
  public data: {
    value: string | string[];
    endpoint: string;
    key: string;
  };
  public queryParams?: Record<string, string>;
  public searchParam: string;
  public useValueForLabel: boolean;

  constructor(payload: RelatedFilterOptions) {
    this.key = payload.key;
    this.label = payload.label;
    this.property = payload.property;
    this.query = payload.query || this.key;
    this.default = payload.defaultValue || null;
    this.multiple = payload.multiple || false;
    this.data = {
      value: this.parseDisplay(payload.display),
      endpoint: payload.endpoint,
      key: payload.parameter || 'id',
    };
    this.queryParams = payload.queryParams;
    this.searchParam = payload.searchParam || 'search';
    this.useValueForLabel = payload.useValueForLabel || false;
  }

  private parseDisplay(display?: string | string[]) {
    if (!display) {
      return ['__str__'];
    }

    return Array.isArray(display) ? display : [display];
  }
}
