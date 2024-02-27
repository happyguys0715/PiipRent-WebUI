import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { BasicElementComponent } from './../basic-element/basic-element.component';
import { getTranslationKey } from '@webui/utilities';
// import { FormMode } from '../../../services';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InfoComponent } from '@webui/ui';
import { FormMode } from '@webui/models';
// import { InfoComponent } from '../../info/info.component';

type SelectOption = {
  value: string;
  color?: string;
  key?: string;
};

@Component({
  standalone: true,
  selector: 'webui-form-select',
  templateUrl: 'form-select.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    TranslateModule,
    InfoComponent,
    NgForOf,
  ],
})
export class FormSelectComponent
  extends BasicElementComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('select')
  public select!: ElementRef;

  public override config!: any;
  public override group!: FormGroup;
  public errors: any;
  public message: any;
  public override key: any;
  public options: any;
  public label!: boolean;

  public displayValue!: string;
  public displayValueKey!: string;
  public textColor!: string;

  public viewMode!: boolean;

  public translateKey!: string;

  @Output()
  public override event: EventEmitter<any> = new EventEmitter();

  getTranslationKey = getTranslationKey;

  private subscriptions: Subscription[];

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    super();
    this.subscriptions = [];
  }

  public ngOnInit() {
    this.addControl(this.config, this.fb, this.config.templateOptions.required);
    this.translateKey = this.config.translateKey || this.config.key;
    this.options = this.config.templateOptions.options.slice();

    this.checkModeProperty();
    this.checkHiddenProperty();
    this.createEvent();
    this.setInitValue();
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
          this.group.get(this.key)?.patchValue(undefined);
        } else {
          this.viewMode = this.config.read_only || false;
        }
        this.setInitValue();

        this.eventHandler({ type: 'change' });
      });

      this.subscriptions.push(subscription);
    }
  }

  public getOption(options: any[], value: any): SelectOption | null {
    const element = options.find(
      el => el.value.toString() === value.toString()
    );

    if (element) {
      return {
        key: element.value,
        value: element.label,
        color: element.color,
      };
    } else {
      return { value: '-' };
    }
  }

  public setInitValue() {
    const parsedValue = this.parseValue([
      this.config.value,
      this.group.get(this.key)?.value,
      this.config.default,
    ]);

    if (parsedValue.exist) {
      const option = this.getOption(this.options, parsedValue.value);

      if (option) {
        this.displayValueKey = this.getOptionTranslationKey(
          option.key as string
        );
        this.textColor = option.color ? `text-${option.color}` : '';
        this.group.get(this.key)?.patchValue(parsedValue.value);
      } else {
        this.displayValue = '-';
      }

      this.group.get(this.key)?.patchValue(parsedValue.value);
    } else {
      this.group.get(this.key)?.patchValue(null);
    }
  }

  public ngAfterViewInit() {
    if (this.select) {
      this.addFlags(this.select, this.config);
    }
  }

  public eventHandler(e: any) {
    this.event.emit({
      type: e.type,
      el: this.config,
      value: this.group.get(this.key)?.value,
    });
  }

  getOptionTranslationKey(optionKey: string): string {
    return optionKey ? `${this.translateKey}.${optionKey}` : '-';
  }

  private parseValue(valueList: any[]): {
    exist: boolean;
    value: unknown | null;
  } {
    const isExist = (value: unknown) => value !== null && value !== undefined;
    const value = valueList.find(val => isExist(val));

    if (value === undefined) {
      return { exist: false, value: null };
    }

    return {
      exist: true,
      value,
    };
  }
}
