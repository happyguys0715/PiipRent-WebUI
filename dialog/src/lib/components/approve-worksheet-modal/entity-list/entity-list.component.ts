import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IconSize, Icon } from '@webui/ui';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';

interface ICell {
  content: string | undefined;
}

export interface IRow {
  cells: ICell[];
  entity?: any;
}

export interface ITable {
  rows: IRow[];
  head: string[];
}

@Component({
  standalone: true,
  selector: 'webui-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, TranslateModule],
})
export class EntityListComponent {
  @Input() public config?: ITable;

  public readonly Icon = Icon;
  public readonly IconSize = IconSize;

  @Output() public edit: EventEmitter<IRow> = new EventEmitter();
  @Output() public delete: EventEmitter<IRow> = new EventEmitter();

  public onEdit(row: IRow): void {
    this.edit.emit(row);
  }

  public onDelete(row: IRow): void {
    this.delete.emit(row);
  }
}
