import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '@webui/shared';
import { InfoComponent } from '@webui/ui';
// import { InfoComponent } from '../../info/info.component';

@Component({
  standalone: true,
  selector: 'webui-list-available',
  templateUrl: './list-available.component.html',
  styleUrls: ['./list-available.component.scss'],
  imports: [CommonModule, InfoComponent, DateFormatPipe],
})
export class ListAvailableComponent {
  public config: any;
  public colors: Record<string, string> = {
    'All shifts': 'success',
    'Available shifts': 'success-blur',
    'Unavailable shifts': 'danger',
    'Unknown shifts': 'description',
  };

  public getClass(text: string): string {
    return this.colors[text];
  }
}
