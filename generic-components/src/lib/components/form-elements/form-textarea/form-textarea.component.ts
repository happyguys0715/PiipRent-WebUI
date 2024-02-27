import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { BasicElementComponent } from './../basic-element/basic-element.component';
import { FormatString, getTranslationKey } from '@webui/utilities';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { InputService } from '../../../services';
import { NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InfoComponent } from '@webui/ui';
import { InputService } from '@webui/core';
// import { InfoComponent } from '../../info/info.component';

@Component({
  standalone: true,
  selector: 'webui-dynamic-form-textarea',
  templateUrl: 'form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  imports: [ReactiveFormsModule, NgIf, TranslateModule, InfoComponent, NgClass],
})
export class FormTextareaComponent
  extends BasicElementComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('textarea')
  public textarea!: ElementRef;

  @Output()
  public override event: EventEmitter<any> = new EventEmitter();

  public override config: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;
  public label!: boolean;

  public viewMode!: boolean;
  public displayValue!: string;
  public editMode: boolean;
  public className!: string;
  public formData: any;

  private subscriptions: Subscription[];

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private inputService: InputService
  ) {
    super();
    this.subscriptions = [];
    this.editMode = true;
  }

  getTranslationKey = getTranslationKey;

  public ngOnInit() {
    this.addControl(this.config, this.fb);
    this.setInitValue();
    this.checkModeProperty();
    this.checkHiddenProperty();
    this.createEvent();
    this.checkFormData();

    const control = this.group.get(this.key);

    if (control) {
      this.subscriptions.push(
        control.valueChanges
          .pipe(distinctUntilChanged(), debounceTime(400))
          .subscribe(() => {
            this.eventHandler({ type: 'blur' });
          })
      );
    }

    this.className = this.config.templateOptions.background
      ? 'message-text'
      : '';
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  public checkFormData() {
    if (this.config.formData) {
      const subscription = this.config.formData.subscribe((value: any) => {
        const { data, key } = value;

        this.formData = data;
        this.checkIfExistDefaultValue(key);
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkIfExistDefaultValue(key: string) {
    if (
      this.config.default &&
      typeof this.config.default === 'string' &&
      this.config.default.includes('{') &&
      this.config.default.includes('}')
    ) {
      if (this.config.updated && !this.config.updated.includes(key)) {
        return;
      }
      this.setInitValue(true);
    }
  }

  public checkHiddenProperty() {
    if (this.config && this.config.hidden && this.config.type !== 'static') {
      const subscription = this.config.hidden.subscribe((hide: any) => {
        if (hide) {
          this.config.hide = hide;
          this.group.get(this.key)?.patchValue(undefined);
          this.setInitValue();
        } else {
          this.config.hide = hide;
        }

        if (!(<any>this.cd).destroyed) {
          this.cd.detectChanges();
        }
      });

      this.subscriptions.push(subscription);
    }
  }

  public checkModeProperty() {
    if (this.config && this.config.mode) {
      const subscription = this.config.mode.subscribe((mode: any) => {
        if (mode === 'view') {
          this.viewMode = true;
          this.editMode = false;

          this.group.get(this.key)?.patchValue(undefined);
        } else {
          this.viewMode = this.config.read_only || false;
          this.editMode = true;
        }
        this.setInitValue();
      });

      this.subscriptions.push(subscription);
    }
  }

  public setInitValue(update?: boolean) {
    if (this.config.value || this.config.value === '') {
      this.group.get(this.key)?.patchValue(this.config.value);

      if (this.config.templateOptions.array) {
        this.displayValue = this.config.value[0].content;
      } else {
        this.displayValue = this.config.value;
      }
    } else {
      const format = new FormatString();
      const defaultValue =
        typeof this.config.default === 'string'
          ? format.format(this.config.default, this.formData)
          : this.config.default;

      if (defaultValue || update) {
        this.group.get(this.key)?.patchValue(defaultValue);
        // this.displayValue = this.displayValue;
        return;
      }

      this.displayValue = '-';
    }
  }

  public ngAfterViewInit() {
    if (!this.config.read_only) {
      if (this.textarea) {
        this.addFlags(this.textarea, this.config);

        if (this.config.templateOptions.autofocus) {
          this.textarea.nativeElement.focus();
        }
      }
    }
  }

  onFocus(): void {
    this.inputService.setInput(this.textarea.nativeElement);
  }

  public eventHandler(e: any) {
    this.event.emit({
      type: e.type,
      el: this.config,
      value: this.group.get(this.key)?.value,
    });
  }
}
