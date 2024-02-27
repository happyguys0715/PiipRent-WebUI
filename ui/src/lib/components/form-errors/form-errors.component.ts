import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EventService, EventType, FormService, MessageType } from '@webui/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Form, IFormErrors } from '@webui/models';

interface IError {
  description: string;
  href: string;
  title: string;
}

@Component({
  standalone: true,
  selector: 'webui-form-errors',
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class FormErrorsComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();
  private _details$ = new BehaviorSubject<string[] | null>(null);
  private _objectExistError$ = new BehaviorSubject<IError | null>(null);
  private _form?: Form;

  errorList$ = this._details$.asObservable();
  objectExistError$ = this._objectExistError$.asObservable();

  @Input() formId!: number;

  constructor(
    private formService: FormService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this._form = this.formService.getForm(this.formId);

    this._form?.errors$
      .pipe(takeUntil(this._destroy))
      .subscribe(errors => this.updateErrors(errors));
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  private updateErrors(errors: IFormErrors) {
    const { detail, non_field_errors } = errors;
    let details: string[] = [];
    let objectExistError = null;

    if (Array.isArray(non_field_errors)) {
      if (non_field_errors.length > 1) {
        if (non_field_errors[0]) {
          const [, description, title, href] = non_field_errors;

          objectExistError = {
            description,
            href,
            title,
          };
        } else {
          details = non_field_errors.filter(el => !!el);
        }
      } else {
        details = [...non_field_errors];
      }
    }

    if (detail) {
      details.push(detail);
    }

    if (
      typeof non_field_errors === 'string' &&
      non_field_errors.trim().length
    ) {
      details.push(non_field_errors);
    }

    const errorList = details.filter(el => !!el && !!el.trim());

    this._objectExistError$.next(objectExistError);
    this._form?.useToast
      ? this.eventService.emit(EventType.ShowMessage, {
          text: errorList.join('. '),
          type: MessageType.Error,
        })
      : this._details$.next(errorList.length ? errorList : null);
  }
}
