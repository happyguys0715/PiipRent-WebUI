import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Status } from '@webui/models';

type RentToolDialogConfig = {
  name: string;
  location: string;
  picture: string;
};

@Component({
  selector: 'webui-rent-tool-dialog',
  standalone: true,
  imports: [CommonModule, DialogComponent, TranslateModule],
  templateUrl: './rent-tool-dialog.component.html',
  styleUrls: ['./rent-tool-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RentToolDialogComponent {
  constructor(@Inject(DIALOG_DATA) public config: RentToolDialogConfig) {}

  public onAccept(dialog: DialogComponent) {
    dialog.close(Status.Accept);
  }
}
