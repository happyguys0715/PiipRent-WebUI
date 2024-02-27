import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseButtonComponent } from '@webui/ui';
import { DialogRef } from '@webui/models';

export type FlatDialogConfig = {
  hasCloseButton: boolean;
};

const defaultConfig: FlatDialogConfig = {
  hasCloseButton: true,
};

@Component({
  standalone: true,
  selector: 'webui-flat-dialog',
  templateUrl: './flat-dialog.component.html',
  styleUrls: ['./flat-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CloseButtonComponent],
})
export class FlatDialogComponent {
  @Input() config?: FlatDialogConfig;

  get dialogConfig() {
    return this.config
      ? {
          ...defaultConfig,
          ...this.config,
        }
      : defaultConfig;
  }

  constructor(private active: DialogRef) {}

  public dismiss() {
    this.active.close();
  }

  public close(result?: unknown) {
    return this.active.close(result);
  }
}
