import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { getContactAvatar, getValueOfData } from '@webui/utilities';
// import { getValueOfData } from '../../../helpers';
import { CommonModule } from '@angular/common';
import { FaIconComponent, InfoComponent, TooltipDirective } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
// import { InfoComponent } from '../../info/info.component';

const defaultImage: Record<string, string> = {
  client: '/assets/img/logo.svg',
  contact: '/assets/img/avatar.png',
};

@Component({
  standalone: true,
  selector: 'webui-list-info',
  templateUrl: 'list-info.component.html',
  styleUrls: ['./list-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FaIconComponent,
    InfoComponent,
    TranslateModule,
    TooltipDirective,
  ],
})
export class ListInfoComponent implements OnInit {
  config: any;
  picture!: string;
  available!: boolean;
  title!: string;
  address!: string;
  description!: string;
  status!: any[];
  averageScore: any;
  averageScoreDescription: any;
  contactAvatar!: string;
  job_title!: string;
  company!: string;
  position!: string;
  color: any;
  colorAttr!: string;
  className: any;
  statusList!: any[];
  more!: boolean;
  isDefaultImage!: boolean;
  colors: Record<number, string> = {
    0: '#bdbdbd',
    1: '#FA5C46',
    2: '#fc9183',
    3: '#FFA236',
    4: '#ffbf00',
    5: '#FFD042',
  };
  hideAvailability!: boolean;

  public ngOnInit() {
    if (this.config.values) {
      const keys: (keyof ListInfoComponent)[] = Object.keys(
        this.config.values
      ) as (keyof ListInfoComponent)[];

      this.averageScore = this.config.value.average_score;

      keys.forEach((key: keyof ListInfoComponent) => {
        if (key === 'status') {
          this[key] = this.getValue(
            this.config.values[key].field,
            this.config.value
          );

          if (this[key].length > 4) {
            this.statusList = this[key].slice(0, 4);

            this.more = true;
          } else {
            this.statusList = this[key];
          }

          this.color = this.config.values[key].color;
          this.colorAttr = this.config.values[key].color_attr;
        } else if (key === 'picture') {
          const value = this.getValue(
            this.config.values[key],
            this.config.value
          );

          if (value) {
            this[key] = value;
            return;
          }

          const defaultImageKey = this.config.companyPicture
            ? 'client'
            : this.config.hideTitle
            ? 'contact'
            : null;
          this[key] = defaultImage[defaultImageKey as string];
          this.isDefaultImage = true;
        } else {
          this[key] = this.getValue(
            this.config.values[key],
            this.config.value
          ) as never;
        }
      });

      if (this.picture == null) {
        this.contactAvatar = getContactAvatar(this.title || this.job_title);
      }
    }

    if (this.config.value) {
      this.generateAverageScoreTooltip(this.config.value);
    }
  }

  public generateAverageScoreTooltip(data: any) {
    const scores = [
      { label: 'Loyalty', key: 'candidate_scores.loyalty' },
      { label: 'Client feedback', key: 'candidate_scores.client_feedback' },
      { label: 'Avarage test', key: 'candidate_scores.recruitment_score' },
      { label: 'Reliability', key: 'candidate_scores.reliability' },
      { label: 'Average skill', key: 'candidate_scores.skill_score' },
    ];

    this.averageScoreDescription = {
      includes: this.filterScores(scores, data, 'includes'),
      excludes: this.filterScores(scores, data),
    };
  }

  public isCandidatePage(): boolean {
    if (this.config.value && this.config.value instanceof Object) {
      return 'average_score' in this.config.value;
    }

    return false;
  }

  public filterScores(scores: any[], data: any, type?: string) {
    return scores.filter(el => {
      getValueOfData(data, el.key, el);
      const score = this.getScore(el.value);
      el.score = el.value;

      return type === 'includes' ? score : !score;
    });
  }

  public getValue(key: string, data: any): any {
    if (typeof key === 'string') {
      const keys = key.split('.');
      const prop: string = keys.shift() as string;

      if (!keys.length) {
        return data[prop];
      } else if (data[prop]) {
        return this.getValue(keys.join('.'), data[prop]);
      }
    } else {
      return key;
    }
  }

  public checkClass(item: any) {
    let className;
    if (this.color && this.colorAttr) {
      const keys = Object.keys(this.color);

      keys.forEach(key => {
        className =
          this.color[key].indexOf(item[this.colorAttr]) > -1 ? key : 'success';
      });
    }

    return className || 'success';
  }

  public showMore(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.statusList = this.status;
    this.more = false;

    return false;
  }

  public getScore(score: string) {
    return Math.floor(parseFloat(score));
  }
}
