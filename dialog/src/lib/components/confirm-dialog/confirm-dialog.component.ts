import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Inject,
} from '@angular/core';
import {
  FlatDialogComponent,
  FlatDialogConfig,
} from '../flat-dialog/flat-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { DIALOG_DATA, Status } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlatDialogComponent, TranslateModule],
})
export class ConfirmDialogComponent {
  instanceName?: string;

  dialogConfig: FlatDialogConfig = {
    hasCloseButton: false,
  };

  get payload(): Record<string, string> {
    return this.modalData;
  }

  constructor(
    @Inject(DIALOG_DATA)
    public modalData: { decline: string; accept: string; message: string }
  ) {}

  @ViewChild(FlatDialogComponent) dialogComponent?: FlatDialogComponent;

  public onDismiss() {
    this.dialogComponent?.dismiss();
  }

  public onDelete() {
    this.dialogComponent?.close(Status.Accept);
  }
}
