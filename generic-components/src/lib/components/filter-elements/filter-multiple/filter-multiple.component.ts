import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// import { FilterService } from '../../../services';
import { FormatString } from '@webui/utilities';
import { DATE_TIME_FORMAT, Time } from '@webui/time';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { FilterHeaderComponent } from '../filter-header/filter-header.component';
import { FilterService } from '@webui/core';

enum FilterType {
  Multiple = 'multiple',
}

@Component({
  standalone: true,
  selector: 'webui-filter-multiple',
  templateUrl: './filter-multiple.component.html',
  styleUrls: ['./filter-multiple.component.scss'],
  imports: [
    FilterHeaderComponent,
    NgForOf,
    FormsModule,
    CheckboxComponent,
    TranslateModule,
  ],
})
export class FilterMultipleComponent implements OnInit, OnDestroy {
  public config: any;
  public query!: string;
  public data!: any[];
  public type!: string;
  public filterSubscription!: Subscription;
  public querySubscription!: Subscription;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    private fs: FilterService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.type = this.config.type === FilterType.Multiple ? 'data' : 'options';
    this.querySubscription = this.route.queryParams.subscribe(params => {
      setTimeout(() => {
        if (!(this.cd as any).destroyed) {
          this.updateFilter();
        }
      }, 200);
    });
    this.filterSubscription = this.fs.reset.subscribe(() =>
      this.updateFilter()
    );
    if (!this.data) {
      this.createData(this.type);
    }
    if (this.config.unique) {
      this.checkUniqueValues(this.config.unique, this.data, true);
      this.fs.generateQuery(
        this.genericQuery(this.config.query, this.data),
        this.config.key,
        this.config.listName,
        this.data
      );
    }
    // if (this.config.default) {
    //   const index = this.data.findIndex(el => el.data === this.config.default);
    //   if (this.data[index]) {
    //     this.data[index].checked = true;
    //     this.fs.generateQuery(
    //       this.genericQuery(this.config.query, this.data),
    //       this.config.key,
    //       this.config.listName,
    //       this.data
    //     );
    //   }
    // }

    // this.updateSelectedItems();
  }

  public ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  // updateSelectedItems() {
  //   if (this.config.type === FilterType.Multiple) {
  //     const { selected_shift } = this.fs._paramsOfFilters;

  //     if (selected_shift) {
  //       const targetEl = this.data.find(
  //         (el) => el.data && el.data.id === selected_shift
  //       );

  //       if (!targetEl) {
  //         return;
  //       }

  //       const index = this.data.indexOf(targetEl);

  //       this.data.forEach((el) => {
  //         if (targetEl !== el) {
  //           el.checked = false;
  //         }
  //       });

  //       this.onChange(index);
  //     }
  //   }
  // }

  public createData(type: string) {
    this.data = this.config[type].map((data: any) => {
      return {
        label: type === 'data' ? data[this.config.display] : data.label,
        query: this.config.query,
        param: this.config.param,
        checked: type === 'data' ? true : false,
        data: type === 'data' ? data : data.value,
        key: data.key,
      };
    });
  }

  public onChange(index: number, first?: boolean) {
    this.checkUniqueValues(this.config.unique, this.data, first, index);
    if (!this.config.multiple && this.config.type === 'checkbox') {
      this.data.forEach((item, i) => {
        if (index !== i) {
          item.checked = false;
        }
      });
    }
    this.fs.generateQuery(
      this.genericQuery(this.config.query, this.data),
      this.config.key,
      this.config.listName,
      this.data
    );
    this.changeQuery();
  }

  public genericQuery(query: string, data: any[]) {
    const format = new FormatString();
    let result = '';
    if (data) {
      data.forEach(el => {
        if (el.checked) {
          if (el.query instanceof Object) {
            const queries = Object.keys(el.query);
            queries.forEach(item => {
              result += `${item}=${format.format(el.query[item], el.data)}&`;
            });
          } else {
            if (el.param) {
              result += `${query}=${format.format(el.param, el.data)}&`;
            } else {
              result += `${query}=${el.data}&`;
            }
          }
        }
      });
    }
    this.query = result.slice(0, result.length - 1);
    return this.query;
  }

  public changeQuery() {
    this.event.emit({
      list: this.config.listName,
    });
  }

  public parseQuery(query: string) {
    const format = new FormatString();
    this.query = query;
    if (this.data) {
      this.data.forEach(el => {
        if (el.query instanceof Object) {
          const keys = Object.keys(el.query);
          let result;
          keys.forEach(item => {
            result = `${item}=${format.format(el.query[item], el.data)}`;
            el.checked = query.indexOf(result) > -1;
          });
        } else {
          if (el.param) {
            const result = `${el.query}=${format.format(el.param, el.data)}`;
            el.checked = query.indexOf(result) > -1;
          } else {
            el.checked = query.indexOf(`${el.query}=${el.data}`) > -1;
          }
        }
      });
      this.fs.generateQuery(
        this.genericQuery(this.config.query, this.data),
        this.config.key,
        this.config.listName,
        this.data
      );
    }
  }

  public updateFilter() {
    this.query = '';
    const data = this.fs.getQueries(this.config.listName, this.config.key);
    if (data) {
      if (data.byQuery) {
        if (!this.data) {
          this.createData(this.type);
        }

        this.parseQuery(data.query);
      } else {
        this.data = data;

        this.query = this.genericQuery(this.config.query, this.data);
      }
    } else {
      if (!this.data) {
        this.createData(this.type);
      }
      this.resetValues();
    }
    this.cd.detectChanges();
  }

  public checkUniqueValues(
    unique: any[],
    data: any[],
    first?: boolean,
    index?: number
  ) {
    if (unique) {
      const uniqueField: Record<string, any> = {};
      unique.forEach(field => {
        if (index !== undefined && index !== null) {
          data.forEach((el, i) => {
            if (el.checked && i === index) {
              uniqueField[field] = [].concat(el.data[field]);
            }
          });
        }

        data.forEach((el, i) => {
          if (!uniqueField[field]) {
            uniqueField[field] = [];
          }

          const condition = () => {
            if (field === 'name' && el.data.date) {
              const currentValue = Time.parse(el.data[field], {
                format: DATE_TIME_FORMAT,
              });

              return uniqueField[field].some((name: any) => {
                const elValue = Time.parse(name, { format: DATE_TIME_FORMAT });
                return Math.abs(elValue.diff(currentValue, 'hours')) < 4;
              });
            } else {
              return uniqueField[field].indexOf(el.data[field]) > -1;
            }
          };

          if (condition()) {
            if (i !== index) {
              el.checked = false;
            }
          } else {
            if (first && this.config.preset) {
              el.checked = true;
            }
            if (el.checked) {
              uniqueField[field].push(el.data[field]);
            }
          }
        });
      });
    }
  }

  public resetValues() {
    this.data.forEach(el => {
      el.checked = false;
    });
  }

  public resetFilter() {
    this.resetValues();
    this.fs.generateQuery(
      this.genericQuery(this.config.query, this.data),
      this.config.key,
      this.config.listName,
      this.data
    );
    this.changeQuery();
  }

  public getTranslateKey(type: string): string {
    return `filter.${this.config.key}.${type}`;
  }
}
