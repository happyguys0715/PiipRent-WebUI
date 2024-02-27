import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FaIconComponent } from '../fa-icon/fa-icon.component';

@Component({
  standalone: true,
  selector: 'webui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FaIconComponent],
})
export class CheckboxComponent {
  @Input() sm?: boolean;
  @Input() checked?: boolean;
  @Input() className = '';
}
