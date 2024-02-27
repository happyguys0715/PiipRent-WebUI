import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { interval, map, Observable } from 'rxjs';

import { Time } from '@webui/time';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

type Clock = {
  time: string;
  differentTimezone: boolean;
};

@Component({
  standalone: true,
  selector: 'webui-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule],
})
export class TimeComponent {
  @Input() timezone!: string;
  @Input() description!: string;
  @Input() differMessage = '';
  @Input() translateKey = '';

  @Output() init: EventEmitter<boolean> = new EventEmitter();

  public clock$: Observable<Clock> = interval(1000).pipe(
    map(value => {
      if (value === 0) {
        this.init.emit();
      }

      const format = 'HH:mm DD/MM/YYYY (UTCZ)';
      const time: string = Time.now(this.timezone).format(format);
      const differentTimezone: boolean = Time.now().format(format) !== time;

      return {
        time,
        differentTimezone,
      };
    })
  );
}
