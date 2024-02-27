import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

// import { FormMode, FormService } from '../../services';
// import { getValueOfData } from '../../helpers';
import { getValueOfData, isCandidate, isMobile } from '@webui/utilities';
// import { Form } from '../../models';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { FaIconComponent, SpinnerComponent } from '@webui/ui';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
// import { FormElementDirective } from '../../directives';
import { FormElementDirective } from '../../../directives';
import { Form, FormMode } from '@webui/models';
import { FormService } from '@webui/core';

@Component({
  standalone: true,
  selector: 'webui-form-tabs',
  templateUrl: './form-tabs.component.html',
  styleUrls: ['./form-tabs.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    SubscriptionRequiredDirective,
    FaIconComponent,
    SpinnerComponent,
    NgbNavModule,
    forwardRef(() => FormElementDirective),
  ],
})
export class FormTabsComponent implements OnInit, OnDestroy {
  public config: any;

  public group!: FormGroup;
  public errors: any;
  public message: any;
  public formId!: number;

  public canUpdate!: boolean;
  public mode!: string;
  public modeSubscription!: Subscription;

  public saving!: boolean;
  public saveSubscription!: Subscription;
  public form!: Form;

  @Output() public event = new EventEmitter();
  @Output() public buttonAction = new EventEmitter();

  public isMobileDevice = isMobile() && isCandidate();
  FormMode = FormMode;

  constructor(
    private formService: FormService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.form = this.formService.getForm(this.formId);
    this.config.activeId = this.config.activeId || 'ngb-tab-0';

    this.canUpdate =
      this.formService.getAllowedMethods(this.formId).indexOf('update') > -1 &&
      this.config.editForm; //tslint:disable-line

    this.config.children.forEach((tab: any) => {
      this.checkCustomLabel(tab);
    });

    if (this.form) {
      this.modeSubscription = this.form.mode.subscribe(mode => {
        this.mode = mode;

        this.cd.markForCheck();
      });

      this.saveSubscription = this.form.saveProcess.subscribe(saving => {
        this.saving = saving;
      });
    }
  }

  public checkCustomLabel(field: any): void {
    const { templateOptions, formData } = field;

    if (templateOptions && templateOptions.customLabel) {
      const target = {
        value: undefined,
      };

      getValueOfData(
        formData.value.data,
        templateOptions.customLabel.field,
        target
      );
      if (target.value) {
        templateOptions.label =
          templateOptions.customLabel.values[target.value];
      }
    }
  }

  public ngOnDestroy() {
    if (this.modeSubscription) {
      this.modeSubscription.unsubscribe();
    }

    if (this.saveSubscription) {
      this.saveSubscription.unsubscribe();
    }
  }

  public eventHandler(e: any) {
    this.event.emit(e);
  }

  public buttonActionHandler(e: any): void {
    this.buttonAction.emit(e);
  }

  public changeMode(mode: FormMode): void {
    this.mode = mode;

    this.formService.changeModeOfForm(this.formId, mode);
  }

  public hideEditButton() {
    return (
      this.formService.getForm(this.formId).hideEditButton ||
      this.config.hideEditButton
    );
  }

  public getTranslateKey(key: string, type: string) {
    return `tabs.${key}.${type}`;
  }
}
