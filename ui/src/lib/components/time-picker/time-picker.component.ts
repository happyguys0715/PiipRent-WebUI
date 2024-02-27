import { CommonModule, formatNumber } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Time } from '@webui/time';
import { OverlayDropdownComponent } from '../overlay-dropdown/overlay-dropdown.component';
import { BehaviorSubject, skip } from 'rxjs';

type Value = {
  hour: number;
  minute: number;
};

@Component({
  standalone: true,
  selector: 'webui-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OverlayDropdownComponent, CommonModule],
})
export class TimePickerComponent implements OnInit, OnChanges {
  private _value = new BehaviorSubject<Value>({ hour: 0, minute: 0 });

  @Input() time?: string | null;
  @ViewChildren('li') items?: QueryList<ElementRef<HTMLElement>>;
  @ViewChild(OverlayDropdownComponent) dropdown?: OverlayDropdownComponent;
  @Output() changed = new EventEmitter<string>();

  readonly hours: number[] = Array(24)
    .fill(null)
    .map((_, i) => i);
  readonly minutes: number[] = Array(60)
    .fill(null)
    .map((_, i) => i);

  readonly value$ = this._value.asObservable();

  ngOnInit(): void {
    this.parseTime();

    this.value$.pipe(skip(1)).subscribe(v => {
      this.scroll();
      const value = `${formatNumber(v.hour, 'en-gb', '2.0')}:${formatNumber(
        v.minute,
        'en-gb',
        '2.0'
      )}`;
      this.changed.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['time'].firstChange) {
      this.parseTime();
    }
  }

  onOpened() {
    this.scroll();
  }

  onFocus() {
    this.dropdown?.openDropdown();
  }

  onChange(value: number, type: 'hour' | 'minute') {
    const { hour, minute } = this._value.value;

    this._value.next({
      hour: type === 'hour' ? value : hour,
      minute: type === 'minute' ? value : minute,
    });

    if (type === 'minute') {
      this.dropdown?.closeDropdown();
    }
  }

  private parseTime() {
    if (this.time) {
      const time = Time.parse(this.time, { format: 'hh:mm' });

      this._value.next({
        hour: time.hour(),
        minute: time.minute(),
      });
    }
  }

  private scroll() {
    setTimeout(() => {
      const activeItems = this.items?.filter(el =>
        el.nativeElement.classList.contains('active')
      );

      if (activeItems?.length) {
        activeItems.forEach(el => {
          const item = el.nativeElement;

          item.scrollIntoView();
        });
      }
    });
  }
}
