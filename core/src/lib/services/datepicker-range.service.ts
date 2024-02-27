import { Injectable } from '@angular/core';
import {
  DateRange,
  Moment,
  rangeFormats,
  weekEnd,
  weekStart,
} from '@webui/time';

@Injectable({
  providedIn: 'root',
})
export class DatepickerRangeService {
  public nextRange(date: Moment, type: DateRange) {
    return this.updateDate(date, type, 1);
  }

  public previousRange(date: Moment, type: DateRange) {
    return this.updateDate(date, type, -1);
  }

  public getRangeTitle(date: Moment, type: DateRange) {
    if (type === DateRange.Week) {
      const start = date.clone().weekday(weekStart);
      const end = date.clone().weekday(weekEnd);

      return `${start.format(rangeFormats[type])} - ${end.format(
        rangeFormats[type]
      )}`;
    }

    return date.format(rangeFormats[type]);
  }

  public isYearRange(type: DateRange) {
    return type === DateRange.Year;
  }

  public isMonthRange(type: DateRange) {
    return type === DateRange.Month;
  }

  public isWeekRange(type: DateRange) {
    return type === DateRange.Week;
  }

  public isDayRange(type: DateRange) {
    return type === DateRange.Day;
  }

  private updateDate(date: Moment, type: DateRange, range: number) {
    return date.add(range, type);
  }
}
