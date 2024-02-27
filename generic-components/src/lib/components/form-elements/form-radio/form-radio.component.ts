import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { BasicElementComponent } from '../basic-element/basic-element.component';
import { getTranslationKey } from '@webui/utilities';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'webui-form-radio',
  templateUrl: 'form-radio.component.html',
  styleUrls: ['./form-radio.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
})
export class FormRadioComponent
  extends BasicElementComponent
  implements OnInit
{
  public override config: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;
  public value: any;

  @Output()
  public override event: EventEmitter<any> = new EventEmitter();

  getTranslationKey = getTranslationKey;
  isChecked: any;
  constructor(private fb: FormBuilder) {
    super();
  }

  public ngOnInit() {
    this.addControl(this.config, this.fb, this.config.templateOptions.required);
    if (!this.group.get(this.key)?.value && !this.config.read_only) {
      this.value = this.config.default || '';
      this.group.get(this.key)?.patchValue(this.value);
    }
    if (
      this.config.value ||
      this.config.value === false ||
      this.config.value === null ||
      this.group.get(this.key)?.value
    ) {
      this.value = this.config.value || this.group.get(this.key)?.value;
      this.group.get(this.key)?.patchValue(this.value);
    }
  }

  public eventHandler(e: any) {
    this.isChecked = e.target.id;
    this.event.emit({
      type: e.type,
      el: this.config,
      value: this.group.get(this.key)?.value,
    });
  }
}
