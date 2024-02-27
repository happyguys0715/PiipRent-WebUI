import { Component } from '@angular/core';
import { CalendarComponent } from '@webui/calendar';

@Component({
  standalone: true,
  selector: 'webui-calendar-widget',
  templateUrl: './calendar-widget.component.html',
  imports: [CalendarComponent],
})
export class CalendarWidgetComponent {}
