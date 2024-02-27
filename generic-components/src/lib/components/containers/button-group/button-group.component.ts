import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  forwardRef,
} from '@angular/core';

import { FormatString, getValueOfData } from '@webui/utilities';
import { CommonModule } from '@angular/common';
import { ListElementDirective } from '../../../directives';
// import { ListElementDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'webui-button-group',
  templateUrl: './button-group.component.html',
  imports: [CommonModule, forwardRef(() => ListElementDirective)],
})
export class ButtonGroupComponent implements OnInit {
  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  public config: any;
  public data!: any[];

  public ngOnInit() {
    if (this.config.value && this.config.value.length) {
      const formatString = new FormatString();

      this.data = this.config.value.map((item: any, i: number) => {
        const result = this.config.content.map((el: any) => {
          const obj = {
            ...el,
            endpoint: formatString.format(el.endpoint, item),
          };

          if (this.config.value.length > 1) {
            obj.templateOptions = {
              ...obj.templateOptions,
              text: obj.text + (i + 1),
            };
          }

          if (obj.endpoint[obj.endpoint.length - 1] !== '/') {
            obj.notParsedEndpoint = obj.endpoint;
            obj.endpoint += '/';
          }

          getValueOfData(item, el.field, obj);
          obj.hidden = !obj.value;

          return obj;
        });

        return result;
      });
    }
  }

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonHandler(e: any) {
    this.buttonAction.emit(e);
  }
}
