import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { FaIconComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, NgIf, FaIconComponent],
})
export class FilterHeaderComponent implements OnInit {
  @Input() label!: string;
  @Input() resetButton?: boolean | null;
  @Input() key!: string;
  @Output() resetEvent = new EventEmitter<void>();

  translationKey!: string;

  onReset() {
    this.resetEvent.emit();
  }

  ngOnInit() {
    this.translationKey = `filter.${this.key}.label`;
  }
}
