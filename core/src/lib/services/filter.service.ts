import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FilterService {
  public _filters: Record<string, any> = {};
  public queries: any[] = [];
  public query: any;
  public _paramsOfFilters: Record<string, any> = {};
  public filterList: any[] = [];

  private _reset: Subject<any> = new Subject();

  get reset() {
    return this._reset.asObservable();
  }

  set filters(filters: Record<string, any>) {
    if (!this._filters[filters['endpoint']]) {
      this._filters[filters['endpoint']] = [];
      if (
        filters &&
        filters['list'] &&
        this.filterList.indexOf(filters['list'].list) < 0
      ) {
        this.filterList.push(filters['list'].list);
        filters['list'].filters.forEach((el: any) => {
          el.listName = filters['list'].list;
          el.endpoint = filters['endpoint'];
        });
        this.parseFilters(
          filters['list'].filters,
          this.paramsOfFilters,
          filters['list'].list
        );
        this._filters[filters['endpoint']].push(...filters['list'].filters);
      }
    }
  }

  set paramsOfFilters(params: Record<string, any>) {
    if (this._paramsOfFilters[params['param']]) {
      this._paramsOfFilters[params['param']] += `&${params['value']}`;
    } else {
      this._paramsOfFilters[params['param']] = params['value'];
    }
    const filters = this.getFiltersByEndpoint(params['endpoint']);
    if (filters) {
      this.parseFilters(filters, this.paramsOfFilters, params['list']);
    }
  }

  public getFiltersByEndpoint(endpoint: string) {
    return this._filters[endpoint];
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get paramsOfFilters() {
    return this._paramsOfFilters;
  }

  public getFiltersOfList(endpoint: string, name: string) {
    let result = [];
    if (endpoint && this._filters[endpoint]) {
      result = this._filters[endpoint].filter(
        (el: any) => el.listName === name
      );
      this.deleteFilters(this._filters[endpoint], name);
    }
    return result;
  }

  public deleteFilters(filters: any[], name: string) {
    filters.forEach(el => {
      if (el.listName === name) {
        filters.splice(filters.indexOf(el), 1);
        this.deleteFilters(filters, name);
      }
    });
    this.filterList.splice(this.filterList.indexOf(name), 1);
  }

  public getQuery(list: string) {
    return this.parseQueries(this.queries, list);
  }

  public generateQuery(query: string, key: string, list: string, value?: any) {
    if (this.queries.length > 0) {
      const el = this.queries.filter(elem => elem.list === list);
      if (el[0]) {
        el[0].keys[key] = { query, value };
      } else {
        this.queries.push({ list, keys: { [key]: { query, value } } });
      }
    } else {
      this.queries.push({
        list,
        keys: {
          [key]: {
            query,
            value,
          },
        },
      });
    }
  }

  public parseQueries(queries: any[], list: string) {
    let query = '';
    queries.forEach(el => {
      if (el.list === list) {
        const keys = Object.keys(el.keys);
        keys.forEach(elem => {
          if (el.keys[elem].query) {
            query += `${el.keys[elem].query}&`;
          }
        });
      }
    });
    query = query.substring(0, query.length - 1);
    return query;
  }

  public parseFilters(
    filters: any[],
    params: Record<string, any>,
    list: string
  ) {
    if (Object.keys(params).length > 0) {
      filters.forEach(el => {
        if (params[el.query]) {
          let query = '';
          if (params[el.query].indexOf('&') > -1) {
            const array = params[el.query].split('&');
            array.forEach((elem: string) => {
              query += `${el.query}=${elem}&`;
            });
            query = query.slice(0, -1);
          } else {
            query = `${el.query}=${params[el.query]}`;
          }
          this.generateQuery(query, el.key, list);
        } else if (el.input) {
          let query = '';
          el.input.forEach((elem: any) => {
            if (params[elem.query]) {
              query += `${elem.query}=${params[elem.query]}&`;
            }
          });
          if (query) {
            this.generateQuery(
              query.substring(0, query.length - 1),
              el.key,
              list
            );
          }
        }
      });
    }
  }

  public getQueries(list: string, filterName: string): any {
    let result;
    this.queries.forEach(el => {
      if (el.list === list && el.keys[filterName]) {
        if (el.keys[filterName].value) {
          result = el.keys[filterName].value;
        } else if (el.keys[filterName].query) {
          result = {
            byQuery: true,
            query: el.keys[filterName].query,
          };
        }
      }
    });
    return result;
  }

  public getQueryParams(list: string): Record<string, any> {
    const result: Record<string, any> = {};
    this.queries.forEach(el => {
      if (el.list !== list) {
        return;
      }

      Object.keys(el.keys).forEach((key: string) => {
        const { query, value } = el.keys[key];

        if (value) {
          result[key] = value;
        } else {
          const values = this.parseQueryString(query);

          result[key] = Object.values(values);
        }
      });
    });
    return result;
  }

  public resetQueries(list: string) {
    let result;
    this.queries.forEach(el => {
      if (el.list === list) {
        result = el;
      }
    });
    if (this.queries.indexOf(result) >= 0) {
      this.queries.splice(this.queries.indexOf(result), 1);
    }
    this._paramsOfFilters = {};
  }

  public resetFilters(list: string) {
    const listFilters = this.getQuery(list);

    this.queries.splice(this.queries.indexOf(listFilters), 1);
    this._reset.next(true);
  }

  public clean(endpoint: string, list: string) {
    if (this._filters[endpoint]) {
      this.deleteFilters(this._filters[endpoint], list);

      delete this._filters[endpoint];
    }

    this.resetQueries(list);
  }

  private parseQueryString(query: string) {
    const queryObject: Record<string, any> = {};

    query.split('&').forEach(param => {
      const paramArray = param.split('=');

      queryObject[paramArray[0]] = paramArray[1];
    });

    return queryObject;
  }
}
