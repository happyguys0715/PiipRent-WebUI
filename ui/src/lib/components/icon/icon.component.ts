import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export enum Icon {
  Person,
  Company,
  Calendar,
  JobSite,
  Position,
  Clock,
  Close,
  Timer,
  ArrowDown,
  ArrowUp,
  Plus,
  Delete,
  Star,
  StarFilled,
  AddPicture,
  Edit,
}

export enum IconSize {
  Large,
  Medium,
  ExtraLarge,
}

@Component({
  standalone: true,
  selector: 'webui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IconComponent implements OnInit {
  @Input() icon?: Icon;
  @Input() size?: IconSize;

  public Icon = Icon;
  public classes: { [cssClasses: string]: boolean } = {};

  public ngOnInit() {
    this.classes = {
      'size-lg': IconSize.Large === this.size,
      'size-md': IconSize.Medium === this.size,
      'size-xl': IconSize.ExtraLarge === this.size,
    };
  }
}
