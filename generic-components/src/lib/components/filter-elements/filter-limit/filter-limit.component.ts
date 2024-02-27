import {
  Component,
  OnInit,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// import { FilterService } from '../../../services';
import { NgForOf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { FilterHeaderComponent } from '../filter-header/filter-header.component';
import { FilterService } from '@webui/core';

@Component({
  standalone: true,
  selector: 'webui-filter-limit',
  templateUrl: 'filter-limit.component.html',
  styleUrls: ['./filter-limit.component.scss'],
  imports: [FilterHeaderComponent, NgForOf, TranslateModule, FormsModule],
})
export class FilterLimitComponent implements OnInit, OnDestroy {
  public config: any;
  public event!: EventEmitter<any>;

  public query!: string;
  public inputs!: any[];

  private filterSubscription!: Subscription;
  private querySubscription!: Subscription;

  constructor(
    private fs: FilterService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(param => {
      setTimeout(() => {
        if (!(this.cd as any).destroyed) {
          this.updateFilter();
        }
      }, 200);
    });
    this.filterSubscription = this.fs.reset.subscribe(() => this.updateFilter);
  }

  public ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  public onChange() {
    let query = '';

    this.inputs.forEach(input => {
      if (input.data || input.data === 0) {
        query += `${input.query}=${input.data}&`;
      }
    });

    this.query = query.slice(0, query.length - 1);

    this.fs.generateQuery(this.query, this.config.key, this.config.listName, {
      data: this.inputs,
      query: this.query,
    });
    this.emitChange();
  }

  public resetFilter() {
    this.query = '';
    this.inputs = this.inputs.map(input =>
      Object.assign({}, input, { data: null })
    );
    this.fs.generateQuery(this.query, this.config.key, this.config.listName);
    this.emitChange();
  }

  private emitChange() {
    this.event.emit({
      list: this.config.listName,
    });
  }

  private updateFilter() {
    const data = this.fs.getQueries(this.config.listName, this.config.key);
    if (data) {
      if (data.byQuery) {
        this.query = data.query;
        this.parseQuery(data.query);
      } else {
        this.inputs = data.data;
        this.query = data.query;
      }
    } else {
      this.query = '';
      this.createInputs();
    }
  }

  private parseQuery(query: string) {
    if (!this.inputs) {
      this.createInputs();
    }

    const queryObject = this.parseQueryString(query);

    this.inputs.forEach(input => {
      input.data = queryObject[input.query];
    });
  }

  private createInputs() {
    this.inputs = this.config.input.map((input: any) => {
      return Object.assign({}, input, { data: null });
    });
  }

  private parseQueryString(query: string): any {
    const queryObject: Record<string, any> = {};

    query.split('&').forEach(param => {
      const paramArray = param.split('=');

      queryObject[paramArray[0]] = paramArray[1];
    });

    return queryObject;
  }

  public getTranslateKey(type: string): string {
    return `filter.${this.config.key}.${type}`;
  }
}
