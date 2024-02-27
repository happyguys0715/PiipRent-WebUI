import { FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  Subject,
  throwError,
} from 'rxjs';

const errorKeys: Record<string, string | null> = {
  required: null,
  phone_number: 'error.phone_number_invalid',
};

export class FormElement {
  private _saving = new BehaviorSubject<boolean>(false);
  private _errors = new BehaviorSubject<Record<string, string> | null>(null);

  readonly formGroup!: FormGroup;
  readonly saving$ = this._saving.asObservable();
  readonly errors$ = this._errors.asObservable();

  init() {
    this.subscribeOnChanges();
  }

  get formInvalid() {
    return this.formGroup.invalid;
  }

  submitForm<T>(request: () => Observable<T>) {
    this._saving.next(true);
    this._errors.next(null);

    return request().pipe(
      finalize(() => this._saving.next(false)),
      catchError(error => {
        this._errors.next(error.errors);

        return throwError(() => error);
      })
    );
  }

  private subscribeOnChanges() {
    this.formGroup.valueChanges.subscribe(() => {
      const errors: Record<string, string> = {};

      for (const key in this.formGroup.controls) {
        if (
          this.formGroup.get(key)?.untouched &&
          this.formGroup.get(key)?.pristine
        ) {
          continue;
        }

        const getError = (errors?: Record<string, string> | null) => {
          return errors
            ? Object.keys(errors).reduce((_, key) => errorKeys[key] || '', '')
            : '';
        };

        errors[key] = getError(this.formGroup.get(key)?.errors);
      }

      this._errors.next(errors);
    });
  }
}

export enum FormMode {
  View = 'view',
  Edit = 'edit',
}

export interface IFormErrors {
  non_field_errors: string | string[];
  detail: string;
  [key: string]: string | string[];
}

export enum FormEvent {
  Change,
}

export interface FilterEvent {
  list: string;
  reset?: boolean;
  [key: string]: any;
}

export interface IFormElement {
  formId: number;
}

let counter = 0;

export class Form {
  private _mode: BehaviorSubject<FormMode>;
  private _errors = new Subject<IFormErrors>();
  private _saveProcess = new BehaviorSubject<boolean>(false);
  private _id = counter++;
  private _initialData: { [key: string]: any } = {};
  private _additionalData: { [key: string]: any } = {};
  private _useToast: boolean;

  public allowMethods: string[];
  public hasTabs!: boolean;
  public hideEditButton!: boolean;
  public disableSaveButton = false;

  get mode() {
    return this._mode.asObservable();
  }

  get saveProcess() {
    return this._saveProcess.asObservable();
  }

  get id() {
    return this._id;
  }

  get errors$() {
    return this._errors.asObservable();
  }

  get initialData() {
    return { ...this._initialData };
  }

  get additionalData() {
    return { ...this._additionalData };
  }

  get useToast() {
    return this._useToast;
  }

  public endpoint: string;

  constructor(
    endpoint: string,
    mode: FormMode,
    allowMethods: string[],
    useToast = false
  ) {
    this._mode = new BehaviorSubject(mode);
    this.endpoint = endpoint;
    this.allowMethods = allowMethods;
    this._useToast = useToast;
  }

  public changeMode(mode: FormMode): void {
    this._mode.next(mode);
  }

  public setSaveProcess(saving: boolean): void {
    this._saveProcess.next(saving);
  }

  public setErrors(errors: IFormErrors): void {
    this._errors.next(errors);
  }

  public setInitialData(data: any) {
    this._initialData = { ...this._initialData, ...data };
  }

  public updateAdditionalData(key: string, value: any) {
    this._additionalData = {
      ...this._additionalData,
      [key]: value,
    };
  }
}
