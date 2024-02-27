import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  HostListener,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { GenericFormService, FilterService } from '../../../services';
import {
  FilterService,
  GenericFormService,
  SiteSettingsService,
  UserService,
} from '@webui/core';

import { BehaviorSubject, combineLatest, Subject, merge, timer } from 'rxjs';
import {
  debounceTime,
  filter,
  takeUntil,
  distinctUntilChanged,
  switchMap,
  map,
  scan,
  finalize,
  skip,
  tap,
  delay,
} from 'rxjs/operators';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { checkAndReturnTranslation, FormatString } from '@webui/utilities';
import { Language } from '@webui/models';
import { CommonModule } from '@angular/common';
import {
  CheckboxComponent,
  FaIconComponent,
  SpinnerComponent,
} from '@webui/ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterHeaderComponent } from '../filter-header/filter-header.component';
import { ApiTranslatePipe } from '@webui/shared';

const listLimit = 10;

type FilterValue = {
  label: string;
  key: string;
  Default?: string;
};

@Component({
  standalone: true,
  selector: 'webui-filter-related',
  templateUrl: 'filter-related.component.html',
  styleUrls: ['./filter-related.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FilterHeaderComponent,
    TranslateModule,
    SpinnerComponent,
    FaIconComponent,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CheckboxComponent,
    ApiTranslatePipe,
  ],
})
export class FilterRelatedComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();
  private _value = new BehaviorSubject<FilterValue[] | null>(null);
  private _options = new BehaviorSubject<FilterOption[] | null>(null);
  private _offset = new BehaviorSubject<number>(0);
  private _loading = new BehaviorSubject<boolean>(false);
  private _active = new BehaviorSubject<boolean>(false);
  private _selectedOptions = new BehaviorSubject<FilterOption[]>([]);
  private _fetching = new BehaviorSubject<boolean>(false);

  private showDropdownMulitple = false;

  @Input() config!: any;

  @ViewChild('content') content?: ElementRef<HTMLDivElement>;
  @ViewChild('search') search?: ElementRef<HTMLInputElement>;

  modalScrollDistance = 2;
  modalScrollThrottle = 50;
  value = new Set<FilterOption | undefined>();
  limit = listLimit;
  searchControl = new FormControl(null);
  valueGroup = new FormGroup({});

  value$ = this._value.asObservable();
  options$ = this._options.asObservable();
  loading$ = this._loading.asObservable();
  fetching$ = this._fetching.asObservable();
  active$ = this._active
    .asObservable()
    .pipe(tap(value => value && this.search?.nativeElement.focus()));
  selectedOptions$ = this._selectedOptions.asObservable();
  hasQuery$ = combineLatest({
    active: this.active$,
    value: this.value$,
  }).pipe(map(value => Boolean(!value.active && value.value)));

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    private fs: FilterService,
    private route: ActivatedRoute,
    private genericFormService: GenericFormService,
    private elementRef: ElementRef,
    private siteSettingsService: SiteSettingsService,
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  get selectedElement(): (FilterOption | undefined)[] {
    return Array.from(this.value.values());
  }

  public ngOnInit() {
    if (this.config.multiple) {
      this.limit = -1;
    }

    this.active$
      .pipe(takeUntil(this._destroy), distinctUntilChanged(), skip(1))
      .subscribe(active => {
        if (!active) {
          if (this.config.multiple) {
            // TODO: implement start filter
          } else {
            this._options.next([]);
            this.cleanValueForm();
          }

          this.onChange(this._value.value);
        }
      });

    if (this.config.multiple) {
      this.valueGroup.valueChanges
        .pipe(takeUntil(this._destroy))
        .subscribe((value: any) => {
          this.value.clear();

          for (const id in value) {
            value[id] &&
              this.value.add(this._options.value?.find(el => el.key === id));
          }

          this._selectedOptions.next(
            this._options.value?.filter(el => this.value.has(el)) || []
          );
        });
    }

    this.selectedOptions$.pipe(takeUntil(this._destroy)).subscribe(options => {
      if (options.length) {
        this._value.next(options.map(option => option.value));
      } else {
        this._value.next(null);
      }

      if (!this.config.multiple) {
        this._active.next(false);
      }
    });

    this.route.queryParams
      .pipe(delay(200), takeUntil(this._destroy))
      .subscribe(() => {
        this.updateFilter();
      });

    this.fs.reset
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.updateFilter());
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  public onChange(value: FilterValue[] | null) {
    this.fs.generateQuery(
      value ? this.genericQuery(this.config.query, value) : '',
      this.config.key,
      this.config.listName,
      value ? value.map(el => el.key) : undefined
    );
    this.changeQuery(value);
  }

  public genericQuery(query: string, value: FilterValue[]) {
    const result = value.reduce(
      (acc, curr) => (acc += `${query}=${curr?.key}&`),
      ''
    );

    return result.substring(0, result.length - 1);
  }

  public changeQuery(value: FilterValue[] | null) {
    this.event.emit({
      list: this.config.listName,
      key: this.config.query,
      value,
    });
  }

  public updateFilter() {
    const data: { byQuery: boolean; query: string } | string[] =
      this.fs.getQueries(this.config.listName, this.config.key);

    if (data) {
      const keys: string[] = [];

      if (Array.isArray(data)) {
        data.forEach(el => keys.push(el));
      } else {
        const { byQuery, query = '' } = data;

        if (byQuery) {
          query.split('&').forEach((el: string) => keys.push(el.split('=')[1]));
        }
      }

      this._fetching.next(true);

      if (this.config.multiple) {
        const options$ = this._options.value
          ? this._options.asObservable()
          : this.getOptions(
              {
                search: '',
                offset: 0,
                initialize: true,
              },
              keys
            ).pipe(map(response => response.options));

        options$
          .pipe(tap(() => this._fetching.next(false)))
          .subscribe(options => {
            if (!this._options.value) {
              this._options.next(options);
            }
            this._selectedOptions.next(
              options?.filter(option => keys.includes(option.key)) || []
            );
          });
      } else {
        const request = this.config.queryParams
          ? this.genericFormService.get(
              this.config.data.endpoint,
              this.parseQueryParams(this.config.queryParams, keys[0])
            )
          : this.genericFormService.getByQuery(
              this.config.data.endpoint,
              `${keys[0]}/`
            );

        request
          .pipe(tap(() => this._fetching.next(false)))
          .subscribe(response => {
            if (response) {
              const { property } = this.config;

              const config = {
                ...this.config,
                countryCode: this.siteSettingsService.settings.country_code,
                lang: this.translateService.currentLang,
              };

              if (response.results) {
                const option = response.results.find(
                  (el: any) => el[this.config.data.key].toString() === keys[0]
                );

                this._selectedOptions.next([
                  new FilterOption(option, config, keys),
                ]);
              } else {
                const option = new FilterOption(response, config, keys);
                this._selectedOptions.next([option]);
              }
            }
          });
      }
    } else {
      this._selectedOptions.next([]);
      this._options.value?.forEach(option =>
        option.control.patchValue(false, { emitEvent: true })
      );
      this._value.next(null);
    }
  }

  public resetFilter() {
    this._active.next(false);
    this._selectedOptions.next([]);
    this._options.value?.forEach(option =>
      option.control.patchValue(false, { emitEvent: true })
    );
    this._value.next(null);
    this.fs.generateQuery('', this.config.key, this.config.listName, null);
    this.changeQuery(null);
  }

  getStyle() {
    const offsetHeight = this.content?.nativeElement.offsetHeight || 0;

    return {
      top: `${offsetHeight}px`,
    };
  }

  selectAll() {
    this.patchOptions(true);
  }

  resetAll() {
    this.patchOptions(false);
  }

  onScrollDown() {
    const currentOffset = this._offset.value;

    if (!this.config.multiple && !this.config.property) {
      this._offset.next(this.limit + currentOffset);
    }
  }

  onShowOptions() {
    this.showDropdownMulitple = !this.showDropdownMulitple;

    if (this._options.value?.length && this.config.multiple) {
      this._active.next(this.showDropdownMulitple);
      this.options$ = this._options.asObservable();
      return;
    }

    this.options$ = combineLatest({
      search: this.searchControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ),
      offset: this._offset.asObservable(),
    }).pipe(
      switchMap(({ search, offset }: any) =>
        this.getOptions({ search, offset })
      ),
      scan(
        (acc, curr) => {
          if (acc.search !== curr.search) {
            return curr;
          } else {
            return {
              search: acc.search,
              options: [...acc.options, ...curr.options],
            };
          }
        },
        { search: '', options: <FilterOption[]>[] }
      ),
      map(response => response.options),
      tap(options => this._options.next(options)),
      takeUntil(
        merge(
          this._destroy,
          this.active$.pipe(
            skip(1),
            filter(value => !value)
          )
        )
      )
    );

    this._active.next(true);

    setTimeout(() => {
      this._loading.next(true);
      this.searchControl.patchValue('' as any);
      this._offset.next(0);
    });
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = (clickedComponent as HTMLElement).parentNode;
    } while (clickedComponent);
    if (!inside) {
      if (this._active.value) {
        this._active.next(false);
      }
    }
  }

  private patchOptions(value: boolean) {
    this._options.value?.forEach(option => option?.control.patchValue(value));
  }

  private getOptions(
    params: {
      search: string;
      offset: number;
      initialize?: boolean;
    },
    selectedValues?: string[]
  ) {
    this._loading.next(true);

    const searchParam = this.config.searchParam || 'search';

    return this.genericFormService
      .get(this.config.data.endpoint, {
        [searchParam]: params.search,
        offset: params.offset,
        limit: this.config.multiple ? -1 : this.limit,
        fields: this.parseFields(),
        ...this.parseQueryParams(this.config.queryParams),
      })
      .pipe(
        takeUntil(
          this.active$.pipe(filter(el => (!params.initialize ? !el : false)))
        ),
        map(response => {
          const { property } = this.config;

          const config = {
            ...this.config,
            countryCode: this.siteSettingsService.settings.country_code,
            lang: this.translateService.currentLang,
          };

          if (this.config.property && response[this.config.property]) {
            const options: FilterOption[] = (
              response[property] as string[]
            ).map(el => new FilterOption(el, config, selectedValues));
            options.forEach(el => this.addValueControl(el));

            return { search: params.search, options };
          }

          if (response.results) {
            const options: FilterOption[] = response.results.map(
              (el: any) => new FilterOption(el, config, selectedValues)
            );

            options.forEach(el => this.addValueControl(el));

            return { search: params.search, options };
          }

          return { search: params.search, options: [] };
        }),
        finalize(() => this._loading.next(false))
      );
  }

  private addValueControl(el: FilterOption) {
    this.valueGroup.addControl(el.key, el.control, { emitEvent: false });

    if (!this.config.multiple) {
      this.subscribeOnChange(el.key, el.control);
    }
  }

  private cleanValueForm() {
    const controls: string[] = [];

    for (const prop in this.valueGroup.value) {
      controls.push(prop);
    }

    controls.forEach(key => this.valueGroup.removeControl(key));
  }

  private subscribeOnChange(id: string, control: FormControl) {
    control.valueChanges.subscribe(() => {
      const option = this._options.value?.find(el => el.key == id);

      if (option) {
        option.control.patchValue(false, { emitEvent: false });
        this._selectedOptions.next([option]);
      }
    });
  }

  private parseQueryParams(params: Record<string, string>, value = '') {
    const _queryParams: Record<string, string> = params || {};
    const query = this.fs.getQueryParams(this.config.listName);

    const queryParams: Record<string, string> = {};
    Object.keys(_queryParams).forEach(key => {
      const data = {
        company_settings: this.siteSettingsService.settings,
        session: this.userService.user,
        [this.config.data.key]: value,
        ...query,
      };

      queryParams[key] = FormatString.format(_queryParams[key], data);
    });

    return queryParams;
  }

  private parseFields(): string[] {
    const { value, key } = this.config.data;
    const keys = [key];

    if (Array.isArray(value)) {
      value.forEach((el: string) => {
        if (this.hasFormatBraces(el)) {
          // TODO: get keys from format string
        } else {
          keys.push(el);
        }
      });
    } else {
      keys.push(value);
    }

    return keys;
  }

  private hasFormatBraces(value: string) {
    return value.includes('{') && value.includes('}');
  }
}

class FilterOption {
  value: FilterValue;
  control: FormControl;
  key: string;

  constructor(payload: any, config: any, value?: string[]) {
    const { data, property, countryCode, lang, useValueForLabel } = config;
    const useProperty = Boolean(property);

    this.value = useProperty
      ? {
          label: payload,
          key: payload,
        }
      : {
          label: useValueForLabel
            ? payload
            : this.parseLabel(data.value, payload, countryCode, lang),
          key: payload[data.key]?.toString(),
          Default: useValueForLabel
            ? payload
            : this.parseLabel(data.value, payload, countryCode, lang, true),
        };
    this.key = useProperty ? payload : payload[data.key]?.toString();
    this.control = new FormControl(!!value && value.includes(this.key));
  }

  private hasFormatBraces(value: string) {
    return value.includes('{') && value.includes('}');
  }

  private parseLabel(
    display: string[] | string,
    data: any,
    countryCode: string,
    lang: string,
    useValue = false
  ) {
    if (Array.isArray(display)) {
      return display.reduce((acc: string, curr: any) => {
        if (this.hasFormatBraces(curr) && !useValue) {
          return acc || FormatString.format(curr, data);
        }

        return (
          acc ||
          checkAndReturnTranslation(data, countryCode, lang as Language) ||
          data[curr]
        );
      }, '');
    } else {
      return this.hasFormatBraces(display)
        ? FormatString.format(display, data)
        : data[display];
    }
  }
}
