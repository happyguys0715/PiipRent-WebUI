import { Component, OnInit } from '@angular/core';

import { checkAndReturnTranslation, FormatString } from '@webui/utilities';
import { SiteSettingsService } from '@webui/core';
import { LocalStorageService } from 'ngx-webstorage';
import { NgClass, NgForOf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-list-tags',
  templateUrl: 'list-tags.component.html',
  styleUrls: ['./list-tags.component.scss'],
  imports: [NgForOf, NgClass, TranslateModule],
})
export class ListTagsComponent implements OnInit {
  public config: any;

  public display!: string;
  public tags!: any[];

  public color: any;
  public colorAttr!: string;

  constructor(
    private siteSettings: SiteSettingsService,
    private storage: LocalStorageService
  ) {}

  public ngOnInit() {
    this.display = this.config.display || '{__str__}';
    this.tags = this.config.value;

    this.tags.forEach(el => {
      const { tag } = el;
      const { country_code } = this.siteSettings.settings;
      const lang = this.storage.retrieve('lang');

      el.__str__ = checkAndReturnTranslation(tag || el, country_code, lang);

      if (this.config.translateKey) {
        el.__str__ = FormatString.format(this.config.translateKey, el);
      }
    });

    this.color = this.config.color;
    this.colorAttr = this.config.color_attr;
  }

  public checkClass(item: any) {
    if (this.config.outline) {
      let className;
      if (this.color && this.colorAttr) {
        const keys = Object.keys(this.color);

        keys.forEach(key => {
          className =
            this.color[key].indexOf(item[this.colorAttr]) > -1
              ? key
              : 'success';
        });
      }

      return className || 'success';
    }

    return '';
  }
}
