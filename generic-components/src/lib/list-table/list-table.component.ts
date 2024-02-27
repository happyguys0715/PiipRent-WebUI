import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ListElementDirective } from '../directives';
// import { ListElementDirective } from '@webui/generic-components';
// import { ListElementDirective } from '@webui/dynamic-elements';

@Component({
  standalone: true,
  selector: 'webui-list-table',
  templateUrl: 'list-table.component.html',
  imports: [ListElementDirective, NgForOf],
})
export class ListTableComponent {
  @Input()
  public config: any;
}
