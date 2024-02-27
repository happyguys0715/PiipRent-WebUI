import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { EventService, EventType, SiteSettingsService } from '@webui/core';
import { FormatString } from '@webui/utilities';
import { CommonModule } from '@angular/common';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { TranslateModule } from '@ngx-translate/core';
import {
  CloseButtonComponent,
  FaIconComponent,
  SpinnerComponent,
} from '@webui/ui';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { DialogRef, DialogType, Status } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-action-element',
  templateUrl: 'action-element.component.html',
  styleUrls: ['./action-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SubscriptionRequiredDirective,
    TranslateModule,
    SpinnerComponent,
    CloseButtonComponent,
    FormsModule,
    FaIconComponent,
  ],
})
export class ActionElementComponent implements OnChanges {
  @Input() public config: any;
  @Input() public count!: number;
  @Input() public actionProcess!: boolean;

  public closeResult!: string;
  public data: any;
  public label!: string;
  public modalRef!: DialogRef;

  @Output() public event: EventEmitter<any> = new EventEmitter();

  public action: any = {};

  public constructor(
    private siteSettings: SiteSettingsService,
    private eventService: EventService
  ) {}

  public ngOnChanges() {
    this.data = {
      count: this.count,
    };
    const format = new FormatString();
    this.label = format.format(this.config.button_label, this.data);
  }

  public toDoAction() {
    if (this.action && this.action.confirm) {
      this.open();
    } else if (this.action && !this.action.confirm) {
      this.event.emit({
        action: this.action,
      });
    }
  }

  public open() {
    this.eventService.emit(EventType.OpenDialog, {
      type: DialogType.ConfirmAction,
      onInit: (dialogRef: DialogRef) => (this.modalRef = dialogRef),
      options: {
        data: {
          message: this.action.message,
          accept: this.config.agree_label,
          decline: this.config.decline_label,
        },
      },
    });

    this.modalRef.closed.subscribe(result => {
      if (result === Status.Accept) {
        this.event.emit({
          action: this.action,
        });
        this.action = {};
      }
    });
  }

  public getSmsTitle(endpoint: string): string {
    return this.isDisableSmsButton(endpoint)
      ? this.siteSettings.smsActionDisabledMessage()
      : '';
  }

  public isDisableSmsButton(endpoint = ''): boolean {
    if (endpoint.indexOf('sendsms') !== -1) {
      return !this.siteSettings.isSmsEnabled();
    }

    return false;
  }
}
