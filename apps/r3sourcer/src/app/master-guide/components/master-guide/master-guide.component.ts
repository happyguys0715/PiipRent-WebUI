import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GuideItem } from '../../interfaces';
import { guide } from './master-guide.config';
import { MasterGuideService } from '../../services';
import {
  updateGuide,
  SiteSettingsService,
  EventService,
  EventType,
} from '@webui/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@webui/ui';
import { MasterGuideIconComponent } from '../master-guide-icon/master-guide-icon.component';
import { MasterGuideContentComponent } from '../master-guide-content/master-guide-content.component';

@Component({
  standalone: true,
  selector: 'webui-master-guide',
  templateUrl: './master-guide.component.html',
  styleUrls: ['./master-guide.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    FaIconComponent,
    MasterGuideIconComponent,
    MasterGuideContentComponent,
  ],
  providers: [MasterGuideService],
})
export class MasterGuideComponent implements OnInit, OnDestroy {
  guide!: GuideItem[];

  showPlaceholder!: boolean;
  showContent!: boolean;
  inactiveIcon!: boolean;
  skiped!: boolean;

  private sub!: Subscription;

  constructor(
    private masterGuideService: MasterGuideService,
    private siteSettings: SiteSettingsService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.inactiveIcon = false;
    this.getGuide();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  togglePlaceholder() {
    this.showPlaceholder = !this.showPlaceholder;
  }

  onShowContent() {
    this.showContent = true;
    this.showPlaceholder = false;
    this.inactiveIcon = true;
  }

  skipGuide() {
    this.skiped = true;
  }

  minimize() {
    this.showContent = false;
    this.inactiveIcon = false;
    this.showPlaceholder = true;
  }

  getProgress() {
    return (
      (this.guide.filter(el => el.completed).length / this.guide.length) * 100
    );
  }

  update({ value, item, type }: any) {
    if (type === 'purpose') {
      const id = this.siteSettings.companyId;

      this.masterGuideService
        .changePurpose(id as string, value)
        .subscribe(() => {
          item.value = value;
          this.eventService.emit(EventType.PurposeChanged);
        });
    }
  }

  getGuide() {
    this.masterGuideService.getGuide().subscribe((res: any) => {
      const complete = Object.keys(res).every(key => res[key]);

      if (!complete) {
        if (!this.sub) {
          this.sub = updateGuide.subscribe(() => {
            this.getGuide();
          });
        }

        this.guide = guide.map(item => {
          if (item.key === 'purpose') {
            item.value = res.purpose;
          }

          return {
            ...item,
            completed: res[item.key],
          };
        });
      }
    });
  }
}
