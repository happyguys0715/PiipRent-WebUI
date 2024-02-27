import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SiteSettingsService } from '@webui/core';
import { CountryCodeLanguage } from '@webui/models';
import { checkAndReturnTranslation } from '@webui/utilities';
import { LocalStorageService } from 'ngx-webstorage';
import { CommonModule } from '@angular/common';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@webui/ui';

const translationMap = CountryCodeLanguage;

@Component({
  standalone: true,
  selector: 'webui-list-skills',
  templateUrl: 'list-skills.component.html',
  styleUrls: ['./list-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgbRating, TranslateModule, FaIconComponent],
})
export class ListSkillsComponent implements OnInit {
  public config: any;

  public colors: Record<number, string> = {
    0: '#bdbdbd',
    1: '#FA5C46',
    2: '#fc9183',
    3: '#FFA236',
    4: '#ffbf00',
    5: '#FFD042',
  };
  public countFields = [
    'candidate_scores.client_feedback',
    'candidate_scores.skill_score',
  ];
  public list!: boolean;
  public dataList!: any[];
  public more!: boolean;
  public evaluationCount!: string;

  constructor(
    private siteSetting: SiteSettingsService,
    private storage: LocalStorageService
  ) {}

  public ngOnInit() {
    const { value } = this.config;

    if (Array.isArray(value)) {
      this.list = true;

      value.forEach(el => {
        const { country_code } = this.siteSetting.settings;
        const lang = this.storage.retrieve('lang');
        const {
          skill: { name },
        } = el;
        el.skill.__str__ = checkAndReturnTranslation(name, country_code, lang);
      });

      if (value && value.length > 4) {
        this.dataList = value.slice(0, 4);
        this.more = true;
      } else {
        this.dataList = [...value];
      }
    } else {
      if (this.config.value && this.countFields.includes(this.config.name)) {
        const values = (this.config.value as string).split(' ');

        this.config.value = values[0];
        this.evaluationCount = values[1];
      }
    }
  }

  public getScore(score: string) {
    return Math.floor(parseFloat(score));
  }

  public showMore(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    this.dataList = this.config.value;
    this.more = false;

    return false;
  }
}
