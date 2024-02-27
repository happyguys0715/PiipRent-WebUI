import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-form-element-view',
  templateUrl: './form-element-view.components.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
})
export class FormElementViewComponent {
  @Input() key!: string;
  @Input() label!: string;
  @Input() many!: boolean;
  @Input() errors!: { [key: string]: string };
  @Input() messages!: { [key: string]: string };

  get error() {
    return this.errors && this.errors[this.key];
  }

  get message() {
    return this.errors && this.errors[this.key];
  }
}
