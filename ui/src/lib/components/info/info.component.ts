import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { TooltipDirective } from '../../directives';
import { isMobile } from '@webui/utilities';

@Component({
  standalone: true,
  selector: 'webui-info',
  template: `
    <i
      [webuiTooltip]="description"
      class="info hover:text-primary hover:opacity-100"
      [class.text-danger]="danger"
      [trigger]="triggersType"
      [placement]="placement || (device ? 'right' : 'bottom')"
      *ngIf="description">
      {{ text || 'i' }}
    </i>
  `,
  styleUrls: ['./info.component.scss'],
  imports: [NgIf, TooltipDirective],
})
export class InfoComponent implements OnInit {
  @Input() public description!: string | TemplateRef<any>;
  @Input() public text!: string;
  @Input() public placement!:
    | 'right'
    | 'bottom'
    | 'left'
    | 'left-top'
    | 'right-top';
  @Input() public triggersType: 'mouseover' | 'click' | 'manual' = 'mouseover';
  @Input() public danger!: boolean;
  @Input() public device = !isMobile();

  public config: any;

  public ngOnInit() {
    if (this.config && this.config.description) {
      this.description = this.config.description;
    }
  }
}
