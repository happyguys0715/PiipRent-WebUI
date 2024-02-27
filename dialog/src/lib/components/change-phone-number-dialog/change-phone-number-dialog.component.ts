import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { Endpoints, FormElement } from '@webui/models';
import { DialogComponent } from '../dialog/dialog.component';
import { FormInputControlComponent } from '@webui/form-controls';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-change-phone-number-dialog',
  templateUrl: './change-phone-number-dialog.component.html',
  styleUrls: ['./change-phone-number-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DialogComponent,
    ReactiveFormsModule,
    FormInputControlComponent,
    SpinnerComponent,
    TranslateModule,
  ],
})
export class ChangePhoneNumberDialogComponent
  extends FormElement
  implements OnInit
{
  override readonly formGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    new_phone_mobile: new FormControl('', Validators.required),
  });

  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private toast: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  onSubmit() {
    const contactId = this.userService.user?.data.contact.id;
    const endpoint = `${Endpoints.Contact}${contactId}/change_phone_mobile/`;

    this.submitForm(() =>
      this.api.put<{ status: string; message: string }>(
        endpoint,
        this.formGroup.value
      )
    ).subscribe(response => {
      if (response.status === 'success') {
        this.dialogComponent.close();
        this.toast.sendMessage(response.message, MessageType.Info);
      }
    });
  }
}
