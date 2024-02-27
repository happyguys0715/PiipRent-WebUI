import { Directive, Input, HostListener } from '@angular/core';

import { SelectDateService } from '../services';

@Directive({
  standalone: true,
  selector: '[webuiSelectDate]',
})
export class SelectDateDirective {
  @Input() disable!: boolean;
  @Input() date?: string;

  constructor(private service: SelectDateService) {}

  @HostListener('click')
  clickHandler() {
    if (!this.disable && this.date) {
      this.service.selectDate(this.date);
    }
  }

  @HostListener('mousedown')
  mouseDownHandler() {
    if (!this.disable && this.date) {
      this.service.startSelection(this.date);
    }
  }

  @HostListener('document:mouseup')
  mouseUpHandler() {
    if (!this.disable) {
      this.service.stopSelection();
    }
  }

  @HostListener('mouseover')
  mouseEntetHandler() {
    if (!this.disable && this.date) {
      this.service.selectMore(this.date);
    }
  }
}
