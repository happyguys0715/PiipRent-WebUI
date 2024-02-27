import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  merge,
  Subject,
  takeUntil,
} from 'rxjs';

// import { FilterService } from '../../../services';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FilterHeaderComponent } from '../filter-header/filter-header.component';
import { FilterService } from '@webui/core';

type Option = {
  label: string;
  value: string;
};

@Component({
  standalone: true,
  selector: 'webui-filter-select',
  templateUrl: 'filter-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FilterHeaderComponent,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class FilterSelectComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();
  private _options = new BehaviorSubject<any>(null);

  public config: any;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  control = new FormControl('');

  options$ = this._options.asObservable();
  hasQuery$ = this.control.valueChanges.pipe(map(value => Boolean(value)));

  constructor(private fs: FilterService, private route: ActivatedRoute) {}

  public ngOnInit() {
    this._options.next([...this.config.options]);
    this.control.patchValue(this.config.default || '');

    merge(this.route.queryParams, this.fs.reset)
      .pipe(delay(200), takeUntil(this._destroy))
      .subscribe(() => this.updateFilter());

    this.control.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this._destroy))
      .subscribe(value => {
        this.onChange(value as string);
      });
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  public onChange(value: string) {
    this.fs.generateQuery(
      this.genericQuery(this.config.query, value),
      this.config.key,
      this.config.listName,
      value
    );
    this.changeQuery();
  }

  public genericQuery(query: string, data: string) {
    return data ? `${query}=${data}` : '';
  }

  public changeQuery() {
    this.event.emit({
      list: this.config.listName,
    });
  }

  public parseQuery(query: string) {
    const value = query.split('=')[1];

    this.control.patchValue(value);
  }

  public updateFilter() {
    const data = this.fs.getQueries(this.config.listName, this.config.key);

    if (data) {
      if (data.byQuery) {
        this.parseQuery(data.query);
      } else {
        this.control.patchValue(data);
      }
    } else {
      this.control.patchValue('');
    }
  }

  public resetFilter() {
    this.fs.generateQuery('', this.config.key, this.config.listName);
    this.control.patchValue('');
  }

  public getTranslateKey(type: string): string {
    return `filter.${this.config.key}.${type}`;
  }
}
