import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'webui-master-guide-icon',
  templateUrl: './master-guide-icon.component.html',
  styleUrls: ['./master-guide-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterGuideIconComponent {
  @Input() inactive!: boolean;

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  togglePlaceholder(event: Event) {
    event.preventDefault();

    if (this.inactive) {
      return;
    }

    this.toggle.emit();
  }
}
