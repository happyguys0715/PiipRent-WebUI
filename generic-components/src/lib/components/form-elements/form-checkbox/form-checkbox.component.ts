import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { BasicElementComponent } from './../basic-element/basic-element.component';
import { SiteSettingsService } from '@webui/core';
import { getTranslationKey } from '@webui/utilities';
import { CheckboxType } from '@webui/metadata';
// import { FormMode } from '../../../services';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, FaIconComponent, InfoComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { FormMode } from '@webui/models';
// import { InfoComponent } from '../../info/info.component';

@Component({
  standalone: true,
  selector: 'webui-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FaIconComponent,
    CheckboxComponent,
    TranslateModule,
    InfoComponent,
  ],
})
export class FormCheckboxComponent
  extends BasicElementComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('checkbox')
  public checkbox!: ElementRef;

  public override config: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;
  public value = true;
  public label!: boolean;

  public checkboxValue!: IconName;
  public checkboxClass = '';
  public checkboxColor = '';

  public isDisabled!: boolean;
  public disabledTitle!: string;

  public viewMode!: boolean;

  getTranslationKey = getTranslationKey;

  @Output()
  public override event: EventEmitter<any> = new EventEmitter();

  @Output()
  public buttonAction: EventEmitter<any> = new EventEmitter();

  get formControl(): FormControl {
    return this.group.get(this.key) as FormControl;
  }

  private subscriptions: Subscription[];

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private siteSettings: SiteSettingsService
  ) {
    super();
    this.subscriptions = [];
  }

  public ngOnInit() {
    this.addControl(this.config, this.fb);
    this.viewMode = this.config.read_only;
    this.setInitValue();
    this.checkModeProperty();
    this.checkHiddenProperty();
    this.createEvent();

    this.isDisabled = this.checkDisabled();
    this.disabledTitle = this.getDisabledTitle(this.isDisabled);

    if (this.config.templateOptions.disabled) {
      this.group.get(this.key)?.disable();
    }

    if (this.isDisabled) {
      this.group.get(this.key)?.patchValue(false);
      this.group.get(this.key)?.disable();
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  public checkHiddenProperty() {
    if (this.config && this.config.hidden) {
      const subscription = this.config.hidden.subscribe((hide: boolean) => {
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
      const subscription = this.config.mode.subscribe((mode: FormMode) => {
        if (mode === 'view') {
          this.viewMode = true;
        } else {
          this.viewMode = this.config.read_only || false;
        }
        this.setInitValue();
      });

      this.subscriptions.push(subscription);
    }
  }

  public setInitValue() {
    let value;
    if (this.config.updateFromForm) {
      value =
        this.group.get(this.key)?.value !== null
          ? this.group.get(this.key)?.value
          : this.config.value || (!this.viewMode && this.config.default);
    } else {
      value = this.config.value || (!this.viewMode && this.config.default);
    }

    if (this.config.value === null) {
      value = this.config.value;
    }

    if (this.viewMode) {
      if (this.config.templateOptions.type === 'checkbox') {
        this.defaultValues(value);
      }
    }
    if (this.config.templateOptions.type === 'icon') {
      this.customizeCheckbox(value);
    }
    this.group
      .get(this.key)
      ?.patchValue(value === null ? value : value || false);
  }

  public defaultValues(value: any) {
    if (value) {
      this.checkboxClass = 'text-success';
      this.checkboxValue = 'check-circle';
    } else if (value === null) {
      this.checkboxClass = 'text-muted';
      this.checkboxValue = 'minus-circle';
    } else {
      this.checkboxClass = 'text-danger';
      this.checkboxValue = 'times-circle';
    }
  }

  public customizeCheckbox(value: any): void {
    this.checkboxValue = this.config.templateOptions.values[value];
    const color = this.config.templateOptions.color;
    const classes = ['primary', 'danger', 'info', 'success', 'warning'];
    this.checkboxClass = classes.indexOf(color) > -1 ? `text-${color}` : '';
    if (!this.checkboxClass) {
      this.checkboxColor = color || '';
    }
  }

  public ngAfterViewInit() {
    if (this.checkbox) {
      this.addFlags(this.checkbox, this.config);
    }
  }

  public eventHandler(e: any) {
    this.event.emit({
      type: e.type,
      el: this.config,
      value: this.group.controls[this.key].value,
    });
  }

  public checkDisabled(): boolean {
    const disableFields = [
      'by_phone',
      'send_supervisor_message',
      'send_candidate_message',
    ];

    return (
      disableFields.indexOf(this.config.key) !== -1 &&
      !this.siteSettings.isSmsEnabled()
    );
  }

  public getDisabledTitle(disabled?: boolean): string {
    return disabled ? this.siteSettings.smsActionDisabledMessage : '';
  }

  sendAction(e: any) {
    this.buttonAction.emit({
      type: e.type,
      el: this.config,
      value: this.config.templateOptions.action,
    });
  }

  public patchValue(value: boolean): void {
    this.group.get(this.key)?.patchValue(value);
    this.eventHandler({ type: 'change' });
  }

  public get isIconType(): boolean {
    return this.config.templateOptions.type === CheckboxType.Icon;
  }

  public get isCheckboxType(): boolean {
    return (
      this.config.templateOptions.type === CheckboxType.Checkbox ||
      !this.config.templateOptions.type
    );
  }

  public get isButtonType(): boolean {
    return this.config.templateOptions.type === CheckboxType.Button;
  }

  public get isTextType(): boolean {
    return this.config.templateOptions.type === CheckboxType.Text;
  }

  public get currentValue(): boolean {
    return this.group.get(this.key)?.value;
  }

  public get hasButton() {
    const { showButtonIf } = this.config.templateOptions;

    if (typeof showButtonIf === 'boolean') {
      return this.config.templateOptions.showButtonIf === this.config.value;
    }

    return false;
  }

  public get hasLabel(): boolean {
    const { label, text, label_default } = this.config.templateOptions;

    return (!!this.label && !!label && !!text) || !!label_default;
  }
}
