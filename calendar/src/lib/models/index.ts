import { Moment } from '@webui/time';

export enum Status {
  Unfilled,
  FullFilled,
  Pending,
  Open,
  Filled,
  Approved,
}

export interface ICalendarLine {
  top: number;
  class: 'dotted' | '';
}

export interface ICount {
  count: Record<number, number>;
}

export type Tooltip = ICount & Record<number, any[]>;

export interface IHoliday {
  date: string;
  name: string;
}

export interface IDateRange {
  start: Moment;
  end: Moment;
  monthStart?: Moment;
  monthEnd?: Moment;
}
