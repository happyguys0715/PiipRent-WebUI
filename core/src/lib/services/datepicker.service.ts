import { Injectable } from '@angular/core';

import {
  DateRange,
  filterDateFormat,
  Moment,
  Time,
  weekEnd,
  weekStart,
} from '@webui/time';

export interface IDateRange {
  start: Moment;
  end: Moment;
  monthStart?: Moment;
  monthEnd?: Moment;
}

export interface IYearPickerCell {
  label: string;
  date: Moment;
  month: number;
}

export interface IMonthPickerCell {
  date: string;
  month: number;
  dateMoment: Moment;
  label: string;
  today: boolean;
  currentMonth: boolean;
}

export interface IWeekPickerCell {
  date: string;
}

export interface IDayPickerCell {
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatepickerService {
  private headerFormat: Record<DateRange, string> = {
    month: 'ddd',
    week: 'ddd / D MMM',
    day: 'D MMMM YYYY / dddd',
    year: '',
  };

  public generateYear<T>(
    from: Moment,
    updateBody?: (target: IYearPickerCell[][]) => (T | IYearPickerCell)[][]
  ) {
    const range = this.getRangeDates(from, DateRange.Year);

    const body: IYearPickerCell[][] = [];
    let row: IYearPickerCell[] = [];

    const currentMonth = range.start.clone();
    while (currentMonth.isBefore(range.end)) {
      if (currentMonth.month() % 3 === 0) {
        row = [];
        body.push(row);
      }

      row.push({
        label: currentMonth.format('MMMM'),
        date: currentMonth.clone(),
        month: currentMonth.month(),
      });

      currentMonth.add(1, DateRange.Month);
    }

    if (updateBody) {
      return updateBody(body);
    }

    return body;
  }

  public generateMonth<T>(
    from: Moment,
    updateBody?: (target: IMonthPickerCell[][]) => (T | IMonthPickerCell)[][]
  ) {
    const range = this.getRangeDates(from, DateRange.Month);
    const firstDay = range.start;
    const lastDay = range.end;

    const body: IMonthPickerCell[][] = [];
    let row: IMonthPickerCell[] = [];

    const currentDay = firstDay.clone();
    while (currentDay.isBefore(lastDay)) {
      if (currentDay.day() === 1) {
        row = [];
        body.push(row);
      }

      const date = currentDay.format(filterDateFormat);

      row.push({
        date,
        month: currentDay.month(),
        dateMoment: currentDay.clone(),
        label: currentDay.format('D'),
        today: date === Time.now().format(filterDateFormat),
        currentMonth: currentDay.month() === from.month(),
      });

      currentDay.add(1, 'day');
    }

    return {
      header: this.getHeader(DateRange.Month, from),
      body: updateBody ? updateBody(body) : body,
    };
  }

  public generateWeek<T>(
    from: Moment,
    updateBody?: (target: IWeekPickerCell[]) => (IWeekPickerCell | T)[],
    range?: IDateRange
  ) {
    range = range || this.getRangeDates(from, DateRange.Week);
    const body = [];

    const currentDay = range.start.clone();
    while (currentDay.isBefore(range.end)) {
      const date = currentDay.format(filterDateFormat);

      body.push({
        date,
      });

      currentDay.add(1, 'day');
    }

    return {
      header: this.getHeader(DateRange.Week, from, range),
      body: updateBody ? updateBody(body) : body,
    };
  }

  public generateDay<T>(
    date: Moment,
    updateBody?: (target: IDayPickerCell) => T & IDayPickerCell
  ) {
    const body: IDayPickerCell = {
      date: date.format(filterDateFormat),
    };

    return {
      header: this.getHeader(DateRange.Day, date),
      body: updateBody ? updateBody(body) : body,
    };
  }

  public getRangeDates(date: Moment, type: DateRange): IDateRange {
    const start = date.clone().startOf(type);
    const end = date.clone().endOf(type);

    if (type === DateRange.Month) {
      return {
        start: start.clone().weekday(weekStart),
        end: end.clone().weekday(weekEnd),
        monthEnd: end,
        monthStart: start,
      };
    }

    return {
      start,
      end,
    };
  }

  private getHeader(
    type: DateRange,
    from: Moment,
    range?: { start: Moment; end: Moment }
  ): string[] {
    const result = [];

    let start = (range && range.start.clone()) || from;

    if (type !== DateRange.Day) {
      if (!range) {
        start = start.clone().weekday(weekStart);
      } else {
        start = start.clone();
      }

      for (let day = 0; day < 7; day++) {
        result.push(
          start.clone().add(day, DateRange.Day).format(this.headerFormat[type])
        );
      }
    } else {
      result.push(start.format(this.headerFormat[type]));
    }

    return result;
  }
}
