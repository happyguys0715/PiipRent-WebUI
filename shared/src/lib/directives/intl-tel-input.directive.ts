import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Self,
} from '@angular/core';
import * as intlTelInput from 'intl-tel-input';
import { NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  standalone: true,
  selector: '[webuiIntlTelInput]',
})
export class IntlTelInputDirective implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  @Input() options?: intlTelInput.Options;

  constructor(private el: ElementRef, @Self() private ngControl: NgControl) {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit(): void {
    const input = this.el.nativeElement;
    const iti = intlTelInput(input, this.options);

    this.ngControl.control?.addValidators(this.getValidator(iti));

    this.ngControl.control?.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.ngControl.control?.patchValue(iti.getNumber(), {
          emitEvent: false,
        });
      });
  }

  private getValidator(intl: intlTelInput.Plugin): ValidatorFn {
    return (): ValidationErrors | null => {
      const isValid = intl.isValidNumber();

      return isValid ? null : { phone_number: true };
    };
  }
}
