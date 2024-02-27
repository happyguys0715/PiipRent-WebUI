import {
  Component,
  Output,
  EventEmitter,
  forwardRef,
  ViewChildren,
  QueryList,
  AfterContentInit,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListElementDirective } from '../../../directives';
import { timer } from 'rxjs';

@Component({
  standalone: true,
  selector: 'webui-list-column',
  templateUrl: 'list-column.component.html',
  styleUrls: ['./list-column.component.scss'],
  imports: [CommonModule, forwardRef(() => ListElementDirective)],
})
export class ListColumnComponent implements AfterContentInit {
  @ViewChildren(ListElementDirective)
  children?: QueryList<ListElementDirective>;

  @Output()
  public event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.empty') empty?: boolean;
  @HostBinding('class.padding') padding?: boolean;

  public config: any;

  public ngAfterContentInit(): void {
    timer(10).subscribe(() => {
      this.empty = this.children
        ?.toArray()
        .every(item => item.component.instance.config.hidden);
    });
  }

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonHandler(e: any) {
    this.buttonAction.emit(e);
  }
}
