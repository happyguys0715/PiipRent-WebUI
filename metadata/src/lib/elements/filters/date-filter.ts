import { FilterModel } from './filter.model';
import { getTomorrow, getYesterday, Time } from '@webui/time';

export interface DateFilterOptions {
  key: string;
  label: string;
  yesterday?: boolean;
  today?: boolean;
  tomorrow?: boolean;
  week?: boolean;
  month?: boolean;
}

export enum DateTypes {
  Yesterday,
  Today,
  Tomorrow,
  Week,
  Month,
}

export const Date = 'date';

export class DateFilter implements FilterModel {
  public type = Date;

  public key: string;
  public label: string;
  public list: { label: string; query: DateTypes; key: string }[];
  public input: { label: string; query: string; key: string }[];

  constructor(options: DateFilterOptions) {
    const {
      key,
      label,
      yesterday = false,
      today = false,
      tomorrow = false,
      week = false,
      month = false,
    } = options;

    this.key = key;
    this.label = label;
    this.input = [
      {
        label: 'From',
        key: 'from',
        query: `${key}_0`,
      },
      {
        label: 'To',
        key: 'to',
        query: `${key}_1`,
      },
    ];

    this.list = [];
    if (yesterday) {
      this.list.push({
        label: 'Yesterday',
        key: 'yesterday',
        query: DateTypes.Yesterday,
      });
    }

    if (today) {
      this.list.push({
        label: 'Today',
        key: 'today',
        query: DateTypes.Today,
      });
    }

    if (tomorrow) {
      this.list.push({
        label: 'Tomorrow',
        key: 'tomorrow',
        query: DateTypes.Tomorrow,
      });
    }

    if (week) {
      this.list.push({
        label: 'This week',
        key: 'this_week',
        query: DateTypes.Week,
      });
    }

    if (month) {
      this.list.push({
        label: 'This month',
        key: 'this_month',
        query: DateTypes.Month,
      });
    }
  }

  static getQuery = (key: string, type: DateTypes) => {
    const tomorrow = getTomorrow().format();
    const yesterday = getYesterday().format();
    const today = Time.now().format();
    const weekStart = Time.now().startOf('isoWeek').format();
    const monthStart = Time.now().startOf('month').format();
    const weekEnd = Time.now().endOf('isoWeek').format();
    const monthEnd = Time.now().endOf('month').format();

    switch (type) {
      case DateTypes.Yesterday:
        return `${key}_0=${yesterday}&${key}_1=${yesterday}`;

      case DateTypes.Today:
        return `${key}_0=${today}&${key}_1=${today}`;

      case DateTypes.Tomorrow:
        return `${key}_0=${tomorrow}&${key}_1=${tomorrow}`;

      case DateTypes.Week:
        return `${key}_0=${weekStart}&${key}_1=${weekEnd}`;

      case DateTypes.Month:
        return `${key}_0=${monthStart}&${key}_1=${monthEnd}`;
    }
  };
}
