import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SiteSettingsService } from '@webui/core';
import { Endpoints } from '@webui/models';
import { getTranslationKey } from '@webui/utilities';
import {
  HasPermissionDirective,
  SubscriptionRequiredDirective,
} from '@webui/shared';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@webui/ui';

type Action = 'sendSMS' | 'add_object' | 'poped_table';

interface Button {
  label: string;
  endpoint: string;
  action: Action;
}

@Component({
  standalone: true,
  selector: 'webui-list-buttons',
  templateUrl: 'list-buttons.component.html',
  styleUrls: ['./list-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HasPermissionDirective,
    RouterLink,
    TranslateModule,
    SubscriptionRequiredDirective,
    FaIconComponent,
  ],
})
export class ListButtonsComponent {
  @Input()
  public buttons!: Button[];

  @Input()
  public first!: boolean;

  @Input()
  public inForm!: boolean;

  @Input()
  public list!: string;

  @Input()
  public poped!: boolean;

  @Input() public allowPermissions!: string[];
  @Input() public endpoint!: string;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  get convertedEndpoint(): Endpoints {
    return this.endpoint as Endpoints;
  }

  get company() {
    return this.siteSettings.getCompanyName();
  }

  get buttonConfig() {
    return {
      title: '',
      label: '',
      disabled: '',
    };
  }

  get instanceLabel() {
    return getTranslationKey(this.list, 'label');
  }

  constructor(private siteSettings: SiteSettingsService) {}

  onAction(action: Action) {
    const isSMSAction = action === 'sendSMS';

    if (isSMSAction && !this.siteSettings.isSmsEnabled()) {
      return;
    }

    this.event.emit({
      type: action,
    });
  }

  hasPermission(permission: 'post') {
    return this.allowPermissions.includes(permission);
  }

  getButtonConfig(button: Button) {
    const isSMSAction = button.action === 'sendSMS';

    return {
      title:
        isSMSAction && !this.siteSettings.isSmsEnabled()
          ? this.siteSettings.smsActionDisabledMessage
          : '',
      disabled: isSMSAction && !this.siteSettings.isSmsEnabled(),
    };
  }
}
