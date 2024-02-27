import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sort, SortData } from '@webui/models';

@Injectable()
export class SortService {
  private _stream = new BehaviorSubject<SortData>({});

  get stream$(): Observable<SortData> {
    return this._stream.asObservable();
  }

  private initialized!: boolean;

  public init(data: SortData): void {
    if (!this.initialized) {
      this.initialized = true;
      this.next(data);
    }
  }

  public getSortQuery(params: SortData): string {
    const entries = Object.entries(params);

    const queryMap = entries.map(entry => {
      const [name, sort] = entry;
      const prefix = sort === Sort.DESC ? '-' : '';
      return `${prefix}${name}`;
    });

    return queryMap.length ? `ordering=${queryMap.join(',')}` : '';
  }

  updateWith(key: string): void {
    const currentState = this.getCurrentState();
    const nextValue = this.getNextValue(key);

    if (!nextValue) {
      delete currentState[key];
      return this.next({});
    }

    this.next({ [key]: nextValue });
  }

  public getCurrentState(): SortData {
    return this._stream.getValue();
  }

  public getSortData(config: any[]): SortData {
    const result: Record<string, any> = {};

    config.forEach(el => {
      if (el.sorted) {
        result[el.sort_field] = el.sorted;
      }

      if (el.sortMap) {
        el.sortMap.forEach((item: any) => {
          if (item.sorted) {
            result[item.param] = item.sorted;
          }
        });
      }
    });

    return result;
  }

  private getNextValue(key: string): Sort | undefined {
    const currentState = this.getCurrentState();
    const currentSortValue = currentState[key];

    switch (currentSortValue) {
      case Sort.ASC:
        return Sort.DESC;
      case Sort.DESC:
        return;
      default:
        return Sort.ASC;
    }
  }

  private next(data: SortData): void {
    this._stream.next(data);
  }
}
