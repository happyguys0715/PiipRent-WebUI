import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type SvgIcon =
  | 'filter'
  | 'person'
  | 'company'
  | 'calendar'
  | 'jobsite'
  | 'position'
  | 'clock'
  | 'close'
  | 'timer'
  | 'arrow-down'
  | 'arrow-up'
  | 'plus'
  | 'delete'
  | 'star-filled'
  | 'star'
  | 'add-picture'
  | 'edit'
  | 'drag'
  | 'map-symbol';

@Component({
  selector: 'webui-svg-icon',
  standalone: true,
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input() icon!: SvgIcon;
  @Input() size?: 'sm' | 'md' = 'md';

  get svgId(): string {
    return `#icon-${this.icon}`;
  }
}
