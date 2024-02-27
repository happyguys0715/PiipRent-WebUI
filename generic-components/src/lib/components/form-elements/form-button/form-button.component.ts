import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { SiteSettingsService } from '@webui/core';
// import { generateCssStyles } from '../../../helpers';
import { CommonModule } from '@angular/common';
import { DateFormatPipe, SubscriptionRequiredDirective } from '@webui/shared';
import { FaIconComponent, SpinnerComponent, TooltipDirective } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { generateCssStyles } from '@webui/utilities';

@Component({
  standalone: true,
  selector: 'webui-form-button',
  templateUrl: 'form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SubscriptionRequiredDirective,
    FaIconComponent,
    TranslateModule,
    SpinnerComponent,
    DateFormatPipe,
    TooltipDirective,
  ],
})
export class FormButtonComponent implements OnInit, OnDestroy {
  private stylePrefix = 'app-button';

  public config: any;
  public group!: FormGroup;
  public label!: boolean;
  public replacyValue!: string;
  public buttonColor!: string;
  public repeatArray!: any[];
  public showButton = true;
  public last!: boolean;

  public isDisabled?: boolean;
  public disabledTitle!: string;
  public saveProcess!: boolean;

  public cssClasses = '';
  public buttonClass = '';
  public textClass = '';

  public subscriptions: Subscription[] = [];

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  constructor(
    private siteSettings: SiteSettingsService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    const replace_by = this.config.replace_by;
    const templateOptions = this.config.templateOptions;

    if (replace_by) {
      if (replace_by instanceof Object) {
        this.replacyValue = replace_by.__str__;
      } else {
        this.replacyValue = replace_by;
      }
    }
    if (this.config.repeat && templateOptions.icon) {
      this.repeatArray = new Array(this.config.repeat);
    } else if (templateOptions.icon) {
      this.repeatArray = [''];
    }
    this.checkHiddenProperty();
    this.checkShowProperty();
    this.customizeButton();

    if (this.config.process) {
      const processSubscription = this.config.process.subscribe(
        (value: boolean) => {
          this.saveProcess = value;
          this.cd.detectChanges();
        }
      );

      this.subscriptions.push(processSubscription);
    }

    this.isDisabled = this.checkSmsDisabled(this.config.endpoint);
    this.disabledTitle = this.getSmsTitle(this.isDisabled);
    this.cssClasses = generateCssStyles(
      this.config.styles,
      this.stylePrefix
    )[0];
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public checkHiddenProperty() {
    const hidden = this.config.hidden;

    if (hidden && hidden.subscribe) {
      const hiddenSubscription = hidden.subscribe((hide: boolean) => {
        this.showButton = !hide;

        this.cd.detectChanges();
      });

      this.subscriptions.push(hiddenSubscription);
    } else if (hidden) {
      this.showButton = false;
    }
  }

  public checkShowProperty() {
    const show = this.config.show;

    if (show && show.subscribe) {
      this.config.hidden = true;
      const showSubscription = show.subscribe((value: any) => {
        if (typeof value !== 'boolean') {
          this.isDisabled = true;
          this.disabledTitle = value;

          this.showButton = true;
        } else {
          this.isDisabled = false;
          this.showButton = value;
        }

        this.cd.detectChanges();
      });

      this.subscriptions.push(showSubscription);
    }
  }

  public customizeButton() {
    if (!this.config.shadow || this.config.inverse) {
      const color = this.config.color;
      const classes = [
        'primary',
        'danger',
        'info',
        'success',
        'warning',
        'link',
      ];

      if (!this.config.inverse) {
        this.buttonClass = classes.indexOf(color) > -1 ? `btn-${color}` : '';
        if (!this.buttonClass) {
          this.buttonColor = color || '';
        }
      } else {
        this.textClass =
          classes.indexOf(color) > -1 ? `text-${color} py-2` : '';
      }
    } else {
      this.buttonClass = `${this.config.color}-btn`;
    }
  }

  public action(e: any) {
    if (this.config.list) {
      e.stopPropagation();
    }

    if (!this.checkSmsDisabled(this.config.endpoint)) {
      if (
        this.config.templateOptions.type !== 'submit' &&
        !this.config.disableAction
      ) {
        let id;
        if (this.config.name === 'id') {
          id = this.config.rowId;
        }
        this.buttonAction.emit({
          type: e.type,
          el: this.config,
          value: this.config.templateOptions.action,
          id,
        });
      }
    }
  }

  public checkSmsDisabled(endpoint = ''): boolean | undefined {
    if (!this.siteSettings.isSmsEnabled()) {
      if (this.config.templateOptions.action === 'resend') {
        return true;
      }

      const endpointParts = [
        'resend_sms',
        'resend_supervisor_sms',
        'send',
        'resend',
      ];

      return endpointParts.some(part => {
        return endpoint.indexOf(part) !== -1;
      });
    }

    return;
  }

  public getSmsTitle(disabled?: boolean): string {
    return disabled ? this.siteSettings.smsActionDisabledMessage : '';
  }
}
