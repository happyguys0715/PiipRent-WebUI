import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { SignatureComponent } from '@webui/ui';
import { DialogRef, Modal, Status } from '@webui/models';

@Component({
  standalone: true,
  selector: 'webui-signature-modal',
  templateUrl: './signature-modal.component.html',
  styleUrls: ['./signature-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, BaseModalComponent, SignatureComponent],
})
export class SignatureModalComponent extends Modal {
  private signature = '';

  constructor(modal: DialogRef) {
    super(modal);
  }

  public updateSignature(signature: string): void {
    this.signature = signature;
  }

  public saveSignature(): void {
    this.close(Status.Success, this.signature);
  }
}
