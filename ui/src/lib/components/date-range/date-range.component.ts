import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DateRange, Moment } from '@webui/time';
import { DatepickerRangeService } from '@webui/core';
import { FaIconComponent } from '../fa-icon/fa-icon.component';

@Component({
  standalone: true,
  selector: 'webui-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  imports: [FaIconComponent],
})
export class DateRangeComponent implements OnInit {
  private _date!: Moment;

  @Input() type!: DateRange;
  @Input() date!: Moment;
  @Input() large!: boolean;

  @Output() dateChange = new EventEmitter();

  rangeTitle!: string;

  constructor(private dateRangeService: DatepickerRangeService) {}

  ngOnInit() {
    this._date = this.date.clone();

    this.updateRangeTitle();
  }

  nextRange(e: MouseEvent) {
    this.dateRangeService.nextRange(this._date, this.type);

    this.rangeChanged(e);
  }

  previousRange(e: MouseEvent) {
    this.dateRangeService.previousRange(this._date, this.type);

    this.rangeChanged(e);
  }

  rangeChanged(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    this.dateChange.emit(this._date);
    this.updateRangeTitle();
  }

  private updateRangeTitle() {
    this.rangeTitle = this.dateRangeService.getRangeTitle(
      this._date,
      this.type
    );
  }
}
