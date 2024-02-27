import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DropdownOption, IRelatedObject } from '../models/dropdown.model';

interface FetchResponse {
  count: number;
  results: IRelatedObject[];
  message: string;
}

export interface FetchError {
  error: string;
}

@Injectable()
export class DropdownService {
  private readonly limit = 10;
  private offset = 0;
  private count: number | undefined = undefined;

  constructor(private http: HttpClient) {}

  public fetchOptions(
    url: string,
    params: { [key: string]: unknown } = {}
  ): Observable<DropdownOption[] | undefined> {
    if (typeof this.count === 'number') {
      this.offset += this.limit;

      if (this.offset > this.count) {
        return of(undefined);
      }
    }

    const httpParams: HttpParams = new HttpParams({
      fromObject: {
        ...params,
        limit: this.limit,
        offset: this.offset,
      },
    });

    return this.http.get<FetchResponse>(url, { params: httpParams }).pipe(
      catchError(response => {
        return throwError({
          error: response.errors.error,
        });
      }),
      map((response: FetchResponse) => {
        this.count = response.count;

        return response.results.map(element =>
          DropdownOption.fromRelatedObject(element)
        );
      })
    );
  }

  public clearPagination() {
    this.count = undefined;
    this.offset = 0;
  }

  public get hasMoreItems(): boolean {
    return !this.count || this.count > this.offset;
  }
}
