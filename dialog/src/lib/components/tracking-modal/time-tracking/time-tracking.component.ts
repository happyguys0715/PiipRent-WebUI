import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Time, Moment } from '@webui/time';
import { DateFormatPipe, SliderDirective } from '@webui/shared';
import { FaIconComponent } from '@webui/ui';
import { NgStyle } from '@angular/common';

@Component({
  standalone: true,
  selector: 'webui-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.scss'],
  imports: [SliderDirective, DateFormatPipe, FaIconComponent, NgStyle],
})
export class TimeTrackingComponent implements OnInit {
  @Input()
  public timePoints!: {
    start: Moment;
    end: Moment;
    break_start?: Moment;
    break_end?: Moment;
    timezone?: string;
  };

  @Output()
  public changeTimeTracking: EventEmitter<any> = new EventEmitter();

  public breakStyles: Record<string, string> = {};
  public time!: Moment;

  public ngOnInit() {
    this.setBreakStyles();

    this.time = this.timePoints.start;
  }

  public convertMomentToString(val?: Moment): string {
    return val?.format() || '';
  }

  public setBreakStyles() {
    const startValueOf = this.timePoints.start.valueOf();
    const endValueOf = this.timePoints.end.valueOf();
    const breakStartValueOf = this.timePoints.break_start?.valueOf();
    const breakEndValueOf = this.timePoints.break_end?.valueOf();

    const width = endValueOf - startValueOf;
    if (breakStartValueOf != undefined && breakEndValueOf != undefined) {
      const left = ((breakStartValueOf - startValueOf) / width) * 100;
      const breakWidth = ((breakEndValueOf - breakStartValueOf) / width) * 100;

      this.breakStyles = {
        left: left + '%',
        width: breakWidth + '%',
        position: 'absolute',
      };
    }
  }

  public checkPosition(event: number) {
    const start = this.timePoints.start.valueOf();
    const end = this.timePoints.end.valueOf();
    const timesheet = end - start;

    const minutes = timesheet / 1000 / 60;

    const newTime = Math.round(minutes * event) * 60 * 1000;

    this.time = Time.parse(start + newTime);
    this.changeTimeTracking.emit(this.time);
  }
}
