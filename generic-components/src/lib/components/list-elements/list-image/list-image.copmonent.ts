import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { getContactAvatar, isCandidate, isMobile } from '@webui/utilities';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.scss'],
  imports: [CommonModule, TranslateModule, FaIconComponent],
})
export class ListImageComponent implements OnInit {
  public config: any;
  public src?: string;
  public icon?: IconName;
  public iconClass?: string;
  public last?: boolean;
  public contactAvatar?: string;

  public isMobileDevice = isMobile() && isCandidate();

  label = '';

  @ViewChild('filelink')
  public link!: ElementRef<HTMLAnchorElement>;

  get isFile(): boolean {
    return this.config.file;
  }

  get isAvatar(): boolean {
    return !!this.config.avatarType;
  }

  get isImage(): boolean {
    return this.config.image;
  }

  get isSignature(): boolean {
    return this.config.signature;
  }

  public ngOnInit() {
    if (this.config.type === 'picture') {
      if (this.config.file) {
        this.src = this.config.value;
      }

      if (this.config.image || this.config.signature) {
        this.src = this.config.value?.origin;
      }

      if (this.config.avatarType) {
        this.src = this.config.value?.origin;
        this.contactAvatar = getContactAvatar(this.config.contactName);
      }
    }

    if (this.config.type === 'icon') {
      if (this.config.values) {
        this.icon = this.config.values[this.config.value];
        if (this.config.color) {
          this.getColor(this.config.value);
          return;
        }
        this.setClass(this.config.value);
      }
    }

    this.label = this.config.translateKey || this.label;
  }

  public getColor(value: string) {
    this.iconClass = this.config.color[value]
      ? `text-${this.config.color[value]}`
      : 'text-muted';
  }

  public setClass(value: boolean) {
    this.iconClass =
      value === true
        ? 'text-success'
        : value === false
        ? 'text-danger'
        : 'text-muted';
  }

  public getExtension(src: string) {
    const parts = src.split('?');

    return parts[0].split('.').pop();
  }

  public downloadFile() {
    this.link.nativeElement.click();
  }

  get emptyValue() {
    return !this.config.file && !this.src && !this.contactAvatar;
  }
}
