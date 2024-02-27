import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
// import { FilterElementDirective } from '@webui/dynamic-elements';
import { FilterEvent } from '@webui/models';
import { FilterElementDirective } from '../directives';

@Component({
  standalone: true,
  selector: 'webui-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss'],
  imports: [CommonModule, TranslateModule, FilterElementDirective],
})
export class FilterBlockComponent {
  @Input() public config?: any[] = [];
  @Input() public inline!: boolean;
  @Input() public container!: boolean;
  @Input() public key!: string;

  @Output()
  public event: EventEmitter<FilterEvent> = new EventEmitter();

  public direction = 'down';

  public changeQuery(e: any) {
    this.event.emit(e);
  }

  public resetAll() {
    this.event.emit({ list: this.key, reset: true });
  }
}
