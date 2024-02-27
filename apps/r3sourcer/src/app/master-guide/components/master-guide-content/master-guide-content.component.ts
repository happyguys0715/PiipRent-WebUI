import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { GuideItem } from '../../interfaces';
import { FormatString } from '@webui/utilities';
import { UserService } from '@webui/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@webui/ui';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'webui-master-guide-content',
  templateUrl: './master-guide-content.component.html',
  styleUrls: ['./master-guide-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FaIconComponent, FormsModule, RouterLink],
})
export class MasterGuideContentComponent implements OnInit {
  @Input()
  guide!: GuideItem[];

  @Output()
  updateEvent: EventEmitter<{
    value: any;
    item: GuideItem;
    type: string;
  }> = new EventEmitter();

  constructor(private userService: UserService) {}

  ngOnInit() {
    const format = new FormatString();

    this.guide.forEach(el => {
      el.text.forEach(item => {
        if (item.url) {
          item.url = format.format(
            item.url,
            this.userService.user?.data.contact as any
          );
        }
      });
    });
  }

  isArray() {
    return Array.isArray;
  }

  update(value: any, item: GuideItem) {
    this.updateEvent.emit({
      type: 'purpose',
      value,
      item,
    });
  }
}
