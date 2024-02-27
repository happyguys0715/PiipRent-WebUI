import { Component, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { FaIconComponent, TooltipDirective } from '@webui/ui';
import { NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ListElementDirective } from '../../../directives';

@Component({
  standalone: true,
  selector: 'webui-list-checkbox',
  templateUrl: './list-checkbox.component.html',
  styleUrls: ['./list-checkbox.component.scss'],
  imports: [
    FaIconComponent,
    NgIf,
    TranslateModule,
    NgClass,
    TooltipDirective,
    forwardRef(() => ListElementDirective),
  ],
})
export class ListCheckboxComponent implements OnInit {
  public config: any;
  public value: any;
  public iconClass = '';

  public buttonAction!: EventEmitter<any>;

  public ngOnInit() {
    if (this.config.values) {
      this.value = this.config.values[this.config.value];
    }

    if (this.config.color) {
      const classes = [
        'primary',
        'danger',
        'info',
        'success',
        'warning',
        'muted',
      ];
      const color = this.config.color[this.config.value];
      this.iconClass = classes.indexOf(color) > -1 ? `text-${color}` : '';
    }
  }

  public buttonHandler(event: any) {
    this.buttonAction.emit(event);
  }

  getTranslationKey(value: any) {
    return `${this.config.translateKey || this.config.key}.${value}`;
  }
}
