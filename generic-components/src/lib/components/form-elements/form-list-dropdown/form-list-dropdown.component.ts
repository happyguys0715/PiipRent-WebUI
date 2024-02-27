import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { FormatString } from '@webui/utilities';

// import { GenericFormService, FormMode } from '../../../services';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormElementViewComponent } from '../form-element-view/form-element-view.components';
import { FormMode } from '@webui/models';
import { GenericFormService } from '@webui/core';

@Component({
  standalone: true,
  selector: 'webui-form-list-dropdown',
  templateUrl: './form-list-dropdown.component.html',
  styleUrls: ['./form-list-dropdown.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    DropdownComponent,
    FormElementViewComponent,
  ],
})
export class FormListDropdownComponent implements OnInit, OnDestroy {
  config: any;

  displayValue!: string;

  // Dropdown
  list!: any[];
  editList!: any[];
  initList!: any[];
  showDropdown = false;
  loading!: boolean;
  count!: number;
  limit = 10;
  offset = 0;
  searchValue = '';

  display!: string;
  endpoint!: string;
  editEndpoint!: string;

  _mode!: FormMode;
  private viewSubscription!: Subscription;

  get isViewMode() {
    return this._mode === FormMode.View;
  }

  get isEditMode() {
    return this._mode === FormMode.Edit;
  }

  constructor(
    private gfs: GenericFormService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    let formData = { ...this.config.formData.value.data };
    if (typeof formData.id === 'object') {
      formData = { ...formData, id: formData.id.id };
    }
    this.viewSubscription = this.subscribeOnViewModeChanges(this.config);
    this.display = this.config.templateOptions.display;
    this.endpoint = FormatString.format(this.config.endpoint, formData);
    this.editEndpoint = FormatString.format(this.config.editEndpoint, formData);

    this.gfs.get(this.endpoint).subscribe(res => {
      this.count = res.count;
      this.list = this.updateList(res.results);
      this.initList = [...this.list];
      this.getEditList();
    });
  }

  ngOnDestroy() {
    this.viewSubscription.unsubscribe();
  }

  getEditList() {
    this.gfs.get(this.editEndpoint, { limit: -1 }).subscribe(res => {
      this.editList = res.results;

      this.displayValue = FormatString.format(
        this.display,
        this.getDisplayValue(res.results, this.config.field)
      );
    });
  }

  subscribeOnViewModeChanges(config: {
    mode: Subject<FormMode>;
  }): Subscription {
    return config.mode.subscribe(mode => {
      this._mode = mode;
    });
  }

  getDisplayValue<T>(data: Array<T>, field: keyof T): T {
    return data.find(el => el[field]) || ({} as T);
  }

  updateList(data: any[]): any[] {
    return data.map(el => {
      return {
        ...el,
        __str__: FormatString.format(this.display, el),
      };
    });
  }

  onShowDropdown() {
    this.list = [...this.initList];
    this.showDropdown = true;
  }

  onSearch(value: string) {
    this.loading = true;
    this.searchValue = value;
    this.gfs
      .get(this.endpoint, { search: value })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(res => {
        this.count = res.count;
        this.offset = 0;
        this.list = this.updateList(res.results);
      });
  }

  onSet(value: any) {
    const editEl = this.editList.find(el => {
      const elParam = FormatString.format(
        this.config.templateOptions.param,
        el
      );
      const valueParam = FormatString.format(
        this.config.templateOptions.param,
        value
      );

      return elParam === valueParam;
    });

    if (!editEl) {
      const body = {
        language_id: value.language.alpha_2,
        contact_id: this.config.formData.value.data.contact.id,
        default: true,
      };

      this.gfs.submitForm(this.editEndpoint, body).subscribe(res => {
        this.getEditList();
        this.showDropdown = false;
        this.offset = 0;
        this.searchValue = '';
        this.displayValue = FormatString.format(
          this.display,
          this.getDisplayValue([res], this.config.field)
        );
      });
    } else {
      const endpoint =
        this.editEndpoint +
        FormatString.format(this.config.templateOptions.param, value);

      this.gfs.updateForm(endpoint, this.config.setData).subscribe(data => {
        this.getEditList();
        this.showDropdown = false;
        this.offset = 0;
        this.searchValue = '';
        this.displayValue = FormatString.format(
          this.display,
          this.getDisplayValue([data], this.config.field)
        );
      });
    }
  }

  onUploadMore() {
    this.offset += this.limit;

    const params = {
      offset: this.offset,
      limit: this.limit,
      search: this.searchValue,
    };

    this.gfs.get(this.endpoint, params).subscribe(res => {
      this.list = [...this.list, ...this.updateList(res.results)];
    });
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: MouseEvent) {
    let clickedComponent = event.target;
    let inside = false;
    if (this.elementRef) {
      do {
        if (clickedComponent === this.elementRef.nativeElement) {
          inside = true;
        }
        clickedComponent = (clickedComponent as HTMLElement).parentNode;
      } while (clickedComponent);
      if (!inside) {
        this.showDropdown = false;
      }
    }
  }
}
