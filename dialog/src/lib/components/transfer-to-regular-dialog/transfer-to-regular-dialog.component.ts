import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ApiService,
  MessageType,
  ToastService,
  UserService,
} from '@webui/core';
import { Endpoints, FormElement, IResponse } from '@webui/models';
import { DialogComponent } from '../dialog/dialog.component';
import { FormInputControlComponent } from '@webui/form-controls';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from '@webui/ui';

@Component({
  standalone: true,
  selector: 'webui-transfer-to-regular-dialog',
  templateUrl: './transfer-to-regular-dialog.component.html',
  styleUrls: ['./transfer-to-regular-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DialogComponent,
    ReactiveFormsModule,
    FormInputControlComponent,
    TranslateModule,
    SpinnerComponent,
  ],
})
export class TransferToRegularDialogComponent extends FormElement {
  override readonly formGroup = new FormGroup({
    website: new FormControl('', Validators.required),
  });

  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private userService: UserService
  ) {
    super();
  }

  onSubmit() {
    const companyId = this.userService.user?.currentRole.company_id;
    const endpoint = `${Endpoints.Company}${companyId}/transfer_to_master_company/`;

    this.submitForm(() =>
      this.api.post<IResponse>(endpoint, this.formGroup.value, {
        showMessage: true,
      })
    ).subscribe(response => {
      if (response.status === 'success') {
        this.dialogComponent.close();
        this.toast.sendMessage(response.message, MessageType.Info);
      }
    });
  }
}
