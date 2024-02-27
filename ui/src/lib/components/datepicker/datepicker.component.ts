import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { DateRange, filterDateFormat, Moment } from '@webui/time';
import {
  DatepickerRangeService,
  DatepickerService,
  TranslateHelperService,
} from '@webui/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlPipe } from '@webui/shared';
import { DateRangeComponent } from '../date-range/date-range.component';
import { TooltipDirective } from '../../directives';
import { BehaviorSubject, tap } from 'rxjs';

export interface IDateRange {
  start: Moment;
  end: Moment;
  monthStart?: Moment;
  monthEnd?: Moment;
}

@Component({
  standalone: true,
  selector: 'webui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DateRangeComponent,
    TranslateModule,
    SafeHtmlPipe,
    TooltipDirective,
  ],
})
export class DatepickerComponent implements OnInit {
  private _date = new BehaviorSubject<Moment | null>(null);
  private initialType?: DateRange;

  @Input() type!: DateRange;
  @Input() date!: Moment;
  @Input() range?: IDateRange;
  @Input() canChangeType = false;

  @Input() minDate?: Moment;
  @Input() maxDate?: Moment;

  @Output() update = new EventEmitter<
    Moment | { start: Moment; end: Moment }
  >();
  @Output() closed = new EventEmitter<void>();

  public date$ = this._date.asObservable().pipe(
    tap(date => {
      if (date) {
        this.fillCalendar(date);
      }
    })
  );

  dateRange = DateRange;
  showCustomWeek = false;

  yearBody: any;
  monthBody: any;
  activeDates!: string[];

  get isYearRange() {
    return this.dateRangeService.isYearRange(this.type);
  }

  get isWeekRange() {
    return this.dateRangeService.isWeekRange(this.type);
  }

  get isDayRange() {
    return this.dateRangeService.isDayRange(this.type);
  }

  constructor(
    private dateRangeService: DatepickerRangeService,
    private datepickerService: DatepickerService,
    private elementRef: ElementRef,
    private language: TranslateHelperService
  ) {}

  public ngOnInit() {
    const date = this.date.clone();
    date.locale(this.language.currentLang);
    this._date.next(date);
    this.initialType = this.type;

    this.setActiveDates(this.date.clone(), this.range);
  }

  public isDisabled(date: Moment) {
    if (this.minDate) {
      return date.isBefore(this.minDate);
    }

    if (this.maxDate) {
      return date.isAfter(this.maxDate);
    }

    return false;
  }

  public setActiveDates(from: Moment, range?: IDateRange) {
    range = range || this.datepickerService.getRangeDates(from, DateRange.Week);
    this.activeDates = [];
    const day = range.start.clone();

    while (day.isBefore(range.end)) {
      this.activeDates.push(day.format(filterDateFormat));
      day.add(1, DateRange.Day);
    }
  }

  public fillCalendar(date: Moment) {
    switch (this.type) {
      case DateRange.Year:
        this.generateYearCalendar(date);
        break;

      case DateRange.Week:
        this.generateMonthCalendar(date);
        break;

      case DateRange.Day:
        this.generateMonthCalendar(date);
        break;
    }
  }

  public changeCalendar(date: Moment) {
    this._date.next(date);
  }

  public changeDate(date: Moment) {
    if (this.type === this.initialType) {
      this.update.emit(date);
    } else {
      this.changeRange(date);
    }
  }

  public isActiveDay(day: any) {
    return this.activeDates.indexOf(day.date) > -1;
  }

  public isFirstActiveDay(day: any) {
    return this.activeDates.indexOf(day.date) === 0;
  }

  public isLastActiveDay(day: any) {
    return this.activeDates.indexOf(day.date) === this.activeDates.length - 1;
  }

  public showCustomWeekCalendar(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.showCustomWeek = true;
  }

  public setCustomWeek(date: Moment) {
    this.update.emit({
      start: date.clone(),
      end: date.clone().add(1, DateRange.Week),
    });
  }

  public changeRange(date?: Moment) {
    if (this.canChangeType) {
      this.type = this.isDayRange ? DateRange.Year : DateRange.Day;

      if (date) {
        this._date.next(date.clone());
      }
    }
  }

  private generateYearCalendar(date: Moment) {
    this.yearBody = this.datepickerService.generateYear(date, body => {
      return body.map(row => {
        return row.map(month => {
          return {
            ...month,
            active: month.month === date.month(),
          };
        });
      });
    });
  }

  private generateMonthCalendar(date: Moment) {
    this.monthBody = this.datepickerService.generateMonth(date, body => {
      return body.map(week => {
        return week.map(day => {
          return {
            ...day,
            currentMonth: day.month === date.month(),
          };
        });
      });
    });
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  public handleClick(event: MouseEvent) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = (clickedComponent as HTMLElement).parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.closed.emit();
    }
  }
}
