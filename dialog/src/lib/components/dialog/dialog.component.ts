import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CloseButtonComponent, Icon, IconComponent, IconSize } from '@webui/ui';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@webui/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, CloseButtonComponent, TranslateModule],
})
export class DialogComponent {
  @Input() public headerTitle?: string;
  public Icon = Icon;
  public IconSize = IconSize;

  constructor(private active: DialogRef) {}

  public dismiss() {
    this.active.close();
  }

  public close(result?: unknown) {
    return this.active.close(result);
  }
}
