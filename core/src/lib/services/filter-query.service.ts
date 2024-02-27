import { Injectable } from '@angular/core';

export type FilterType =
  | 'date'
  | 'checkbox'
  | 'related'
  | 'select'
  | 'text'
  | 'multiple'
  | 'range';

@Injectable()
export class FilterQueryService {
  public generateQueryOf(
    type: FilterType,
    filter: Record<string, any>
  ): string {
    if ('default' in filter) {
      switch (type) {
        case 'checkbox':
          return this.parseCheckboxQuery(filter);

        default:
          return '';
      }
    }

    return '';
  }

  private parseCheckboxQuery(config: Record<string, any>) {
    if (config['default']) {
      return `${config['query']}=${config['default']}`;
    }

    return '';
  }
}
