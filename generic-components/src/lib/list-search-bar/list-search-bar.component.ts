import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { FilterService } from '@webui/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-list-search-bar',
  templateUrl: './list-search-bar.component.html',
  styleUrls: ['./list-search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TranslateModule],
})
export class ListSerachBarComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();
  @Input() public count!: string;
  @Input() public label!: string;
  @Input() public list!: string;
  @Input() public param!: string;

  @Output() public event = new EventEmitter<{ list: string }>();

  public searchValue!: string;
  private type = 'search';

  constructor(private fs: FilterService, private route: ActivatedRoute) {}

  public ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.updateSearchBar());
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  public search() {
    this.fs.generateQuery(
      `${this.param || 'search'}=${this.searchValue}`,
      this.type,
      this.list,
      {
        data: this.searchValue,
        query: this.searchValue,
      }
    );
    this.changeQuery();
  }

  private changeQuery() {
    this.event.emit({ list: this.list });
  }

  private updateSearchBar() {
    const filterData = this.fs.getQueries(this.list, this.type);

    if (filterData) {
      const { byQuery, query, data } = filterData;
      this.searchValue = byQuery ? (query as string).split('=')[1] : data;
    } else {
      this.searchValue = '';
    }
  }
}
