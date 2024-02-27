import { Injectable } from '@angular/core';
import { API_DATE_FORMAT, Moment, Time } from '@webui/time';

export enum DateRange {
  Today,
  ThisWeek,
  ThisMonth,
  LastMonth,
  ThisYear,
  Custom,
}

enum DateRangeMoment {
  Year = 'year',
  Month = 'month',
  Week = 'week',
  Day = 'day',
}

export type Range = {
  from: string;
  to: string;
};

export type Label = {
  key: string;
  value: string;
};

type LabelMap = Record<string, Label>;

export const dateRangeLabel: LabelMap = {
  [DateRange.Today]: { key: 'today', value: 'Today' },
  [DateRange.ThisWeek]: { key: 'this_week', value: 'This Week' },
  [DateRange.ThisMonth]: { key: 'this_month', value: 'This Month' },
  [DateRange.ThisYear]: { key: 'this_year', value: 'This Year' },
  [DateRange.Custom]: { key: 'custom', value: 'Custom' },
  [DateRange.LastMonth]: { key: 'last_month', value: 'Last Month' },
};

const mapRangeDateToMoment: Partial<Record<string, DateRangeMoment>> = {
  [DateRange.Today]: DateRangeMoment.Day,
  [DateRange.ThisWeek]: DateRangeMoment.Week,
  [DateRange.ThisMonth]: DateRangeMoment.Month,
  [DateRange.ThisYear]: DateRangeMoment.Year,
  [DateRange.LastMonth]: DateRangeMoment.Month,
};

const mapRangeDateOffset: Partial<Record<string, number>> = {
  [DateRange.LastMonth]: -1,
};

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  private static getRangeInstance(
    type?: DateRangeMoment,
    offset = 0
  ): { from: Moment; to: Moment } {
    return {
      from: type ? Time.now().add(offset, type).startOf(type) : Time.now(),
      to: type ? Time.now().add(offset, type).endOf(type) : Time.now(),
    };
  }

  private static formatDates(
    range: { from: Moment; to: Moment },
    format: string
  ): Range {
    return {
      from: range.from.format(format),
      to: range.to.format(format),
    };
  }

  getDatesByRange(type: string): Range {
    const rangeInstance = DateRangeService.getRangeInstance(
      mapRangeDateToMoment[type],
      mapRangeDateOffset[type]
    );

    return DateRangeService.formatDates(rangeInstance, API_DATE_FORMAT);
  }

  parseRange(range: { from: Date; to: Date }): Range {
    const rangeInstance = {
      from: Time.parse(range.from),
      to: Time.parse(range.to),
    };

    return DateRangeService.formatDates(rangeInstance, API_DATE_FORMAT);
  }

  getFormDatesByRange(type: string): { from: Date; to: Date } {
    const rangeInstance = DateRangeService.getRangeInstance(
      mapRangeDateToMoment[type],
      mapRangeDateOffset[type]
    );

    return {
      from: rangeInstance.from.toDate(),
      to: rangeInstance.to.toDate(),
    };
  }
}
