import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, delay, Subject, takeUntil } from 'rxjs';

// import { FilterService } from '../../../services';

import { date as DateFilter } from '@webui/metadata';
import { Moment, Time, DateRange } from '@webui/time';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  CloseButtonComponent,
  DatepickerComponent,
  OverlayDropdownComponent,
  SvgIconComponent,
} from '@webui/ui';
import { forEach, keys } from 'ramda';
import { FilterHeaderComponent } from '../filter-header/filter-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FilterService } from '@webui/core';

type Params = Record<string, string>;

class DateControl {
  date = Time.now();
  key: 'from' | 'to';
  query: string;

  constructor(key: 'from' | 'to', query: string) {
    this.key = key;
    this.query = query;
  }
}

@Component({
  standalone: true,
  selector: 'webui-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FilterHeaderComponent,
    ReactiveFormsModule,
    TranslateModule,
    OverlayDropdownComponent,
    CloseButtonComponent,
    CommonModule,
    SvgIconComponent,
    DatepickerComponent,
  ],
})
export class FilterDateComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();
  private _hasQuery = new BehaviorSubject<boolean>(false);

  public config: any;
  public displayFormat = 'DD/MM/YYYY';
  public queryFormat = 'YYYY-MM-DD';

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  type = DateRange.Day;
  currentDate = Time.now();
  controls?: DateControl[];
  hasQuery$ = this._hasQuery.asObservable();

  form = this.fb.group({
    from: '',
    to: '',
  });

  constructor(
    private fs: FilterService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  public ngOnInit() {
    this.controls = this.config.input.map(
      (el: { key: 'from' | 'to'; query: string }) =>
        new DateControl(el.key, el.query)
    );

    this.route.queryParams
      .pipe(delay(200), takeUntil(this._destroy))
      .subscribe({
        next: () => {
          this.form.markAsUntouched();
          this.updateFilter();
        },
      });

    this.fs.reset
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.updateFilter(true));

    this.form.valueChanges.pipe(takeUntil(this._destroy)).subscribe(value => {
      if (this.form.touched) {
        this.onChange();
      }
    });
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  public selectQuery(item: any, event: MouseEvent) {
    event.preventDefault();

    const query = DateFilter.element.getQuery(this.config.key, item.query);
    const queryParams: Params = this.getParams(query);

    this.controls?.forEach(item => {
      if (item.query in queryParams) {
        this.setDate(item, Time.parse(queryParams[item.query]));
      }
    });
  }

  public onChange() {
    const queryParams: Params = {};

    if (this.controls) {
      forEach<DateControl>(item => {
        const key = item.key;
        if (this.form.controls[key].value) {
          queryParams[item.query] = item.date.format(this.queryFormat);
        }
      }, this.controls);

      this.fs.generateQuery(
        this.getQuery(queryParams),
        this.config.key,
        this.config.listName,
        {
          data: queryParams,
        }
      );

      this.changeQuery();
    }
  }

  public changeQuery() {
    this.event.emit({
      list: this.config.listName,
    });

    this.checkValue();
  }

  public updateFilter(reset?: boolean) {
    const data: {
      byQuery: boolean;
      query: string;
      data: Record<string, string>;
    } = this.fs.getQueries(this.config.listName, this.config.key);

    if (data) {
      const params = data.byQuery ? this.getParams(data.query) : data.data;

      this.controls?.forEach(item => {
        const value = params[item.query];

        if (item.query in params && value) {
          this.setDate(
            item,
            Time.parse(params[item.query], { format: this.queryFormat }),
            false
          );
        }
      });

      this.checkValue();
    } else {
      this._hasQuery.next(false);
      this.resetFilter(reset);
    }
  }

  public getParams(query: string): Params {
    const params = query.split('&');
    const result: Record<string, any> = {};

    params.forEach(param => {
      const parts = param.split('=');
      result[parts[0]] = parts[1];
    });

    return result;
  }

  public getQuery(params: Params): string {
    const keys = Object.keys(params);

    if (keys.length) {
      const quesries = keys.map(param => {
        return `${param}=${params[param]}`;
      });

      return quesries.join('&');
    }

    return '';
  }

  public getTranslateKey(type: string): string {
    return `filter.${this.config.key}.${type}`;
  }

  resetFilter(reset = false) {
    this.form.markAsTouched();
    this.form.patchValue(
      {
        from: '',
        to: '',
      },
      { emitEvent: !reset }
    );
  }

  setDate(
    item: DateControl,
    date: Moment | { start: Moment; end: Moment },
    emitEvent = true
  ) {
    if ('format' in date) {
      const queryDate = date.format(this.displayFormat);

      item.date = date;
      this.form.patchValue(
        {
          [item.key]: queryDate,
        },
        { emitEvent }
      );
    }
  }

  onOpen(dropdown: OverlayDropdownComponent) {
    dropdown.openDropdown();
  }

  clearInput(key: string) {
    this.form.patchValue({
      [key]: '',
    });
  }

  private checkValue() {
    const value = this.form.value;

    const hasQuery = keys(value).some(key => value[key]);

    this._hasQuery.next(hasQuery);
  }
}
