import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Icon, IconComponent, IconSize } from '../icon/icon.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

class Star {
  constructor(
    public readonly position: number,
    public readonly active: boolean
  ) {}
}

@Component({
  standalone: true,
  selector: 'webui-rating-control',
  templateUrl: './rating-control.component.html',
  styleUrls: ['./rating-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, IconComponent],
})
export class RatingControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private destroy: Subject<void> = new Subject();
  private stars: BehaviorSubject<Star[]> = new BehaviorSubject([] as Star[]);
  private maxValue = 5;
  private minValue = 1;

  @Input() label?: string;
  @Input() placeholder?: string;

  public onChange?: (value: number) => void;
  public onTouched?: () => void;
  public control: FormControl = new FormControl();
  public destroy$: Observable<void> = this.destroy.asObservable();
  public Icon = Icon;
  public IconSize = IconSize;

  public ngOnInit() {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (this.onChange) {
          this.onChange(value);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public get stars$(): Observable<Star[]> {
    return this.stars.asObservable();
  }

  public changeValue(value: number): void {
    this.updateStars(value);
    this.control.patchValue(value);
  }

  public writeValue(value: number): void {
    if (value) {
      this.updateStars(value);
    }

    this.control.patchValue(value);
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private updateStars(activeIndex: number): void {
    const stars: Star[] = Array(this.maxValue)
      .fill('')
      .map((_, index) => new Star(index + 1, index + 1 <= activeIndex));

    this.stars.next(stars);
  }
}
