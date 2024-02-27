import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '../fa-icon/fa-icon.component';

@Component({
  standalone: true,
  selector: 'webui-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, FaIconComponent],
})
export class BackLinkComponent {
  @Input() label?: string;
  @Input() path?: string;
  @Input() key = '';

  @Output() backEvent = new EventEmitter<boolean>();

  constructor(private location: Location) {}

  onClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.path ? this.location.back() : this.backEvent.emit(true);
  }
}
