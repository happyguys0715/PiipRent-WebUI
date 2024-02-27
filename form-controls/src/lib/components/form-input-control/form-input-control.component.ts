import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { Subject, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-form-input-control',
  templateUrl: './form-input-control.component.html',
  styleUrls: ['./form-input-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormInputControlComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    TranslateModule,
    FormsModule,
  ],
})
export class FormInputControlComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy, Validator
{
  private _destroy = new Subject<void>();
  private _iti?: intlTelInput.Plugin;
  private _isRequired = new BehaviorSubject<boolean>(false);
  private _errors = new BehaviorSubject<Record<string, any> | null>(null);

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type = 'text';
  @Input() prefix?: string;
  @Input() error?: string;

  @ViewChild('input') inputElement?: ElementRef<HTMLInputElement>;

  public value?: string = '';
  public onChange!: (value: string) => void;
  public onTouched!: () => void;
  public required$ = this._isRequired.asObservable();
  public errors$ = this._errors.asObservable();

  ngAfterViewInit(): void {
    if (this.type === 'tel' && this.inputElement) {
      this._iti = intlTelInput(this.inputElement.nativeElement, {
        allowDropdown: false,
        initialCountry: 'ee',
        // autoHideDialCode: true,
      });
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this._iti?.destroy();
  }

  public onInput(event: string) {
    const value = this.type === 'tel' ? this._iti?.getNumber() || '' : event;

    this.onChange(value);
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(control: FormControl): ValidationErrors | null {
    // Set timeout need for validation
    setTimeout(() => {
      if (control.errors && 'required' in control.errors) {
        this._isRequired.next(control.errors['required']);
      } else {
        this._isRequired.next(false);
      }

      this._errors.next(control.errors);
    }, 20);

    if (this.type === 'tel') {
      return this._iti?.isValidNumber() ? null : { phone_number: true };
    }

    return null;
  }
}
