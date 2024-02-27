import { Injectable } from '@angular/core';

import { DatepickerService, TranslateHelperService } from '@webui/core';
import {
  DateRange,
  Moment,
  rangeFormats,
  Time,
  weekEnd,
  weekStart,
} from '@webui/time';
import { ICalendarLine, IDateRange, Status, Tooltip } from '../models';

@Injectable()
export class CalendarService {
  public calendarTimes = [
    '00:00 AM',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '23:59 PM',
  ];

  private calendarHeight = 370;

  constructor(
    private datepickerService: DatepickerService,
    private language: TranslateHelperService
  ) {}

  public getRangeFormatDate(
    date: Moment,
    type: DateRange,
    range?: { start: Moment; end: Moment }
  ) {
    if (type === DateRange.Week) {
      const start = (range && range.start) || date.clone().weekday(weekStart);
      const end = (range && range.end) || date.clone().weekday(weekEnd);

      return `${start.format(rangeFormats[type])} - ${end.format(
        rangeFormats[type]
      )}`;
    }

    date.locale(this.language.currentLang);

    return date.format(rangeFormats[type]);
  }

  public generateMonth(from: Moment, data: any[]) {
    return this.datepickerService.generateMonth(from, body => {
      return body.map(row => {
        return row.map(day => {
          const newData = data.filter(el => el.date === day.date);
          const holidayData = data.find(el => el.holiday_date === day.date);
          const availabilityData = data.find(el => el.target_date === day.date);
          const tooltip = this.generateTooltipForMonth(newData);
          let loading = false;

          if (tooltip) {
            loading =
              !!tooltip[0].length || !!tooltip.count[1] || !!tooltip.count[2];
          }

          return {
            ...day,
            data: newData,
            jobOffers: newData.filter(el => el.showButtons),
            holiday: holidayData ? holidayData.name : undefined,
            available: availabilityData
              ? availabilityData.confirmed_available
              : undefined,
            availableId: availabilityData ? availabilityData.id : undefined,
            tooltip,
            isOpen: false,
            loading,
          };
        });
      });
    });
  }

  public generateWeek(from: Moment, data: any[], range?: IDateRange) {
    return this.datepickerService.generateWeek(
      from,
      body => {
        return body.map(day => {
          const newData = data.filter(
            (el: { date: string }) => el.date === day.date
          );

          return {
            ...day,
            data: newData,
            tooltip: this.generateTooltipForMonth(newData),
            isOpen: false,
            lines: this.calculateLines(),
          };
        });
      },
      range
    );
  }

  public generateDay(date: Moment, data: any[]) {
    const config = this.datepickerService.generateDay(date, body => {
      return {
        ...body,
        data: data.filter(el => el.date === body.date),
        isOpen: false,
        lines: this.calculateLines(),
      };
    });

    return config;
  }

  getRangeDates(date: Moment, type: DateRange): IDateRange {
    return this.datepickerService.getRangeDates(date, type);
  }

  getToday() {
    return Time.now();
  }

  calculateShiftSize(start: string) {
    const timesheetTime = 8.5;
    const startMoment = Time.parse(start, { format: 'hh:mm:ss' });

    const time = {
      hours: startMoment.hour(),
      minute: startMoment.minute(),
    };

    return {
      top: Math.round((this.calendarHeight / 24) * time.hours) + 'px',
      height: Math.round((this.calendarHeight / 24) * timesheetTime) + 'px',
    };
  }

  calculateTimes() {
    return this.calendarTimes.map((time, i, arr) => {
      const result: Record<string, number | string> = {};
      if (i === 0) {
        result['top'] = 0;
        result['bottom'] = 'auto';
      }

      if (i === arr.length - 1) {
        result['top'] = 'auto';
        result['bottom'] = 0;
      }

      return {
        time,
        top: (this.calendarHeight / (this.calendarTimes.length - 1)) * i - 6,
        ...result,
      };
    });
  }

  calculateLines(): ICalendarLine[] {
    return this.calendarTimes.map((time, i) => {
      return {
        top: (this.calendarHeight / (this.calendarTimes.length - 1)) * i,
        class: i % 4 !== 0 ? 'dotted' : '',
      };
    });
  }

  private generateTooltipForMonth(data: any[]): Tooltip | undefined {
    if (data.length) {
      const result: Tooltip = {
        [Status.Unfilled]: [],
        [Status.FullFilled]: [],
        [Status.Pending]: [],
        [Status.Open]: [],
        [Status.Filled]: [],
        [Status.Approved]: [],
        count: {
          [Status.Unfilled]: 0,
          [Status.FullFilled]: 0,
          [Status.Pending]: 0,
          [Status.Open]: 0,
          [Status.Filled]: 0,
          [Status.Approved]: 0,
        },
      };

      data.forEach(shift => {
        const { candidates, is_fulfilled, timesheetStatus } = shift;

        if (Number.isInteger(is_fulfilled)) {
          result.count[Status.FullFilled] += candidates.accepted;
          result.count[Status.Pending] += candidates.undefined;
          result.count[Status.Unfilled] +=
            shift.shift.workers - (candidates.accepted + candidates.undefined);
          if (
            shift.shift.workers - (candidates.accepted + candidates.undefined) >
            0
          ) {
            result[Status.Unfilled].push(shift);
          }
          if (candidates.accepted) {
            result[Status.FullFilled].push(shift);
          }
          if (candidates.undefined) {
            result[Status.Pending].push(shift);
          }
        }
        if (timesheetStatus) {
          result[timesheetStatus].push(shift);
        }
      });

      return result;
    } else {
      return;
    }
  }
}
