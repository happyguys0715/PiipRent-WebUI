import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';

import {
  CompanyPurposeService,
  EventService,
  EventType,
  FormService,
  GenericFormService,
  SiteSettingsService,
} from '@webui/core';
import { Purpose } from '@webui/data';

import { meta, purposeConfig } from './company.meta';
import { Time } from '@webui/time';
import { Field } from '@webui/metadata';
import { SubscriptionRequiredDirective } from '@webui/shared';
import { SpinnerComponent } from '@webui/ui';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../services';
import { FormMode } from '@webui/models';
import { DynamicFormComponent } from '@webui/generic-components';
import { WorkflowComponent } from '../workflow/workflow.component';

@Component({
  standalone: true,
  selector: 'webui-company',
  templateUrl: 'company.component.html',
  imports: [
    CommonModule,
    SubscriptionRequiredDirective,
    SpinnerComponent,
    TranslateModule,
    DynamicFormComponent,
    WorkflowComponent,
  ],
})
export class CompanyComponent implements OnInit, OnDestroy {
  public endpoint = '/company_settings/';
  public hiddenFields = {
    elements: <any[]>[],
    keys: <any[]>[],
    observers: <any[]>[],
  };

  public errors: any;
  public response: any;

  public currentTheme!: string;
  public currentFont!: string;

  public savedTheme!: string;
  public savedFont!: string;
  public saveProcess!: boolean;

  public config!: any;
  public purposeConfig!: any[];
  public formId!: number;
  public form: any;
  public companyData: any;

  public companySettingsData: any;
  public showWorkflow!: boolean;
  public workflowForm: any;

  public company!: string;

  public urlSubscription!: Subscription;

  constructor(
    private gfs: GenericFormService,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private siteSettings: SiteSettingsService,
    private formService: FormService,
    // private navigationService: NavigationService,
    // private checkPermissionService: CheckPermissionService,
    private purpose: CompanyPurposeService,
    private eventService: EventService
  ) {}

  public ngOnInit() {
    this.formId = this.formService.registerForm(this.endpoint, FormMode.Edit);
    this.form = this.formService.getForm(this.formId);
    this.urlSubscription = this.route.url.subscribe(url => {
      this.settingsService.url = <any>url;
    });
    this.gfs.getAll(this.endpoint).subscribe(
      (res: any) => {
        this.companySettingsData = res.company_settings;
        this.getPurpose(res.company_settings.company);
        this.config = meta;
        this.fillingForm(this.config, res);
        this.updateMetadataByProps(this.config);
        this.company = res.company_settings.company;
        this.showWorkflow = true;
      },
      (err: any) => (this.errors = err)
    );
  }

  public getPurpose(id: string) {
    this.purpose.getPurpose(id).subscribe((purpose: Purpose | null) => {
      this.companyData = { purpose };
      this.purposeConfig = [{ ...purposeConfig, value: purpose }];
    });
  }

  public changePurpose(event: any) {
    if (event.type === 'change') {
      this.purpose.changePurpose(this.company, event.value).subscribe(() => {
        this.eventService.emit(EventType.PurposeChanged);
        // this.navigationService
        //   .updateNavigation(this.company)
        //   .subscribe((pages: Page[]) => {
        //     this.checkPermissionService.parseNavigation(
        //       this.checkPermissionService.permissions,
        //       pages
        //     );
        //   });
      });
    }
  }

  public updateMetadataByProps(metadata: Field[]) {
    metadata.forEach(el => {
      el.formId = this.formId;
      if (el.showIf && el.showIf.length) {
        if (this.hiddenFields.keys.indexOf(el.key) === -1) {
          this.hiddenFields.keys.push(el.key);
          this.hiddenFields.elements.push(el);
          this.hiddenFields.observers = this.observeFields(
            el.showIf,
            this.hiddenFields.observers
          );
          el.hidden = new BehaviorSubject<boolean>(true);
        }
      }

      if (el.children) {
        this.updateMetadataByProps(el.children);
      }
    });
  }

  public changeWorkflowSaving(value: any) {
    this.workflowForm = value;
  }

  public observeFields(fields: any[], observers: any[]) {
    fields.forEach((field: any) => {
      if (field instanceof Object) {
        const keys = Object.keys(field);
        keys.forEach(key => {
          if (observers.indexOf(key) === -1) {
            observers.push(key);
          }
        });
      } else {
        if (observers.indexOf(field) === -1) {
          observers.push(field);
        }
      }
    });
    return observers;
  }

  public ngOnDestroy() {
    this.urlSubscription.unsubscribe();
    this.resetSettings();
  }

  public resetSettings() {
    const body = document.body;
    body.parentElement?.classList.remove(this.currentTheme);
    if (this.savedTheme) {
      body.parentElement?.classList.add(`${this.savedTheme}-theme`);
    }
    if (this.savedFont) {
      const font = `${this.savedFont}, sans-serif`;
      body.style.fontFamily = font;
    } else {
      body.style.fontFamily = '';
    }
  }

  public submitForm(data: any) {
    Object.assign(data.company_settings, this.workflowForm);
    const keys = Object.keys(data.invoice_rule);
    keys.forEach(key => {
      if (key.includes('period_zero_reference')) {
        if (key === 'period_zero_reference_date') {
          data.invoice_rule[key] =
            Time.parse(data.invoice_rule[key], {
              format: 'YYYY-MM-DD',
            }).date() || undefined;
        }

        data.invoice_rule['period_zero_reference'] =
          parseInt(data.invoice_rule[key], 10) || undefined;
        delete data.invoice_rule[key];
      }
    });

    this.saveProcess = true;
    this.gfs.submitForm(this.endpoint, data).subscribe(
      () => {
        this.siteSettings.settings = data;
        this.saveProcess = false;
        this.savedTheme = data.company_settings.color_scheme;
        this.savedFont = data.company_settings.font;
      },
      (err: any) => {
        this.saveProcess = false;
        this.errors = err;
      }
    );
  }

  public fillingForm(metadata: any[], data: any) {
    metadata.forEach(el => {
      if (el.key) {
        this.getValueOfData(data, el.key, el);
      } else if (el.children) {
        this.fillingForm(el.children, data);
      }
    });
  }

  public getValueOfData(data: any, key: string, obj: any) {
    const keys = key.split('.');
    const prop: string = keys.shift() as string;
    if (keys.length === 0) {
      if (data) {
        if (key.includes('period_zero_reference')) {
          key = 'period_zero_reference';
        }
        obj['value'] = data[key];
        if (key === 'color_scheme') {
          this.currentTheme = `${data[key]}-theme`;
          this.savedTheme = data[key];
        }
        if (key === 'font') {
          this.savedFont = data[key];
        }
      }
    } else {
      if (data[prop]) {
        this.getValueOfData(data[prop], keys.join('.'), obj);
      }
    }
  }

  public eventHandler(e: any) {
    if (e.type === 'change' && e.el.type === 'radio' && e.value) {
      const body = document.body;
      if (e.el.templateOptions.type === 'color') {
        body.parentElement?.classList.remove(this.currentTheme);
        body.parentElement?.classList.add(`${e.value}-theme`);
        this.currentTheme = `${e.value}-theme`;
      } else if (e.el.templateOptions.type === 'text') {
        const font = `${e.value}, sans-serif`;
        body.style.fontFamily = font;
        this.currentFont = e.value;
      }
    }
  }
}
