import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';

import { BasicElementComponent } from './../basic-element/basic-element.component';
import { Time } from '@webui/time';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-form-vacancy-dates',
  templateUrl: 'form-vacancy-dates.component.html',
  styleUrls: ['./form-vacancy-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgbDatepicker],
})
export class FormVacancyDatesComponent
  extends BasicElementComponent
  implements OnInit, OnDestroy
{
  @Input()
  public deleteDate!: BehaviorSubject<string>;

  public override config: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key!: any;

  public override event: EventEmitter<any> = new EventEmitter();

  public displayMonths = 3;
  public navigation = 'none';
  public dateFormat = 'YYYY-MM-DD';
  public minDate: any;
  public markDisabled!: (calendarDate: any) => boolean;
  public vacancyDates!: string[];
  public dates: any = {};
  // public todayElement: any;
  // public timeInstance = getTimeInstance();
  public updating!: boolean;

  @ViewChild('calendar')
  public calendar!: ElementRef;

  private subscription!: Subscription;

  constructor(private fb: FormBuilder, private ngbCalendar: NgbCalendar) {
    super();
  }

  public ngOnInit() {
    this.calcMinDate();
    this.addControl(this.config, this.fb);
    if (this.config && this.config.value) {
      this.group.get(this.key)?.patchValue(this.config.value);
    }

    if (this.config.value) {
      this.markDisabledDates(this.config.value);
    }

    if (this.config.removeDate) {
      this.subscription = this.config.removeDate.subscribe((date: any) => {
        if (date) {
          this.removeDate(date);
        }
      });
    }
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public markDisabledDates(dates: any[] = []) {
    this.markDisabled = (calendarDate: any) => {
      const exist = dates.find(shift => {
        const shiftDate = Time.parse(shift);

        return (
          shiftDate.year() === calendarDate.year &&
          shiftDate.month() + 1 === calendarDate.month &&
          shiftDate.date() === calendarDate.day
        );
      });

      if (!exist) {
        return exist;
      }

      const existDate = Time.parse(exist);
      const today = Time.now();

      if (
        today.year() === existDate.year() &&
        today.month() === existDate.month() &&
        today.date() === existDate.date()
      ) {
        return today.isAfter(existDate);
      }

      return exist;
    };
  }

  public calcMinDate() {
    const today = Time.now();

    this.minDate = {
      year: today.year(),
      month: today.month() + 1,
      day: today.date(),
    };
  }

  public selectVacancyDate(e: NgbDate) {
    if (e && !this.updating) {
      this.updating = true;
      const { year, month, day } = e;
      const date = Time.parse(`${year}-${month}-${day}`).format(
        this.dateFormat
      );

      let dates = this.vacancyDates || [];

      if (dates.indexOf(date) === -1) {
        this.dates[date] = null;
        dates.push(date);

        setTimeout(() => {
          this.markSelectedDates(date);
        }, 150);
      } else {
        dates = [...dates.filter(el => el !== date)];

        setTimeout(() => {
          this.markSelectedDates(date, true);
        });
      }

      this.vacancyDates = [...dates];
      this.group.get(this.key)?.patchValue(this.vacancyDates);
      this.event.emit({
        el: this.config,
        type: 'change',
      });
    }
  }

  public removeDate(date: any) {
    this.vacancyDates.splice(this.vacancyDates.indexOf(date), 1);

    setTimeout(() => {
      this.markSelectedDates(date, true);
    });
  }

  public markSelectedDates(date?: any, remove?: any) {
    const calendar = this.calendar.nativeElement;
    const selectedDate = calendar.querySelectorAll(`.bg-primary`);
    const currentDate = selectedDate[0];

    if (currentDate && date && !this.dates[date]) {
      this.dates[date] = currentDate.parentElement;
    }

    if (remove) {
      if (this.dates[date]) {
        this.dates[date].children[0].classList.remove('selected-date');
        this.dates[date].children[0].classList.add('removed-date');
      }

      delete this.dates[date];
    }

    Object.keys(this.dates).forEach(el => {
      if (this.dates[el]) {
        const element = this.dates[el].children[0];

        if (element) {
          element.classList.add('selected-date');
          element.classList.remove('removed-date');
        }
      }
    });

    this.updating = false;
  }

  public isToday(month: number, day: number): boolean {
    const today = this.ngbCalendar.getToday();

    return today.month === month && today.day === day;
  }
}
