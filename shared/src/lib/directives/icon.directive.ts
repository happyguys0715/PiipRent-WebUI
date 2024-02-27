import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[webuiIcon]',
})
export class IconDirective {
  @Input() size?: 'sm' | 'md';
  @Input() color?: 'primary';

  @HostBinding('class') get className() {
    const classNames = [];

    if (this.size) {
      classNames.push(this.size);
    }

    if (this.color === 'primary') {
      classNames.push('primary');
    }

    return classNames.join(' ').trim();
  }
}
