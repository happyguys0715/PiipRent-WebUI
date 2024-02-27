import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { BasicElementComponent } from '../basic-element/basic-element.component';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@webui/ui';

interface Option {
  label: string | number;
  value: string | number;
}

@Component({
  standalone: true,
  selector: 'webui-form-options',
  templateUrl: 'form-options.component.html',
  imports: [CommonModule, FormsModule, FaIconComponent],
})
export class FormOptionsComponent
  extends BasicElementComponent
  implements OnInit, OnDestroy
{
  public override config: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;

  public optionsArray!: Option[];

  private subscriptions: Subscription[];

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    super();
    this.subscriptions = [];
  }

  public ngOnInit() {
    this.addControl(this.config, this.fb);
    this.setInitValue();
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
    this.createEvent();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  public setInitValue() {
    if (this.config.value) {
      this.optionsArray = this.config.value;
      this.group.get(this.key)?.patchValue(this.config.value);
    } else {
      this.optionsArray = [
        {
          label: '',
          value: '',
        },
      ];
    }
  }

  public updateValue() {
    const value = this.optionsArray.filter(el => {
      if ((el.label || el.label === '0') && (el.value || el.value === '0')) {
        return true;
      }
      return false;
    });
    if (value) {
      this.group.get(this.key)?.patchValue(value);
    }
  }

  public addOption() {
    this.optionsArray.push({
      label: '',
      value: '',
    });
  }

  public deleteOption(option: any) {
    this.optionsArray.splice(this.optionsArray.indexOf(option), 1);
    this.updateValue();
  }
}
