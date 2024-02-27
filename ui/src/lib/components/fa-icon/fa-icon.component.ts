import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'webui-fa-icon',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaIconComponent {
  @Input() icon!: IconProp;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
