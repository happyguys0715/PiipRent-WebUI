import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { SiteSettingsService, TranslateHelperService } from '@webui/core';
import { checkAndReturnTranslation } from '@webui/utilities';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-list-skill-activity',
  templateUrl: './list-skill-activity.component.html',
  styleUrls: ['./list-skill-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ListSkillActivityComponent implements OnInit, OnDestroy {
  config: any;
  list!: boolean;
  more!: boolean;

  private _dataList: BehaviorSubject<any[] | null> = new BehaviorSubject<
    any[] | null
  >(null);
  private langSubscription!: Subscription;

  get dataList$() {
    return this._dataList.asObservable();
  }

  constructor(
    private siteSetting: SiteSettingsService,
    private storage: LocalStorageService,
    private translate: TranslateHelperService
  ) {}

  public ngOnInit() {
    this.initViewData();

    this.langSubscription = this.translate.langChange$.subscribe(() => {
      this.initViewData();
    });
  }

  public ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }

  public showMore(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    this._dataList.next([...this.config.value]);
    this.more = false;

    return false;
  }

  private initViewData() {
    const { value } = this.config;

    if (Array.isArray(value)) {
      this.list = true;

      value.forEach(el => {
        const {
          worktype: { __str__, translations },
        } = el;
        const { country_code } = this.siteSetting.settings;
        const lang = this.storage.retrieve('lang');

        el.__str__ = checkAndReturnTranslation(
          {
            name: {
              translations,
              name: __str__,
            },
          },
          country_code,
          lang
        );
      });

      if (value && value.length > 4) {
        this._dataList.next(value.slice(0, 4));
        this.more = true;
      } else {
        this._dataList.next([...value]);
      }
    }
  }
}
