import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import * as nouislider from 'nouislider';
import wnumb from 'wnumb';

// import { FilterService } from './../../../services';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { FilterHeaderComponent } from '../filter-header/filter-header.component';
import { FilterService } from '@webui/core';

@Component({
  standalone: true,
  selector: 'webui-filter-range',
  templateUrl: 'filter-range.component.html',
  imports: [
    FilterHeaderComponent,
    FormsModule,
    CheckboxComponent,
    TranslateModule,
  ],
})
export class FilterRangeComponent implements OnInit, OnDestroy, AfterViewInit {
  public config: any;
  public query!: string;
  public data: any;
  public slider: any;
  public noUiSlider: any;
  public toggle!: boolean;

  public filterSubscription!: Subscription;
  public querySubscription!: Subscription;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    private fs: FilterService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.slider = nouislider;
  }

  public ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(() => {
      setTimeout(() => {
        if (!(this.cd as any).destroyed) {
          this.updateFilter();
        }
      }, 200);
    });
    this.filterSubscription = this.fs.reset.subscribe(() =>
      this.updateFilter()
    );
  }

  public ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  public onChange() {
    this.fs.generateQuery(
      this.genericQuery(this.config.query, this.data),
      this.config.key,
      this.config.listName,
      this.data
    );
    this.changeQuery();
  }

  public ngAfterViewInit() {
    const rangePicker = document.getElementById('slider');

    if (rangePicker && !this.noUiSlider) {
      const wNumb = wnumb;

      this.noUiSlider = this.slider.create(rangePicker, {
        start: [80],
        step: 10,
        connect: 'lower',
        tooltips: wNumb({ decimals: 0, suffix: 'km' }),
        range: {
          min: this.config.min,
          max: this.config.max,
        },
      });

      if (this.noUiSlider) {
        this.noUiSlider.set(this.data + '');
      }

      this.noUiSlider.on('set.one', (e: any) => {
        const value = parseInt(e[0], 10);
        if (this.data !== value) {
          this.data = value;

          this.onChange();
        }
      });
    }
  }

  public toggleRange(event: any) {
    if (!event) {
      this.resetFilter();
    }
  }

  public genericQuery(query: string, data: string) {
    let result = '';
    if (data) {
      result = `${query}=${data}`;
    }
    this.query = result;
    return result;
  }

  public changeQuery() {
    this.event.emit({
      list: this.config.listName,
    });
  }

  public updateFilter() {
    this.data = '';
    this.query = '';
    const data = this.fs.getQueries(this.config.listName, this.config.key);
    if (data) {
      this.toggle = true;

      if (data.byQuery) {
        this.query = data.query;
        this.data = +data.query.split('=')[1];
      } else {
        this.data = data;
      }

      this.fs.generateQuery(
        this.genericQuery(this.config.query, this.data),
        this.config.key,
        this.config.listName,
        this.data
      );

      if (this.noUiSlider) {
        this.noUiSlider.set(this.data + '');
      }
    } else {
      this.toggle = false;
    }
  }

  public resetFilter() {
    this.query = '';
    this.data = this.config.default || 0;
    this.toggle = false;
    if (this.noUiSlider) {
      this.noUiSlider.set(this.data + '');
    }
    this.fs.generateQuery('', this.config.key, this.config.listName);
    this.changeQuery();
  }
}
