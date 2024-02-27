import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getTranslationKey } from '@webui/utilities';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Sort, SortData } from '@webui/models';
import { SortService } from '@webui/core';

type ListColumnHeaderConfig = {
  delim: string;
  label: string;
  name: string;
  sort: boolean;
  sort_field: string;
  sortMap: Array<{
    name: string;
    param: string;
    sorted: Sort;
  }>;
};

class MultipleOption {
  constructor(
    public label: string,
    public name: string,
    public sort: boolean,
    public icon$?: Observable<IconName>,
    public sorted?: Sort,
    public param?: string
  ) {}
}

@Component({
  standalone: true,
  selector: 'webui-list-column-header',
  templateUrl: 'list-column-header.component.html',
  styleUrls: ['list-column-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FaIconComponent, TranslateModule],
})
export class ListColumnHeaderComponent implements OnInit {
  @Input() public config!: ListColumnHeaderConfig;

  hasMultipleNames!: boolean;
  multipleNamesData!: MultipleOption[];
  icon$!: Observable<IconName>;
  translationKey!: string;

  @Output() public sortChange: EventEmitter<void> = new EventEmitter();

  private icons: Record<Sort, IconName> = {
    [Sort.DEFAULT]: 'sort',
    [Sort.ASC]: 'sort-up',
    [Sort.DESC]: 'sort-down',
  };

  constructor(private sortService: SortService) {}

  ngOnInit() {
    this.translationKey = getTranslationKey(this.config.name, 'label');

    if (this.config.sortMap) {
      this.hasMultipleNames = true;
      this.generateMultipleNames();
    } else if (this.config.sort) {
      this.icon$ = this.sortService.stream$.pipe(
        map(
          (data: SortData) =>
            this.icons[data[this.config.sort_field]] || this.icons[Sort.DEFAULT]
        )
      );
    }
  }

  onSort(event: MouseEvent, options: MultipleOption | ListColumnHeaderConfig) {
    event.preventDefault();

    if (!options.sort) {
      return;
    }

    if (options instanceof MultipleOption) {
      this.sortService.updateWith(options?.param as string);
    } else {
      this.sortService.updateWith(this.config.sort_field);
    }

    this.sortChange.emit();
  }

  public convertToIcon(icon: any): IconName | string {
    if (typeof icon === 'string') {
      return icon as IconName;
    }

    return '';
  }

  private generateMultipleNames() {
    const { name, label, sortMap } = this.config;

    const names = name.split('/').map(el => el.replace(/_/g, ''));
    const labels = label.split('/').map(el => el.trim());

    this.multipleNamesData = names.map((name: string, index: number) => {
      let sorted;
      let param: any;

      const sortData = sortMap.find(el => el.name === name);
      const iconStream$ = this.sortService.stream$.pipe(
        map(
          (data: SortData) =>
            this.icons[data[param]] || this.icons[Sort.DEFAULT]
        )
      );

      if (sortData) {
        sorted = sortData.sorted;
        param = sortData.param;
      }

      return new MultipleOption(
        labels[index],
        name,
        !!sortData,
        iconStream$,
        sorted,
        param
      );
    });
  }
}
