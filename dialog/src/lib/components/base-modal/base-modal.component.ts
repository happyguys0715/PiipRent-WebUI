import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseButtonComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CloseButtonComponent],
})
export class BaseModalComponent {
  @Input() title = '';
  @Input() modalClass = '';

  @Output() dissmisEvent: EventEmitter<void> = new EventEmitter();

  dismiss() {
    this.dissmisEvent.emit();
  }
}
