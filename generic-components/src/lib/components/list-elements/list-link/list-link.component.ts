import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { SiteSettingsService } from '@webui/core';
import { CommonModule } from '@angular/common';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { TranslateModule } from '@ngx-translate/core';
import { ListElementDirective } from '../../../directives';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'webui-list-link',
  templateUrl: 'list-link.component.html',
  styleUrls: ['./list-link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    SubscriptionRequiredDirective,
    TranslateModule,
    forwardRef(() => ListElementDirective),
    RouterLink,
  ],
})
export class ListLinkComponent implements OnInit {
  public config!: any;
  public href!: string | string[];
  public link!: boolean;
  public value!: string;
  public last!: boolean;
  public arrayValue!: boolean;
  public smsDisabled!: boolean;
  public smsDisabledTitle!: string;

  public phone!: boolean;
  public linkClass = '';
  public isArray = Array.isArray;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  @ViewChild('view')
  public linkView!: ElementRef<any>;

  constructor(private siteSettings: SiteSettingsService) {}

  public ngOnInit() {
    if (
      this.config.value &&
      this.config.value instanceof Object &&
      !Array.isArray(this.config.value)
    ) {
      //tslint:disable-line
      this.value =
        this.config.value &&
        (this.config.translateKey ||
          this.config.text ||
          this.config.value.__str__);
    } else {
      this.value =
        this.config.value &&
        (this.config.translateKey || this.config.text || this.config.value);
      if (Array.isArray(this.config.value)) {
        this.arrayValue = true;
      }
    }
    this.href = this.config.link;

    if (Array.isArray(this.value) && Array.isArray(this.href)) {
      this.link = !(this.isEmail(this.value[0]) || this.isPhone(this.value[0]));
    } else {
      this.link = !(
        this.isEmail(this.value as string) || this.isPhone(this.value as string)
      );
    }

    if (!this.link && this.config.link.indexOf('tel:') > -1) {
      this.phone = true;
    }

    if (this.config.color) {
      const classes = ['primary', 'danger', 'info', 'success', 'warning'];
      const color = this.config.color;
      this.linkClass =
        classes.indexOf(color) > -1 ? `text-${color} custom-link` : '';
    }

    this.smsDisabled = !this.siteSettings.isSmsEnabled();
    this.smsDisabledTitle = this.smsDisabled
      ? this.siteSettings.smsActionDisabledMessage
      : '';
  }

  public isEmail(value: string) {
    // eslint-disable-next-line no-useless-escape
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reg.test(value) ? true : false;
  }

  public isPhone(value: string) {
    const reg = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    return reg.test(value) ? true : false;
  }

  public action(e: MouseEvent, index?: number) {
    e.preventDefault();
    e.stopPropagation();
    if (index || index === 0) {
      let endpoint = this.href[index];

      const newEndpoint = endpoint.split('/');
      newEndpoint.pop();
      newEndpoint.pop();
      const id = newEndpoint.pop();

      endpoint = [...newEndpoint, ''].join('/');

      this.event.emit({
        target: 'form',
        endpoint,
        label: !this.config.hideLabel ? (<any>this.value[index]).__str__ : '',
        id,
      });
      return;
    }

    if (this.value) {
      const arr = this.config.endpoint.split('/');
      const id = arr[arr.length - 2];
      arr.splice(arr.length - 2, 1);
      const endpoint = arr.join('/');
      if (this.config.action) {
        this.buttonAction.emit({
          el: this.config,
          value: this.config.action,
        });
      } else {
        this.event.emit({
          target: 'form',
          endpoint: endpoint || this.config.endpoint,
          label: !this.config.hideLabel
            ? (e.target as HTMLElement).innerText
            : '',
          id: id || this.config.id,
        });
      }
    }
  }

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonHandler(e: any) {
    this.buttonAction.emit(e);
  }

  public sendSms(event: MouseEvent) {
    event.stopPropagation();

    if (!this.smsDisabled) {
      this.buttonAction.emit({
        type: 'click',
        value: 'sendSMS',
        el: Object.assign({}, this.config, {
          fields: [
            {
              type: 'link',
              field: this.config.key,
              value: this.config.value,
            },
          ],
        }),
      });
    }
  }

  clickHandler(event: MouseEvent) {
    event.stopPropagation();
  }
}
