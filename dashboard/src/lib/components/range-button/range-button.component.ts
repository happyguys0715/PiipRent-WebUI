import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  standalone: true,
  selector: 'webui-range-button',
  templateUrl: './range-button.component.html',
  styleUrls: ['./range-button.component.scss'],
  imports: [TranslateModule, ButtonsModule],
})
export class RangeButtonComponent {
  @Input() dateRange!: string;
  @Input() active!: boolean;
  @Input() key!: string;
  @Input() label!: string;
  @Input() disabled!: boolean;
}
