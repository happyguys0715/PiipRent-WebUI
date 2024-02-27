import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Label } from '@webui/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
})
export class DashboardWidgetComponent {
  @Input() label!: Label;
}
