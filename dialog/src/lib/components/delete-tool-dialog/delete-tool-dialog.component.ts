import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormInputControlComponent } from '@webui/form-controls';
import { SafeHtmlPipe } from '@webui/shared';
import { Status } from '@webui/models';

type DeleteToolDialogConfig = {
  name: string;
  rent_price: number;
  rent_type: string;
  location: string;
  picture: string;
};

@Component({
  selector: 'webui-delete-tool-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogComponent,
    FormInputControlComponent,
    TranslateModule,
    SafeHtmlPipe,
  ],
  templateUrl: './delete-tool-dialog.component.html',
  styleUrls: ['./delete-tool-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteToolDialogComponent {
  public form: FormGroup;

  get pattern(): string {
    return this.translateService.instant('message.delete_tool');
  }

  constructor(
    @Inject(DIALOG_DATA) public config: DeleteToolDialogConfig,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {
    this.form = this.fb.group({
      text: ['', [this.textValidator()]],
      info: this.fb.group(this.config),
    });
    this.form.get('info')?.disable();
  }

  public onCancel(dialog: DialogComponent) {
    dialog.dismiss();
  }

  public onDelete(dialog: DialogComponent) {
    dialog.close(Status.Accept);
  }

  private textValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value !== this.pattern) {
        return {
          pattern: true,
        };
      }

      return null;
    };
  }
}
