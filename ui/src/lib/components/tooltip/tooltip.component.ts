import { Component, HostBinding, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseButtonComponent } from '../close-button/close-button.component';

@Component({
  selector: 'webui-tooltip',
  standalone: true,
  imports: [CommonModule, CloseButtonComponent],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  message?: string;
  onClose?: () => void;
  templateRef?: TemplateRef<unknown>;

  @HostBinding('class.dark') dark?: boolean;
  @HostBinding('class.flat') flat?: boolean;
}
