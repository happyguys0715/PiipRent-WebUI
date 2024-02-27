import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Optional,
} from '@angular/core';
import { DialogRef } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseButtonComponent {
  @Input() sm?: boolean;
  @Input() danger?: boolean;
  @Input() inDialog = true;

  constructor(@Optional() private dialogRef: DialogRef) {}

  onClick() {
    if (this.inDialog) {
      this.dialogRef?.close();
    }
  }
}
