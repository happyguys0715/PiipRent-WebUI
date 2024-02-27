import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Attribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'webui-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() processing = false;
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' = 'md';
  @Input() colorStyle: 'primary' | 'link' = 'primary';
  @Input() shadow = false;

  get classes(): string {
    return `${this.size} ${this.colorStyle}`;
  }
}
