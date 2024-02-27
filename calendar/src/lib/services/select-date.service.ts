import { Inject, Injectable, Optional } from '@angular/core';
import { ENV } from '@webui/core';
import { IEnv } from '@webui/models';
import { API_DATE_FORMAT, Time } from '@webui/time';
import { isClient } from '@webui/utilities';

@Injectable()
export class SelectDateService {
  startDate!: string | null;
  endDate!: string | null;

  selectedDates = new Map();

  constructor(@Optional() @Inject(ENV) private environment: IEnv) {}

  hasSelectedDates() {
    const values = this.selectedDates.values();

    return Array.from(values).some(value => value);
  }

  isSelected(date: string) {
    const exist = this.selectedDates.has(date);

    return exist ? this.selectedDates.get(date) : false;
  }

  selectDate(date: string, value?: boolean) {
    const dateParsed = Time.parse(date, { format: API_DATE_FORMAT });
    const isPastDate = dateParsed.isBefore(Time.now().add(-1, 'day'));

    if (isClient() && isPastDate) {
      return;
    }

    const exist = this.selectedDates.has(date);

    if (exist && value === undefined) {
      this.selectedDates.set(date, !this.selectedDates.get(date));
    } else {
      this.selectedDates.set(date, true);
    }
  }

  startSelection(date: string) {
    this.startDate = date;
  }

  selectMore(date: string) {
    if (this.startDate) {
      this.endDate = date;

      const dates = this.betweenDates(this.startDate, this.endDate);

      dates.forEach(el => {
        this.selectDate(el, true);
      });
    }
  }

  stopSelection() {
    this.startDate = null;
    this.endDate = null;
  }

  getSelectedDates(): string[] | undefined {
    const dates: string[] = [];
    this.selectedDates.forEach((val, key) => {
      if (val) {
        dates.push(key);
      }
    });

    if (dates.length) {
      return dates;
    }

    return undefined;
  }

  clear() {
    this.selectedDates.clear();
  }

  private betweenDates(start: string, end: string) {
    const startDate = Time.parse(start, { format: API_DATE_FORMAT });

    if (!end) {
      return [start];
    }

    const dates = [];
    const endDate = Time.parse(end, { format: API_DATE_FORMAT });
    while (endDate.isAfter(startDate)) {
      dates.push(startDate.format(API_DATE_FORMAT));

      startDate.add(1, 'day');
    }

    dates.push(end);

    return dates;
  }
}
