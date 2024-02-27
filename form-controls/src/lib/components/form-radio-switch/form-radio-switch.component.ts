import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface IOption {
  label: string;
  value: unknown;
}

@Component({
  standalone: true,
  selector: 'webui-form-radio-switch',
  templateUrl: './form-radio-switch.component.html',
  styleUrls: ['./form-radio-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRadioSwitchComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
})
export class FormRadioSwitchComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  private destroy: Subject<void> = new Subject();

  @Input() options!: IOption[];

  public onChange?: (value: unknown) => void;
  public onTouched?: () => void;
  public control: FormControl = new FormControl();
  public destroy$: Observable<void> = this.destroy.asObservable();

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

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
