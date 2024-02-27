import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class UserAvatarComponent {
  @Input() source!: { origin: string; thumb: string };
  @Input() fullName = '';

  public get alt(): string {
    if (!this.fullName) {
      return '';
    }

    return this.fullName;
  }

  public get src(): string {
    return this.source.origin;
  }

  public get initials(): string {
    if (!this.fullName) {
      return '';
    }

    const parts = this.fullName.split(' ');

    if (parts.length > 2) {
      parts.shift();
    }

    return this.getInitials(parts);
  }

  private getInitials(parts: string[]): string {
    return parts
      .map(([character]) => character)
      .join('')
      .toLocaleUpperCase();
  }
}
